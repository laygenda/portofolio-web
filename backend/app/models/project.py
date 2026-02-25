# backend/app/models/project.py
from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from app.core.database import Base
from sqlalchemy.sql import func

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    judul = Column(String(200), nullable=False)
    deskripsi = Column(Text, nullable=False)
    tech_stack = Column(String(255)) # Contoh: "FastAPI, Next.js, PostgreSQL"
    gambar_url = Column(String(255))
    repo_url = Column(String(255))
    tanggal_pengerjaan = Column(Date)
    
    # fitur baru dengan mencatat waktu otomatis saat data ditambahkan
    created_at = Column(DateTime(timezone=True), server_default=func.now())