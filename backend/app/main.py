# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base

# Import Routers
from app.api import profile, projects

# Generate tabel otomatis
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "Portofolio API",
    description = "Backend untuk web portofolio yang terhubung dengan PostgreSQL",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Ganti dengan ["http://localhost:3000"] saat production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Daftarkan Router (Pengganti data dummy)
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])

@app.get("/")
async def root():
    return {"message": "Sistem Backend Portofolio Berjalan Sempurna!"}