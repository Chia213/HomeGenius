from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    area: Optional[float] = None
    rooms: Optional[int] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    property_type: Optional[str] = None
    condition: Optional[str] = None
    year_built: Optional[int] = None
    floor: Optional[int] = None
    total_floors: Optional[int] = None
    features: Optional[Dict[str, Any]] = None
    images: Optional[List[str]] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    area: Optional[float] = None
    rooms: Optional[int] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    property_type: Optional[str] = None
    condition: Optional[str] = None
    year_built: Optional[int] = None
    floor: Optional[int] = None
    total_floors: Optional[int] = None
    features: Optional[Dict[str, Any]] = None
    images: Optional[List[str]] = None
    is_active: Optional[bool] = None

class Property(PropertyBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_active: bool

    class Config:
        from_attributes = True

class PropertySearch(BaseModel):
    query: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    min_area: Optional[float] = None
    max_area: Optional[float] = None
    rooms: Optional[int] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    property_type: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    features: Optional[List[str]] = None
    page: int = Field(default=1, ge=1)
    limit: int = Field(default=20, ge=1, le=100)

class PropertyResponse(BaseModel):
    properties: List[Property]
    total: int
    page: int
    limit: int
    total_pages: int
