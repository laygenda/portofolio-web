# Endpoint untuk data Home & About

# Membuat CRUD
# backend/app/api/profile.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema

router = APIRouter()

# 1. Endpoint untuk mengambil data profil (GET)
@router.get("/", response_model=user_schema.UserResponse)
def get_profile(db: Session = Depends(get_db)):
    # Ambil user pertama dari database (karena ini portofolio personal)
    profile = db.query(user_model.User).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profil belum ditambahkan ke database")
    return profile

# 2. Endpoint untuk menambahkan/mengupdate profil (POST)
@router.post("/", response_model=user_schema.UserResponse)
def create_or_update_profile(profile_data: user_schema.UserCreate, db: Session = Depends(get_db)):
    profile = db.query(user_model.User).first()
    
    if profile:
        # Update jika sudah ada
        for key, value in profile_data.model_dump().items():
            setattr(profile, key, value)
    else:
        # Create jika belum ada
        profile = user_model.User(**profile_data.model_dump())
        db.add(profile)
        
    db.commit()
    db.refresh(profile)
    return profile