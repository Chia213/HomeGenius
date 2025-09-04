from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class AIAnalysis(Base):
    __tablename__ = "ai_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"))
    
    # Price prediction
    predicted_price = Column(Float)
    price_confidence = Column(Float)  # 0-1 confidence score
    price_factors = Column(JSON)  # Factors that influenced the prediction
    
    # Style analysis
    detected_styles = Column(JSON)  # List of detected styles with confidence scores
    style_confidence = Column(Float)
    style_features = Column(JSON)  # Extracted style features
    
    # Image analysis
    image_analysis = Column(JSON)  # General image analysis results
    quality_score = Column(Float)  # Image quality assessment
    
    # Analysis metadata
    model_version = Column(String(50))
    analysis_type = Column(String(50))  # price, style, combined
    processing_time = Column(Float)  # Time taken for analysis
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    property = relationship("Property", back_populates="ai_analyses")

class StyleCategory(Base):
    __tablename__ = "style_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    keywords = Column(JSON)  # Keywords associated with this style
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    property_id = Column(Integer, ForeignKey("properties.id"))
    
    # Recommendation details
    recommendation_type = Column(String(50))  # style_match, price_match, location_match, etc.
    score = Column(Float)  # Recommendation score 0-1
    reasons = Column(JSON)  # Why this property was recommended
    
    # AI model info
    model_version = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User")
    property = relationship("Property")
