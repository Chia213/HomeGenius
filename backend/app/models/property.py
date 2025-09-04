from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Property(Base):
    __tablename__ = "properties"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    area = Column(Float)  # Square meters
    rooms = Column(Integer)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    
    # Location
    address = Column(String(500))
    city = Column(String(100))
    postal_code = Column(String(20))
    latitude = Column(Float)
    longitude = Column(Float)
    
    # Property details
    property_type = Column(String(50))  # apartment, house, etc.
    condition = Column(String(50))  # new, renovated, needs_renovation
    year_built = Column(Integer)
    floor = Column(Integer)
    total_floors = Column(Integer)
    
    # Features
    features = Column(JSON)  # balcony, garden, parking, etc.
    
    # Images
    images = Column(JSON)  # List of image URLs
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_active = Column(Boolean, default=True)
    
    # Relationships
    ai_analyses = relationship("AIAnalysis", back_populates="property")
    user_favorites = relationship("UserFavorite", back_populates="property")

class UserFavorite(Base):
    __tablename__ = "user_favorites"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    property_id = Column(Integer, ForeignKey("properties.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="favorites")
    property = relationship("Property", back_populates="user_favorites")
