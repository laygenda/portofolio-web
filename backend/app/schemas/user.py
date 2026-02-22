# Format JSON untuk output profile

# backend/app/schemas/user.py
from pydantic import BaseModel
from typing import Optional

# Skema dasar
class UserBase(BaseModel):
    nama: str
    role: str
    lokasi: Optional[str] = None
    deskripsi_singkat: Optional[str] = None
    deskripsi_detail: Optional[str] = None
    foto_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

# Skema saat Create (input data)
class UserCreate(UserBase):
    pass

# Skema saat Response (output API)
class UserResponse(UserBase):
    id: int

    # Konfigurasi agar Pydantic bisa membaca model SQLAlchemy
    class Config:
        from_attributes = True
