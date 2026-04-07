import json
import redis
from typing import Optional, Any
from app.core.config import settings

class CacheService:
    def __init__(self):
        self.redis_client = redis.Redis.from_url(settings.redis_url)
        self.app_cache = {}  # In-memory cache
        self.app_cache_ttl = 300  # 5 minutes
        self.redis_ttl = 3600  # 1 hour

    def get(self, key: str) -> Optional[Any]:
        # Try app cache first
        if key in self.app_cache:
            return self.app_cache[key]
        
        # Try Redis cache
        try:
            cached_data = self.redis_client.get(key)
            if cached_data:
                data = json.loads(cached_data)
                # Store in app cache
                self.app_cache[key] = data
                return data
        except Exception as e:
            print(f"Redis error: {e}")
        
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        # Store in app cache
        self.app_cache[key] = value
        
        # Store in Redis
        try:
            redis_ttl = ttl or self.redis_ttl
            self.redis_client.setex(key, redis_ttl, json.dumps(value, default=str))
        except Exception as e:
            print(f"Redis error: {e}")

    def delete(self, key: str) -> None:
        # Remove from app cache
        if key in self.app_cache:
            del self.app_cache[key]
        
        # Remove from Redis
        try:
            self.redis_client.delete(key)
        except Exception as e:
            print(f"Redis error: {e}")
