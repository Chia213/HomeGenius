from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class PricePrediction(BaseModel):
    predicted_price: float
    confidence: float = Field(ge=0, le=1)
    factors: Dict[str, Any]
    model_version: str

class StyleAnalysis(BaseModel):
    detected_styles: List[Dict[str, Any]]  # [{"style": "modern", "confidence": 0.85}]
    confidence: float = Field(ge=0, le=1)
    features: Dict[str, Any]
    model_version: str

class ImageAnalysis(BaseModel):
    quality_score: float = Field(ge=0, le=1)
    analysis_results: Dict[str, Any]
    processing_time: float

class AIAnalysisCreate(BaseModel):
    property_id: int
    analysis_type: str = "combined"  # price, style, combined

class AIAnalysisResponse(BaseModel):
    id: int
    property_id: int
    predicted_price: Optional[float] = None
    price_confidence: Optional[float] = None
    price_factors: Optional[Dict[str, Any]] = None
    detected_styles: Optional[List[Dict[str, Any]]] = None
    style_confidence: Optional[float] = None
    style_features: Optional[Dict[str, Any]] = None
    image_analysis: Optional[Dict[str, Any]] = None
    quality_score: Optional[float] = None
    model_version: Optional[str] = None
    analysis_type: str
    processing_time: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True

class StyleCategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None
    keywords: Optional[List[str]] = None

class StyleCategory(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    keywords: Optional[List[str]] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ImageUploadRequest(BaseModel):
    property_id: Optional[int] = None
    analysis_type: str = "style"  # style, price, combined

class ImageAnalysisResponse(BaseModel):
    analysis_id: int
    detected_styles: List[Dict[str, Any]]
    style_confidence: float
    quality_score: float
    processing_time: float
    recommendations: Optional[List[Dict[str, Any]]] = None
