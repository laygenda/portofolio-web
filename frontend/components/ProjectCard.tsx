// frontend/components/ProjectCard.tsx
"use client"; // Wajib ditambahkan agar fitur "Klik/Pop-up" bisa berjalan

import { useState } from "react";

export interface Project {
  id: number;
  judul: string;
  deskripsi: string;
  tech_stack: string;
  gambar_url: string;
  repo_url: string;
  tanggal_pengerjaan: string;
}

export default function ProjectCard({ project, index }: { project: Project, index: number }) {
  // State untuk mengontrol apakah Pop-up sedang terbuka atau tertutup
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const stacks = project.tech_stack ? project.tech_stack.split(',').map(s => s.trim()) : [];
  
  // Rumus delay animasi: kartu pertama 400ms, kedua 550ms, ketiga 700ms, dst.
  const animationDelay = `${400 + index * 150}ms`;

  return (
    <>
      {/* KARTU PROJECT UTAMA (Di-klik untuk membuka Pop-up) */}
      <div 
        className="opacity-0 animate-fade-in-up glass-panel glass-panel-hover rounded-[2rem] overflow-hidden flex flex-col h-full group cursor-pointer"
        style={{ animationDelay: animationDelay }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Bagian Gambar Kartu */}
        <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.gambar_url || 'https://placehold.co/600x400'} 
            alt={project.judul}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
          {/* Ikon Kaca Pembesar (Muncul saat di-hover) */}
          <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors flex items-center justify-center">
            <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>

        {/* Bagian Konten Teks */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl font-extrabold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{project.judul}</h3>
          <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
            {project.deskripsi}
          </p>
          
          {/* Label Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {stacks.slice(0, 3).map((stack, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                {stack}
              </span>
            ))}
            {stacks.length > 3 && <span className="text-xs font-bold text-slate-400 py-1.5">+{stacks.length - 3} lagi</span>}
          </div>

          {/* Footer Card */}
          <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">
              {new Date(project.tanggal_pengerjaan).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </span>
            <span className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              Lihat Detail →
            </span>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* POP-UP MODAL (Hanya muncul jika isModalOpen bernilai true) */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 backdrop-blur-md bg-slate-900/80 transition-opacity animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          
          {/* Background overlay (Klik untuk menutup) */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Kontainer Modal */}
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row z-10">
            
            {/* Tombol Close (X) */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-800 p-3 rounded-full transition-colors z-20 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Sisi Kiri: Area Gambar (Disesuaikan untuk rasio 3:4 dengan object-contain) */}
            <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center relative p-8">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                  src={project.gambar_url || 'https://placehold.co/600x400'} 
                  alt={project.judul}
                  className="object-contain w-full h-full max-h-[70vh] rounded-xl shadow-md"
                />
            </div>

            {/* Sisi Kanan: Area Teks & Penjelasan Lengkap */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
              <span className="text-sm text-blue-600 font-bold tracking-widest uppercase mb-2">
                 {new Date(project.tanggal_pengerjaan).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{project.judul}</h2>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-grow">
                {project.deskripsi}
              </p>
              
              <div className="mb-10">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Teknologi yang digunakan</h4>
                <div className="flex flex-wrap gap-2">
                  {stacks.map((stack, idx) => (
                    <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold px-4 py-2 rounded-xl">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {project.repo_url && (
                <a 
                  href={project.repo_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30 w-full mt-auto"
                >
                  Kunjungi Repositori / Demo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}