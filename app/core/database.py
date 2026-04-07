# # from sqlalchemy import create_engine, event
# # from sqlalchemy.ext.declarative import declarative_base
# # from sqlalchemy.orm import sessionmaker, Session
# # from sqlalchemy.pool import QueuePool
# # from contextlib import contextmanager
# # from .config import settings
# # import logging

# # logger = logging.getLogger(__name__)

# # # Create engine with connection pooling
# # engine = create_engine(
# #     settings.database_url,
# #     poolclass=QueuePool,
# #     pool_size=10,
# #     max_overflow=20,
# #     pool_pre_ping=True,
# #     pool_recycle=300,  # Recycle connections after 5 minutes
# #     echo=settings.debug
# # )
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, Session
# from sqlalchemy.pool import QueuePool
# from contextlib import contextmanager
# from .config import settings
# import logging

# logger = logging.getLogger(__name__)

# # Create engine
# engine = create_engine(
#     settings.database_url,
#     poolclass=QueuePool,
#     pool_size=10,
#     max_overflow=20,
#     pool_pre_ping=True,
#     echo=settings.debug
# )

# # Create session factory
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @contextmanager
# def get_db_context():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import redis

# Create the SQLAlchemy engine
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=5,
    max_overflow=10
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_redis_client():
    redis_client = redis.Redis(
        host="localhost",
        port=6379,
        db=0
    )
    try:
        yield redis_client
    finally:
        redis_client.close()