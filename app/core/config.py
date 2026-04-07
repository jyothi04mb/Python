from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # Required fields only
    database_url: str = "postgresql://jyothibharathkumar@localhost:5432/api_db"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "hzezMi4sPGJxOe8477dl9v-gOGwFPKXaT7SU85BsNcY"
    
    # Optional fields with defaults
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    api_title: str = "Backend API"
    api_version: str = "1.0.0"
    debug: bool = True
    cache_ttl: int = 3600
    application_cache_size: int = 1000
    redis_cache_ttl: int = 7200
    
    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields

settings = Settings()
