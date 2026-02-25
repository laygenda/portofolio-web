// frontend/app/about/page.tsx

async function getProfileData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Fallback data if API fails (hapus fallback ini jika API sudah dipastikan selalu jalan)
  try {
    const res = await fetch(`${apiUrl}/api/profile/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data profil");
    return res.json();
  } catch (error) {
    return {
      nama: "Nama Kamu",
      role: "Data Scientist & AI Enthusiast",
      deskripsi_detail: "Seorang pembelajar seumur hidup yang antusias mengeksplorasi data, membangun model kecerdasan buatan, dan mengembangkan solusi backend.",
      github_url: "https://github.com",
      linkedin_url: "https://linkedin.com",
    };
  }
}

// Data Skills (Bisa juga dipindah ke file data terpisah nanti)
// Data Skills
const skillCategories = {
  pemrograman: [
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "R", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" },
    { name: "HTML5", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  ],
  software: [
    { name: "Apache Airflow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg" },
    { name: "Grafana", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
    { name: "Power BI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }, // PowerBI wikipedia biasanya aman, jika error kabari saya
    { name: "SPSS", img: "https://cdn.worldvectorlogo.com/logos/spss.svg" }, // DIUPDATE: Menggunakan CDN WorldVectorLogo
    { name: "Excel", img: "data:image/png;base64,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" }, // DIUPDATE: Menggunakan versi PNG dari Wikipedia agar pasti ter-render
    { name: "Tableau", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" },
    { name: "Streamlit", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg" },
    { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
    { name: "Flask", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
    { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { name: "Leaflet.js", img: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png" }, // DIUPDATE: Menggunakan icon marker bawaan Leaflet (icon resminya sulit diakses via hotlink)
    { name: "D3.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg" },
  ],
  softskills: [
    { name: "Kerja Tim", icon: "🤝" },
    { name: "Critical Thinking", icon: "🧠" },
    { name: "Problem Solving", icon: "🧩" },
    { name: "Komunikasi", icon: "🗣️" },
  ]
};

export default async function AboutPage() {
  const profile = await getProfileData();

  return (
    <main className="min-h-screen bg-slate-50 relative py-20 px-4 sm:px-8 font-sans overflow-hidden">
      
      {/* CSS Animasi Marquee yang diinjeksi langsung agar tidak perlu setting tailwind.config */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        /* Berhenti menggulir saat kursor di-hover (interaktif) */
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
        /* Menyembunyikan scrollbar native jika user menggeser manual */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* AMBIENT BACKGROUND FUTURISTIK (Konsisten) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-900/5">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-400/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-fuchsia-500/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* SECTION 1: Profil Utama */}
        <div 
          className={`opacity-0 animate-fade-in-up flex flex-col md:flex-row gap-10 items-center md:items-start glass-panel p-10 md:p-12 rounded-[3rem] bg-white/40 backdrop-blur-lg border border-white/60 shadow-xl`}
          style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}
        >
          <div className="w-56 h-56 flex-shrink-0 relative p-1.5 rounded-full bg-gradient-to-tr from-cyan-400 via-violet-400 to-fuchsia-400 shadow-xl">
             <div className="w-full h-full rounded-full overflow-hidden border-4 border-white relative bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/profile/santuy.jpeg"
                  alt={profile.nama} 
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                />
             </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Tentang Saya</h1>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 mb-6">
              {profile.role}
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed font-medium">
              {profile.deskripsi_detail}
            </p>
          </div>
        </div>

        {/* SECTION 2: Grid Edukasi & Pengalaman */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden py-2">
          
          {/* KOLOM PENDIDIKAN */}
          <div className={`opacity-0 animate-slide-in-left glass-panel glass-panel-hover !p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-lg border border-white/60`} style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6.5"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Pendidikan</h3>
            </div>
            
            {/* Wrapper utama yang memiliki garis vertikal penuh */}
            <div className="space-y-10 pl-6 border-l-[3px] border-cyan-400 ml-2">
              
              {/* Item 1 */}
              <div className="relative pl-6">
                {/* Titik diletakkan relatif terhadap border di wrapper utama */}
                <div className="absolute w-5 h-5 bg-cyan-500 rounded-full -left-[35.5px] top-1 border-4 border-white shadow-sm"></div>
                <h4 className="text-lg font-bold text-slate-900">PENS</h4>
                <p className="text-cyan-600 font-bold text-sm mb-3">Sains Data Terapan</p>
                <p className="text-slate-600 text-sm leading-relaxed">Fokus pada pemodelan prediktif, analisis data kompleks, dan implementasi AI.</p>
              </div>

              {/* Item 2 */}
              <div className="relative pl-6">
                <div className="absolute w-5 h-5 bg-cyan-500 rounded-full -left-[35.5px] top-1 border-4 border-white shadow-sm"></div>
                <h4 className="text-lg font-bold text-slate-900">SMA Ipiems Surabaya</h4>
                <p className="text-cyan-600 font-bold text-sm mb-3">Sains Data Terapan</p>
                <p className="text-slate-600 text-sm leading-relaxed">Penalaran logika dan perhitungan.</p>
              </div>

            </div>
          </div>

          {/* KOLOM PENGALAMAN */}
          <div className={`opacity-0 animate-slide-in-right glass-panel glass-panel-hover !p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-lg border border-white/60`} style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Pengalaman</h3>
            </div>
            
            {/* Wrapper utama yang memiliki garis vertikal penuh */}
            <div className="space-y-10 pl-6 border-l-[3px] border-fuchsia-400 ml-2">
              
              {/* Item 1 */}
              <div className="relative pl-6">
                <div className="absolute w-5 h-5 bg-fuchsia-500 rounded-full -left-[35.5px] top-1 border-4 border-white shadow-sm"></div>
                <h4 className="text-lg font-bold text-slate-900">IEEE SB PENS</h4>
                <p className="text-fuchsia-600 font-bold text-sm mb-3">Membership & Development</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Pengembangan anggota melalui peningkatan kompetensi.</p>
              </div>

              {/* Item 2 */}
              <div className="relative pl-6">
                <div className="absolute w-5 h-5 bg-fuchsia-500 rounded-full -left-[35.5px] top-1 border-4 border-white shadow-sm"></div>
                <h4 className="text-lg font-bold text-slate-900">UKM Software Development</h4>
                <p className="text-fuchsia-600 font-bold text-sm mb-3">Backend</p>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">Membangun website untuk Jasa Kontraktor</p>
              </div>

            </div>
          </div>
        </div>
        

        {/* SECTION 3: Keahlian & Teknologi (INTERACTIVE MARQUEE SLIDERS) */}
        <div className={`opacity-0 animate-fade-in-up glass-panel !p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-lg border border-white/60 overflow-hidden relative`} style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          
          {/* Efek Gradient di Kiri & Kanan untuk memudarkan ujung slider */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#f0f4f8] to-transparent z-10 pointer-events-none rounded-l-[2.5rem]"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#f0f4f8] to-transparent z-10 pointer-events-none rounded-r-[2.5rem]"></div>

          <h3 className="text-2xl font-bold text-center text-slate-900 mb-10">Keahlian & Teknologi</h3>
          
          <div className="space-y-12">
            
            {/* ROW 1: Bahasa Pemrograman */}
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 ml-4 md:ml-12">Bahasa Pemrograman</h4>
              {/* Container overflow-x-auto memungkinkan digeser manual di HP */}
              <div className="flex overflow-x-auto hide-scrollbar group">
                {/* Track Marquee - digandakan array-nya agar looping mulus */}
                <div className="flex animate-scroll-left pause-on-hover w-max gap-6 px-4">
                  {[...skillCategories.pemrograman, ...skillCategories.pemrograman].map((skill, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-28 h-28 bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={skill.img} alt={skill.name} className="w-12 h-12 object-contain mb-3 drop-shadow-sm" />
                      <span className="text-slate-700 text-xs font-bold">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 2: Software & Frameworks (Arah Berlawanan) */}
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 ml-4 md:ml-12 text-right md:text-left">Software & Frameworks</h4>
              <div className="flex overflow-x-auto hide-scrollbar group">
                <div className="flex animate-scroll-right pause-on-hover w-max gap-6 px-4">
                  {[...skillCategories.software, ...skillCategories.software].map((skill, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-28 h-28 bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm hover:shadow-violet-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={skill.img} alt={skill.name} className="w-12 h-12 object-contain mb-3 drop-shadow-sm" />
                      <span className="text-slate-700 text-xs font-bold text-center px-1">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: Softskills */}
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 ml-4 md:ml-12">Softskills</h4>
              <div className="flex overflow-x-auto hide-scrollbar group">
                <div className="flex animate-scroll-left pause-on-hover w-max gap-6 px-4" style={{animationDuration: '25s'}}>
                  {[...skillCategories.softskills, ...skillCategories.softskills, ...skillCategories.softskills].map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm hover:shadow-fuchsia-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex-shrink-0">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-slate-700 text-sm font-bold">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: CTA Hubungi Saya */}
        <div className={`opacity-0 animate-fade-in-up text-center glass-panel rounded-[2.5rem] p-12 bg-white/40 backdrop-blur-lg border border-white/60`} style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Hubungi Saya</h3>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Tertarik untuk berkolaborasi dalam proyek Data Science, AI, atau pengembangan Web Backend?
          </p>
          
          <div className="flex justify-center gap-6 md:gap-8 items-center">
            {/* Ikon Email */}
            <a href="mailto:laygenda102@gmail.com" className="text-violet-600 bg-white/80 p-4 rounded-2xl border border-white/80 hover:bg-gradient-to-tr hover:from-violet-500 hover:to-fuchsia-500 hover:text-white hover:border-transparent hover:-translate-y-2 hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all group">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
            
            {/* Ikon GitHub */}
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-violet-600 bg-white/80 p-4 rounded-2xl border border-white/80 hover:bg-gradient-to-tr hover:from-cyan-500 hover:to-violet-500 hover:text-white hover:border-transparent hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all group">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
            )}
            
            {/* Ikon LinkedIn */}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-violet-600 bg-white/80 p-4 rounded-2xl border border-white/80 hover:bg-gradient-to-tr hover:from-violet-500 hover:to-fuchsia-500 hover:text-white hover:border-transparent hover:-translate-y-2 hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all group">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            
            {/* Ikon Kaggle */}
             <a href="https://www.kaggle.com/laygenda102" target="_blank" rel="noreferrer" className="text-violet-600 bg-white/80 p-4 rounded-2xl border border-white/80 hover:bg-gradient-to-tr hover:from-cyan-500 hover:to-violet-500 hover:text-white hover:border-transparent hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all group">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.34-.246.526-.246h3.255c.142 0 .235.035.281.106.046.071.046.142 0 .213L12.07 14.61l6.966 8.944c.046.046.046.129 0 .248l-.211.057z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}