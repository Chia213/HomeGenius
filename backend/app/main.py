from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api import properties, ai_analysis, recommendations, auth
from app.core.config import settings
from app.core.database import engine
from app.models import property, user, ai_analysis as ai_models

# Create database tables (with error handling)
try:
    property.Base.metadata.create_all(bind=engine)
    user.Base.metadata.create_all(bind=engine)
    ai_models.Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")
except Exception as e:
    print(f"Warning: Could not create database tables: {e}")
    print("Server will start but database features may not work")

app = FastAPI(
    title="HomeGenius API",
    description="AI-powered real estate platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploaded images
if not os.path.exists("uploads"):
    os.makedirs("uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(properties.router, prefix="/api/properties", tags=["properties"])
app.include_router(ai_analysis.router, prefix="/api/ai", tags=["ai-analysis"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["recommendations"])

@app.get("/")
async def root():
    return {"message": "HomeGenius API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
