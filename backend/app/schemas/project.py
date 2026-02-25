# Format JSON untuk output project & log

# backend/app/schemas/project.py
from pydantic import BaseModel
from typing import Optional
from datetime import date

class ProjectBase(BaseModel):
    judul: str
    deskripsi: str
    tech_stack: Optional[str] = None
    gambar_url: Optional[str] = None
    repo_url: Optional[str] = None
    tanggal_pengerjaan: Optional[date] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True 
        
# menambahkan class update, sehingga menjadi CRUD
class ProjectUpdate(BaseModel):
    judul: Optional[str] = None
    deskripsi: Optional[str] = None
    tech_stack: Optional[str] = None
    gambar_url: Optional[str] = None
    repo_url: Optional[str] = None
    tanggal_pengerjaan: Optional[date] = None