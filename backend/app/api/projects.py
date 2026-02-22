# backend/app/api/projects.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date, timedelta  # Tambahan baru
from app.core.database import get_db
from app.models import project as project_model
from app.schemas import project as project_schema

router = APIRouter()

# 1. Endpoint ambil semua project
@router.get("/", response_model=List[project_schema.ProjectResponse])
def get_all_projects(db: Session = Depends(get_db)):
    return db.query(project_model.Project).all()

# 2. Endpoint tambah project baru
@router.post("/", response_model=project_schema.ProjectResponse)
def create_project(project_data: project_schema.ProjectCreate, db: Session = Depends(get_db)):
    new_project = project_model.Project(**project_data.model_dump())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

# 3. ENDPOINT BARU: Data untuk Activity Chart (Grafik ala GitHub)
@router.get("/activity")
def get_activity_chart(db: Session = Depends(get_db)):
    # Ambil semua tanggal project dari database
    projects = db.query(project_model.Project.tanggal_pengerjaan).all()
    
    # Hitung frekuensi project per tanggal
    activity_map = {}
    for p in projects:
        if p.tanggal_pengerjaan:
            d_str = p.tanggal_pengerjaan.strftime("%Y-%m-%d")
            activity_map[d_str] = activity_map.get(d_str, 0) + 1
    
    # Generate data 365 hari ke belakang agar grafik selalu penuh
    today = date.today()
    result = []
    
    for i in range(365, -1, -1):
        current_date = today - timedelta(days=i)
        d_str = current_date.strftime("%Y-%m-%d")
        count = activity_map.get(d_str, 0)
        
        # Level 0 (kosong/abu-abu) sampai 4 (hijau paling gelap)
        level = 0 if count == 0 else min(count, 4) 
        
        result.append({
            "date": d_str,
            "count": count,
            "level": level
        })
        
    return result

# 4. ENDPOINT BARU: Menghapus Project (DELETE)
@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    # Cari project di database berdasarkan ID
    project = db.query(project_model.Project).filter(project_model.Project.id == project_id).first()
    
    # Jika datanya tidak ditemukan
    if not project:
        raise HTTPException(status_code=404, detail="Project tidak ditemukan")
        
    # Jika ditemukan, hapus secara permanen
    db.delete(project)
    db.commit()
    
    return {"message": f"Project dengan ID {project_id} berhasil dihapus"}