from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db, get_redis_client
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService
import redis

router = APIRouter()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """Create a new user"""
    try:
        # Check if user already exists
        existing_user = UserService.get_user_by_email(db, email=user.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        existing_username = UserService.get_user_by_username(db, username=user.username)
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        
        # Create the user
        db_user = UserService.create_user(db=db, user=user)
        
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user"
            )
        
        return db_user
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )

# @router.get("/", response_model=List[UserResponse])
# def get_users(
#     skip: int = 0,
#     limit: int = 100,
#     db: Session = Depends(get_db)
# ):
#     """Get all users"""
#     users = UserService.get_users(db, skip=skip, limit=limit)
#     return users

@router.get("/", response_model=List[UserResponse])
def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
    # redis_client: redis.Redis = Depends(get_redis_client)
):
    """Get all users"""
    users = UserService.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/cache", response_model=List[UserResponse])
def get_users_from_cache(
    redis_client: redis.Redis = Depends(get_redis_client)
):
    """Get users from Redis cache"""
    users = UserService.get_users_from_redis_cache(redis_client)
    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No users found in cache"
        )
    return users

@router.post("/cache", response_model=List[UserResponse])
def set_users_in_cache(
    users: List[UserResponse],
    redis_client: redis.Redis = Depends(get_redis_client)
):
    """Set users in Redis cache"""
    UserService.set_users_in_redis_cache(redis_client, users)
    return users

@router.get("/app-cache", response_model=List[UserResponse])
def get_users_from_app_cache():
    """Get users from in-memory application cache"""
    users = UserService.get_users_from_app_cache()
    if not users:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No users found in application cache"
        )
    return users

@router.post("/app-cache", response_model=List[UserResponse])
def set_users_in_app_cache(
    users: List[UserResponse]
):
    """Set users in in-memory application cache"""
    UserService.set_users_in_app_cache(users)
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    redis_client: redis.Redis = Depends(get_redis_client)
):
    """Get a specific user by ID"""
    user = UserService.get_user(db, user_id=user_id, redis_client=redis_client)
    print("user found:", user)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
