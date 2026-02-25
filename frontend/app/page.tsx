// frontend/app/page.tsx

async function getProfileData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/profile/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
}

export default async function Home() {
  const profile = await getProfileData();

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center font-sans">
      
      {/* AMBIENT BACKGROUND FUTURISTIK (Lebih cerah & tajam) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-900/5">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-400/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-fuchsia-500/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-violet-500/30 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10 relative">
        
        {/* KOLOM KIRI: Teks */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          
          <div 
            className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-sm font-bold text-slate-700 mb-8"
            style={{ animationDelay: '80ms' }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            Open for Innovation & Collaboration
          </div>

          <h1 
            className="opacity-0 animate-fade-in-up text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
            style={{ animationDelay: '200ms' }}
          >
            Merancang Masa Depan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 drop-shadow-sm">
              Dengan Data & AI.
            </span>
          </h1>

          <h2 
            className="opacity-0 animate-fade-in-up text-2xl font-bold text-slate-700 mb-6 pl-4 border-l-4"
            style={{ animationDelay: '300ms', borderImage: 'linear-gradient(to bottom, #06b6d4, #d946ef) 1' }}
          >
            Saya {profile.nama} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">{profile.role}</span>
          </h2>

          <p 
            className="opacity-0 animate-fade-in-up text-lg text-slate-600 leading-relaxed max-w-xl mb-10"
            style={{ animationDelay: '400ms' }}
          >
            Mengubah data kompleks menjadi solusi cerdas. Saya menggabungkan analisis prediktif mendalam dengan arsitektur perangkat lunak modern untuk menciptakan dampak nyata. {profile.deskripsi_singkat}
          </p>
          
          <div 
            className="opacity-0 animate-fade-in-up flex flex-wrap gap-5"
            style={{ animationDelay: '600ms' }}
          >
            <a 
              href="/projects" 
              className="px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
            >
              Eksplorasi Karya
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a 
              href="/about" 
              className="px-8 py-4 glass-panel text-slate-900 rounded-2xl font-bold hover:bg-white hover:text-violet-600 transition-all duration-300"
            >
              Kenali Saya
            </a>
          </div>

        </div>

        {/* KOLOM KANAN: Foto Kreatif (Menggunakan foto-home.jpg) */}
        <div 
          className="flex justify-center lg:justify-end order-1 lg:order-2 opacity-0 animate-slide-in-right relative"
          style={{ animationDelay: '250ms' }}
        >
          {/* Efek "Ring" Bercahaya di belakang foto */}
          <div className="absolute inset-0 m-auto w-full h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-[3rem] blur-2xl opacity-40 animate-pulse-slow -z-10 scale-110"></div>
          
          <div className="relative w-80 h-96 lg:w-[28rem] lg:h-[34rem] rounded-[3rem] overflow-hidden glass-panel border-2 border-white/80 p-2 group hover:scale-[1.02] transition-all duration-500">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                {/* MENGGUNAKAN FOTO MANUAL DARI FOLDER PUBLIC */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/profile/bersila.jpeg"  
                  alt={profile.nama} 
                  className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700 filter saturate-110"
                />
                 {/* Overlay gradient halus di bawah foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}