from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import get_password_hash
import redis
import json, logging
from typing import List
# In-memory application cache
app_cache = {}

class UserService:
    @staticmethod
    def create_user(db: Session, user: UserCreate) -> User:
        """Create a new user"""
        try:
            hashed_password = get_password_hash(user.password)
            db_user = User(
                email=user.email,
                username=user.username,
                full_name=user.full_name,
                hashed_password=hashed_password,
                is_active=user.is_active if hasattr(user, 'is_active') else True
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except Exception as e:
            db.rollback()
            raise e

    @staticmethod
    def get_user(db: Session, user_id: int, redis_client: redis.Redis) -> User:
        # """Get user by ID"""
        # return db.query(User).filter(User.id == user_id).first()
        """Get user by ID: check app cache -> redis -> db"""
        # 1) app cache
        users = app_cache.get("users") or []
        # # dict of id->User or id->dict
        user = next((u for u in users if getattr(u, "id", None) == user_id), None)
        # print("found in app_cache:" if user else "not found in app_cache", user)
        if user:
            print("FOUND in app cache")
            return user
        else:
        # 2) redis cache (key per-user)
            users_from_redis = redis_client.get("users")
            if users_from_redis:
                try:
                    s = users_from_redis.decode() if isinstance(users_from_redis, (bytes, bytearray)) else users_from_redis
                    data = json.loads(s)
                    print("parsed data from redis for users key:", data)
                    if isinstance(data, dict):
                        if int(data.get("id")) == int(user_id):
                            return data

                        else:
                            user = db.query(User).filter(User.id == user_id).first()
                            if not user:
                                return None
                            else:
                                upsert_redis_cache_for_user(user)
                                return user
                    # if list
                    if isinstance(data, list):
                        for item in data:
                            if isinstance(item, dict) and item.get("id") == user_id:
                                print("FOUND in list under", key)
                                return item
                            else:
                                user = db.query(User).filter(User.id == user_id).first()
                                if not user:
                                    return None
                                else:
                                    upsert_redis_cache_for_user(user)
                                    return user
                except Exception:
                    # fall through to DB on parse error
                    pass
        

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> User:
        """Get user by username"""
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[UserResponse]:
        """Get all users"""
        return db.query(User).offset(skip).limit(limit).all()
    # @staticmethod
    # def get_users(
    #     db: Session,
    #     redis_client: redis.Redis,
    #     skip: int = 0,
    #     limit: int = 100
    # ) -> list[UserResponse]:
    #     """Get all users"""
    #     return db.query(User).offset(skip).limit(limit).all()
        # users = UserService.get_users(db, skip=skip, limit=limit)
        # return users

    @staticmethod
    def get_users_from_app_cache() -> list[UserResponse]:
        if "users" in app_cache:
            return app_cache["users"]
        return []

    @staticmethod
    def get_users_from_redis_cache(redis_client: redis.Redis) -> list[UserResponse]:
        users_from_redis = redis_client.get("users")
        try:
            if not users_from_redis:
                return []
            s = users_from_redis.decode() if isinstance(users_from_redis, (bytes, bytearray)) else users_from_redis
            data = json.loads(s)
            if isinstance(data, dict):
                data = [data]
            return [UserResponse.parse_obj(item) for item in data]
        except Exception as e:
            logger.exception("Failed parsing users from redis")
            raise

    
    @staticmethod
    def set_users_in_app_cache(users: list[UserResponse]):
        app_cache["users"] = users

    @staticmethod
    def set_users_in_redis_cache(redis_client: redis.Redis, users: list[UserResponse]):
        redis_client.set("users", b",".join(user.json().encode() for user in users))

    """
    Cache-Aside (lazy loading)

    App checks cache first. On miss, read DB, populate cache, return value. Writes update DB then invalidate or update cache.
    Good for read-heavy workloads, simple.
    """
    upsert_redis_cache_for_user(user:User):
        """Upsert a single user in Redis cache"""               
        # 1. Get the existing byte string
        existing_data = redis_client.get("users")

        # 2. Prepare the new user's data
        new_user_bytes = user.json().encode()

        if existing_data:
            # 3. Append the new user with a comma separator
            # We concatenate bytes: existing + b"," + new
            updated_data = existing_data + b"," + new_user_bytes
        else:
            # If the cache was empty, the new user is the only data
            updated_data = new_user_bytes

        # 4. Save back to Redis
        redis_client.set("users", updated_data)