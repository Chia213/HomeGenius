from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.ai_analysis import Recommendation
from app.models.property import Property
from app.models.user import User
from app.schemas.property import Property as PropertySchema
from app.services.recommendation_service import RecommendationService

router = APIRouter()

@router.get("/user/{user_id}/properties", response_model=List[PropertySchema])
async def get_user_recommendations(
    user_id: int,
    limit: int = Query(10, ge=1, le=50),
    recommendation_type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Get personalized property recommendations for a user"""
    
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Initialize recommendation service
    recommendation_service = RecommendationService()
    
    try:
        # Get recommendations
        recommendations = await recommendation_service.get_user_recommendations(
            user_id, db, limit, recommendation_type
        )
        
        # Get property details
        property_ids = [rec["property_id"] for rec in recommendations]
        properties = db.query(Property).filter(
            Property.id.in_(property_ids),
            Property.is_active == True
        ).all()
        
        # Sort properties by recommendation score
        property_dict = {p.id: p for p in properties}
        sorted_properties = []
        for rec in recommendations:
            if rec["property_id"] in property_dict:
                sorted_properties.append(property_dict[rec["property_id"]])
        
        return sorted_properties
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get recommendations: {str(e)}")

@router.get("/style-based", response_model=List[PropertySchema])
async def get_style_based_recommendations(
    style_keywords: List[str] = Query(...),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get property recommendations based on style keywords"""
    
    recommendation_service = RecommendationService()
    
    try:
        # Get style-based recommendations
        recommendations = await recommendation_service.get_style_based_recommendations(
            style_keywords, db, limit
        )
        
        # Get property details
        property_ids = [rec["property_id"] for rec in recommendations]
        properties = db.query(Property).filter(
            Property.id.in_(property_ids),
            Property.is_active == True
        ).all()
        
        # Sort properties by recommendation score
        property_dict = {p.id: p for p in properties}
        sorted_properties = []
        for rec in recommendations:
            if rec["property_id"] in property_dict:
                sorted_properties.append(property_dict[rec["property_id"]])
        
        return sorted_properties
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get style recommendations: {str(e)}")

@router.get("/similar/{property_id}", response_model=List[PropertySchema])
async def get_similar_properties(
    property_id: int,
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get properties similar to the given property"""
    
    # Check if property exists
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    recommendation_service = RecommendationService()
    
    try:
        # Get similar properties
        recommendations = await recommendation_service.get_similar_properties(
            property_id, db, limit
        )
        
        # Get property details
        property_ids = [rec["property_id"] for rec in recommendations]
        properties = db.query(Property).filter(
            Property.id.in_(property_ids),
            Property.is_active == True
        ).all()
        
        # Sort properties by similarity score
        property_dict = {p.id: p for p in properties}
        sorted_properties = []
        for rec in recommendations:
            if rec["property_id"] in property_dict:
                sorted_properties.append(property_dict[rec["property_id"]])
        
        return sorted_properties
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get similar properties: {str(e)}")

@router.post("/feedback")
async def submit_recommendation_feedback(
    recommendation_id: int,
    feedback: str,  # "positive", "negative", "neutral"
    db: Session = Depends(get_db)
):
    """Submit feedback on a recommendation"""
    
    # Check if recommendation exists
    recommendation = db.query(Recommendation).filter(Recommendation.id == recommendation_id).first()
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    
    # Update recommendation with feedback
    recommendation.feedback = feedback
    db.commit()
    
    return {"message": "Feedback submitted successfully"}

@router.get("/trending", response_model=List[PropertySchema])
async def get_trending_properties(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get trending properties based on views and interactions"""
    
    recommendation_service = RecommendationService()
    
    try:
        # Get trending properties
        recommendations = await recommendation_service.get_trending_properties(db, limit)
        
        # Get property details
        property_ids = [rec["property_id"] for rec in recommendations]
        properties = db.query(Property).filter(
            Property.id.in_(property_ids),
            Property.is_active == True
        ).all()
        
        # Sort properties by trending score
        property_dict = {p.id: p for p in properties}
        sorted_properties = []
        for rec in recommendations:
            if rec["property_id"] in property_dict:
                sorted_properties.append(property_dict[rec["property_id"]])
        
        return sorted_properties
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get trending properties: {str(e)}")
