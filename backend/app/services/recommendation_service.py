from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.property import Property
from app.models.user import User, SearchHistory
from app.models.ai_analysis import AIAnalysis, StyleCategory
from app.services.ai_service import AIService
import json

class RecommendationService:
    def __init__(self):
        self.ai_service = AIService()
    
    async def get_user_recommendations(
        self, 
        user_id: int, 
        db: Session, 
        limit: int = 10,
        recommendation_type: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Get personalized recommendations for a user"""
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return []
        
        # Get user preferences
        preferences = user.preferences or {}
        
        # Get user's search history
        search_history = db.query(SearchHistory).filter(
            SearchHistory.user_id == user_id
        ).order_by(SearchHistory.created_at.desc()).limit(10).all()
        
        # Get user's favorite properties
        favorite_property_ids = [fav.property_id for fav in user.favorites]
        
        # Build recommendation query
        query = db.query(Property).filter(Property.is_active == True)
        
        # Apply preference filters
        if preferences.get("price_range"):
            min_price, max_price = preferences["price_range"]
            query = query.filter(Property.price >= min_price, Property.price <= max_price)
        
        if preferences.get("property_types"):
            query = query.filter(Property.property_type.in_(preferences["property_types"]))
        
        if preferences.get("cities"):
            query = query.filter(Property.city.in_(preferences["cities"]))
        
        # Exclude already favorited properties
        if favorite_property_ids:
            query = query.filter(~Property.id.in_(favorite_property_ids))
        
        # Get properties
        properties = query.limit(limit * 2).all()  # Get more than needed for scoring
        
        # Score properties based on user preferences and behavior
        scored_properties = []
        for property in properties:
            score = await self._calculate_recommendation_score(
                property, user, search_history, preferences
            )
            scored_properties.append({
                "property_id": property.id,
                "score": score,
                "reason": self._get_recommendation_reason(property, score, preferences)
            })
        
        # Sort by score and return top results
        scored_properties.sort(key=lambda x: x["score"], reverse=True)
        return scored_properties[:limit]
    
    async def get_style_based_recommendations(
        self,
        style_keywords: List[str],
        db: Session,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Get recommendations based on style keywords"""
        
        # Find properties with matching style analysis
        style_analyses = db.query(AIAnalysis).filter(
            AIAnalysis.detected_styles.isnot(None)
        ).all()
        
        scored_properties = []
        for analysis in style_analyses:
            if not analysis.detected_styles:
                continue
                
            # Calculate style match score
            style_match_score = self._calculate_style_match_score(
                analysis.detected_styles, style_keywords
            )
            
            if style_match_score > 0.3:  # Only include if reasonable match
                scored_properties.append({
                    "property_id": analysis.property_id,
                    "score": style_match_score,
                    "reason": f"Style match: {', '.join(style_keywords)}"
                })
        
        # Sort by score and return top results
        scored_properties.sort(key=lambda x: x["score"], reverse=True)
        return scored_properties[:limit]
    
    async def get_similar_properties(
        self,
        property_id: int,
        db: Session,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Get properties similar to the given property"""
        
        target_property = db.query(Property).filter(Property.id == property_id).first()
        if not target_property:
            return []
        
        # Get properties with similar characteristics
        similar_properties = db.query(Property).filter(
            Property.is_active == True,
            Property.id != property_id,
            Property.property_type == target_property.property_type
        ).limit(limit * 2).all()
        
        scored_properties = []
        for property in similar_properties:
            similarity_score = self._calculate_similarity_score(target_property, property)
            scored_properties.append({
                "property_id": property.id,
                "score": similarity_score,
                "reason": "Similar property characteristics"
            })
        
        # Sort by similarity score
        scored_properties.sort(key=lambda x: x["score"], reverse=True)
        return scored_properties[:limit]
    
    async def get_trending_properties(
        self,
        db: Session,
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Get trending properties based on recent activity"""
        
        # Mock trending logic - in a real implementation, you would track views, clicks, etc.
        trending_properties = db.query(Property).filter(
            Property.is_active == True
        ).order_by(Property.created_at.desc()).limit(limit * 2).all()
        
        scored_properties = []
        for i, property in enumerate(trending_properties):
            # Simple trending score based on recency and some randomness
            trending_score = 1.0 - (i * 0.1) + (hash(str(property.id)) % 100) / 1000
            scored_properties.append({
                "property_id": property.id,
                "score": trending_score,
                "reason": "Trending property"
            })
        
        # Sort by trending score
        scored_properties.sort(key=lambda x: x["score"], reverse=True)
        return scored_properties[:limit]
    
    async def _calculate_recommendation_score(
        self,
        property: Property,
        user: User,
        search_history: List[SearchHistory],
        preferences: Dict[str, Any]
    ) -> float:
        """Calculate recommendation score for a property"""
        
        score = 0.0
        
        # Price preference score
        if preferences.get("price_range"):
            min_price, max_price = preferences["price_range"]
            if min_price <= property.price <= max_price:
                score += 0.3
        
        # Property type preference score
        if preferences.get("property_types") and property.property_type in preferences["property_types"]:
            score += 0.2
        
        # Location preference score
        if preferences.get("cities") and property.city in preferences["cities"]:
            score += 0.2
        
        # Size preference score (mock logic)
        if preferences.get("min_rooms") and property.rooms and property.rooms >= preferences["min_rooms"]:
            score += 0.1
        
        # Style preference score (if user has style preferences)
        if preferences.get("preferred_styles"):
            # This would require style analysis of the property
            score += 0.1
        
        # Search history relevance
        for search in search_history:
            if search.search_query and search.search_query.lower() in property.title.lower():
                score += 0.1
                break
        
        return min(score, 1.0)  # Cap at 1.0
    
    def _calculate_style_match_score(
        self,
        detected_styles: List[Dict[str, Any]],
        style_keywords: List[str]
    ) -> float:
        """Calculate how well detected styles match the keywords"""
        
        if not detected_styles or not style_keywords:
            return 0.0
        
        total_score = 0.0
        for detected_style in detected_styles:
            style_name = detected_style.get("style", "").lower()
            confidence = detected_style.get("confidence", 0.0)
            
            for keyword in style_keywords:
                if keyword.lower() in style_name:
                    total_score += confidence
        
        return min(total_score / len(style_keywords), 1.0)
    
    def _calculate_similarity_score(
        self,
        target_property: Property,
        candidate_property: Property
    ) -> float:
        """Calculate similarity score between two properties"""
        
        score = 0.0
        
        # Price similarity (within 20% range)
        if target_property.price and candidate_property.price:
            price_ratio = min(target_property.price, candidate_property.price) / max(target_property.price, candidate_property.price)
            if price_ratio > 0.8:
                score += 0.3
        
        # Area similarity
        if target_property.area and candidate_property.area:
            area_ratio = min(target_property.area, candidate_property.area) / max(target_property.area, candidate_property.area)
            if area_ratio > 0.8:
                score += 0.2
        
        # Rooms similarity
        if target_property.rooms and candidate_property.rooms:
            if target_property.rooms == candidate_property.rooms:
                score += 0.2
        
        # Location similarity
        if target_property.city and candidate_property.city:
            if target_property.city == candidate_property.city:
                score += 0.2
        
        # Property type similarity
        if target_property.property_type and candidate_property.property_type:
            if target_property.property_type == candidate_property.property_type:
                score += 0.1
        
        return min(score, 1.0)
    
    def _get_recommendation_reason(
        self,
        property: Property,
        score: float,
        preferences: Dict[str, Any]
    ) -> str:
        """Generate a human-readable reason for the recommendation"""
        
        reasons = []
        
        if preferences.get("price_range"):
            min_price, max_price = preferences["price_range"]
            if min_price <= property.price <= max_price:
                reasons.append("matches your price range")
        
        if preferences.get("property_types") and property.property_type in preferences["property_types"]:
            reasons.append(f"is a {property.property_type}")
        
        if preferences.get("cities") and property.city in preferences["cities"]:
            reasons.append(f"is in {property.city}")
        
        if reasons:
            return f"Recommended because it {', '.join(reasons)}"
        else:
            return "Recommended based on your preferences"
