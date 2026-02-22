# Tabel profil pengguna & social media

# backend/app/models/user.py
from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    lokasi = Column(String(100))
    deskripsi_singkat = Column(Text)
    deskripsi_detail = Column(Text) # Untuk halaman About
    foto_url = Column(String(255))
    github_url = Column(String(255))
    linkedin_url = Column(String(255))