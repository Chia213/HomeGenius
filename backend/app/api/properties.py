from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.property import Property as PropertyModel
from app.schemas.property import Property, PropertyCreate, PropertyUpdate, PropertySearch, PropertyResponse
from sqlalchemy import and_, or_

router = APIRouter()

@router.post("/", response_model=Property)
async def create_property(property: PropertyCreate, db: Session = Depends(get_db)):
    """Create a new property"""
    db_property = PropertyModel(**property.dict())
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

@router.get("/{property_id}", response_model=Property)
async def get_property(property_id: int, db: Session = Depends(get_db)):
    """Get a specific property by ID"""
    property = db.query(PropertyModel).filter(PropertyModel.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property

@router.get("/", response_model=PropertyResponse)
async def search_properties(
    query: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    min_area: Optional[float] = Query(None),
    max_area: Optional[float] = Query(None),
    rooms: Optional[int] = Query(None),
    bedrooms: Optional[int] = Query(None),
    bathrooms: Optional[int] = Query(None),
    property_type: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    postal_code: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Search properties with filters"""
    
    # Build query
    db_query = db.query(PropertyModel).filter(PropertyModel.is_active == True)
    
    # Apply filters
    if query:
        db_query = db_query.filter(
            or_(
                PropertyModel.title.ilike(f"%{query}%"),
                PropertyModel.description.ilike(f"%{query}%"),
                PropertyModel.address.ilike(f"%{query}%")
            )
        )
    
    if min_price is not None:
        db_query = db_query.filter(PropertyModel.price >= min_price)
    if max_price is not None:
        db_query = db_query.filter(PropertyModel.price <= max_price)
    if min_area is not None:
        db_query = db_query.filter(PropertyModel.area >= min_area)
    if max_area is not None:
        db_query = db_query.filter(PropertyModel.area <= max_area)
    if rooms is not None:
        db_query = db_query.filter(PropertyModel.rooms == rooms)
    if bedrooms is not None:
        db_query = db_query.filter(PropertyModel.bedrooms == bedrooms)
    if bathrooms is not None:
        db_query = db_query.filter(PropertyModel.bathrooms == bathrooms)
    if property_type:
        db_query = db_query.filter(PropertyModel.property_type == property_type)
    if city:
        db_query = db_query.filter(PropertyModel.city.ilike(f"%{city}%"))
    if postal_code:
        db_query = db_query.filter(PropertyModel.postal_code == postal_code)
    
    # Get total count
    total = db_query.count()
    
    # Apply pagination
    offset = (page - 1) * limit
    properties = db_query.offset(offset).limit(limit).all()
    
    total_pages = (total + limit - 1) // limit
    
    return PropertyResponse(
        properties=properties,
        total=total,
        page=page,
        limit=limit,
        total_pages=total_pages
    )

@router.put("/{property_id}", response_model=Property)
async def update_property(
    property_id: int, 
    property_update: PropertyUpdate, 
    db: Session = Depends(get_db)
):
    """Update a property"""
    db_property = db.query(PropertyModel).filter(PropertyModel.id == property_id).first()
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    update_data = property_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_property, field, value)
    
    db.commit()
    db.refresh(db_property)
    return db_property

@router.delete("/{property_id}")
async def delete_property(property_id: int, db: Session = Depends(get_db)):
    """Soft delete a property"""
    db_property = db.query(PropertyModel).filter(PropertyModel.id == property_id).first()
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    db_property.is_active = False
    db.commit()
    return {"message": "Property deleted successfully"}

@router.get("/featured/", response_model=List[Property])
async def get_featured_properties(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get featured properties (most recent)"""
    properties = db.query(PropertyModel).filter(
        PropertyModel.is_active == True
    ).order_by(PropertyModel.created_at.desc()).limit(limit).all()
    return properties
