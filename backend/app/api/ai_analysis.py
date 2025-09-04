from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.ai_analysis import AIAnalysis, StyleCategory
from app.schemas.ai_analysis import (
    AIAnalysisResponse, AIAnalysisCreate, StyleCategoryCreate, 
    StyleCategory as StyleCategorySchema, ImageAnalysisResponse
)
from app.services.ai_service import AIService
import json

router = APIRouter()

@router.post("/analyze-property", response_model=AIAnalysisResponse)
async def analyze_property(
    analysis_request: AIAnalysisCreate,
    db: Session = Depends(get_db)
):
    """Analyze a property for price prediction and style detection"""
    
    # Initialize AI service
    ai_service = AIService()
    
    try:
        # Perform analysis based on type
        if analysis_request.analysis_type in ["price", "combined"]:
            price_analysis = await ai_service.predict_price(analysis_request.property_id, db)
        else:
            price_analysis = None
            
        if analysis_request.analysis_type in ["style", "combined"]:
            style_analysis = await ai_service.analyze_style(analysis_request.property_id, db)
        else:
            style_analysis = None
        
        # Create analysis record
        analysis_data = {
            "property_id": analysis_request.property_id,
            "analysis_type": analysis_request.analysis_type,
            "model_version": "1.0.0"
        }
        
        if price_analysis:
            analysis_data.update({
                "predicted_price": price_analysis["predicted_price"],
                "price_confidence": price_analysis["confidence"],
                "price_factors": price_analysis["factors"]
            })
        
        if style_analysis:
            analysis_data.update({
                "detected_styles": style_analysis["detected_styles"],
                "style_confidence": style_analysis["confidence"],
                "style_features": style_analysis["features"]
            })
        
        db_analysis = AIAnalysis(**analysis_data)
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        
        return db_analysis
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/analyze-image", response_model=ImageAnalysisResponse)
async def analyze_image(
    file: UploadFile = File(...),
    property_id: Optional[int] = Form(None),
    analysis_type: str = Form("style"),
    db: Session = Depends(get_db)
):
    """Analyze uploaded image for style detection"""
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    ai_service = AIService()
    
    try:
        # Read image data
        image_data = await file.read()
        
        # Analyze image
        analysis_result = await ai_service.analyze_image(image_data, analysis_type)
        
        # If property_id provided, save analysis
        if property_id:
            analysis_data = {
                "property_id": property_id,
                "analysis_type": analysis_type,
                "detected_styles": analysis_result["detected_styles"],
                "style_confidence": analysis_result["style_confidence"],
                "style_features": analysis_result["features"],
                "image_analysis": analysis_result["image_analysis"],
                "quality_score": analysis_result["quality_score"],
                "processing_time": analysis_result["processing_time"],
                "model_version": "1.0.0"
            }
            
            db_analysis = AIAnalysis(**analysis_data)
            db.add(db_analysis)
            db.commit()
            db.refresh(db_analysis)
            
            analysis_id = db_analysis.id
        else:
            analysis_id = None
        
        return ImageAnalysisResponse(
            analysis_id=analysis_id,
            detected_styles=analysis_result["detected_styles"],
            style_confidence=analysis_result["style_confidence"],
            quality_score=analysis_result["quality_score"],
            processing_time=analysis_result["processing_time"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis failed: {str(e)}")

@router.get("/styles/", response_model=List[StyleCategorySchema])
async def get_style_categories(db: Session = Depends(get_db)):
    """Get all available style categories"""
    styles = db.query(StyleCategory).filter(StyleCategory.is_active == True).all()
    return styles

@router.post("/styles/", response_model=StyleCategorySchema)
async def create_style_category(
    style: StyleCategoryCreate,
    db: Session = Depends(get_db)
):
    """Create a new style category"""
    db_style = StyleCategory(**style.dict())
    db.add(db_style)
    db.commit()
    db.refresh(db_style)
    return db_style

@router.get("/property/{property_id}/analysis", response_model=List[AIAnalysisResponse])
async def get_property_analysis(
    property_id: int,
    analysis_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all AI analyses for a property"""
    query = db.query(AIAnalysis).filter(AIAnalysis.property_id == property_id)
    
    if analysis_type:
        query = query.filter(AIAnalysis.analysis_type == analysis_type)
    
    analyses = query.order_by(AIAnalysis.created_at.desc()).all()
    return analyses

@router.get("/price-prediction/{property_id}")
async def get_price_prediction(property_id: int, db: Session = Depends(get_db)):
    """Get price prediction for a property"""
    analysis = db.query(AIAnalysis).filter(
        AIAnalysis.property_id == property_id,
        AIAnalysis.predicted_price.isnot(None)
    ).order_by(AIAnalysis.created_at.desc()).first()
    
    if not analysis:
        raise HTTPException(status_code=404, detail="No price prediction found")
    
    return {
        "predicted_price": analysis.predicted_price,
        "confidence": analysis.price_confidence,
        "factors": analysis.price_factors,
        "created_at": analysis.created_at
    }
