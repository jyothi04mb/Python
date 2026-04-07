# from pydantic import BaseModel, EmailStr
# from typing import Optional
# from datetime import datetime

# class UserBase(BaseModel):
#     email: EmailStr
#     username: str
#     full_name: Optional[str] = None
#     is_active: bool = True

# class UserCreate(UserBase):
#     password: str

# class UserRead(UserBase):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class UserUpdate(BaseModel):
#     email: Optional[EmailStr] = None
#     username: Optional[str] = None
#     full_name: Optional[str] = None
#     is_active: Optional[bool] = None

from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int
    
    class Config:
        from_attributes = True  # For Pydantic v2
        # If you're using Pydantic v1, use: orm_mode = True

class User(UserResponse):
    pass  # Alias for UserResponse for backward compatibility



# from pydantic import BaseModel, EmailStr, validator
# from typing import Optional
# from datetime import datetime

# class UserBase(BaseModel):
#     email: EmailStr
#     username: str
#     full_name: Optional[str] = None
#     is_active: Optional[bool] = True

# class UserCreate(UserBase):
#     password: str
    
#     @validator('password')
#     def validate_password(cls, v):
#         if len(v) < 8:
#             raise ValueError('Password must be at least 8 characters long')
#         if len(v) > 72:
#             raise ValueError('Password cannot be longer than 72 characters')
#         return v
    
#     @validator('username')
#     def validate_username(cls, v):
#         if len(v) < 3:
#             raise ValueError('Username must be at least 3 characters long')
#         if len(v) > 50:
#             raise ValueError('Username cannot be longer than 50 characters')
#         return v

# class UserUpdate(BaseModel):
#     email: Optional[EmailStr] = None
#     username: Optional[str] = None
#     full_name: Optional[str] = None
#     password: Optional[str] = None
#     is_active: Optional[bool] = None
    
#     @validator('password')
#     def validate_password(cls, v):
#         if v is not None:
#             if len(v) < 8:
#                 raise ValueError('Password must be at least 8 characters long')
#             if len(v) > 72:
#                 raise ValueError('Password cannot be longer than 72 characters')
#         return v

# class UserInDBBase(UserBase):
#     id: Optional[int] = None
#     created_at: Optional[datetime] = None
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class UserRead(UserBase):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class User(UserInDBBase):
#     pass

# class UserInDB(UserInDBBase):
#     hashed_password: str

