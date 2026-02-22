# backend/app/models/project.py
from sqlalchemy import Column, Integer, String, Text, Date
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    judul = Column(String(200), nullable=False)
    deskripsi = Column(Text, nullable=False)
    tech_stack = Column(String(255)) # Contoh: "FastAPI, Next.js, PostgreSQL"
    gambar_url = Column(String(255))
    repo_url = Column(String(255))
    tanggal_pengerjaan = Column(Date)