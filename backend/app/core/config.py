from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./homegenius.db"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # AI Models
    MODEL_PATH: str = "ai_models/models"
    UPLOAD_PATH: str = "uploads"
    
    # External APIs
    MAPS_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()
