# Koneksi ke PostgreSQL/SQLite menggunakan SQLAlchemy

# backend/app/core/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load variabel dari file .env
load_dotenv()

# Ambil URL Database
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Membuat Engine (Mesin utama yang berkomunikasi dengan PostgreSQL)
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True
)

# Membuat SessionLocal (Sesi koneksi untuk setiap request API nanti)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class untuk pewarisan semua model tabel kita
Base = declarative_base()

# Dependency function untuk mengambil sesi database di API
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()