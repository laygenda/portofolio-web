# backend/app/api/profile.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db

# Mengimpor langsung dari file user.py (sesuai dengan yang Anda definisikan)
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, ProfileUpdate

router = APIRouter()

# 1. Endpoint untuk mengambil data profil (GET)
@router.get("/", response_model=UserResponse)
def get_profile(db: Session = Depends(get_db)):
    # Ambil user pertama dari database (karena ini portofolio personal)
    profile = db.query(User).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profil belum ditambahkan ke database")
    return profile

# 2. Endpoint untuk menambahkan/mengupdate profil (POST)
@router.post("/", response_model=UserResponse)
def create_or_update_profile(profile_data: UserCreate, db: Session = Depends(get_db)):
    profile = db.query(User).first()
    
    if profile:
        # Update jika sudah ada
        for key, value in profile_data.model_dump().items():
            setattr(profile, key, value)
    else:
        # Create jika belum ada
        profile = User(**profile_data.model_dump())
        db.add(profile)
        
    db.commit()
    db.refresh(profile)
    return profile

# 3. ENDPOINT BARU: Mengedit/Update Profil (PUT)
@router.put("/", response_model=UserResponse)
def update_profile(profile_data: ProfileUpdate, db: Session = Depends(get_db)):
    # Ambil profil Anda
    profile = db.query(User).first()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profil belum ada. Gunakan POST terlebih dahulu.")
        
    # Ambil data yang dikirim dari Swagger (hanya yang tidak kosong)
    update_data = profile_data.model_dump(exclude_unset=True)
    
    # Timpa data lama dengan data baru
    for key, value in update_data.items():
        setattr(profile, key, value)
        
    db.commit()
    db.refresh(profile)
    
    return profile