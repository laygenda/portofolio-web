// frontend/app/projects/page.tsx

import ProjectCard, { Project } from "@/components/ProjectCard";
import ActivityChart from "@/components/ActivityChart";

async function getProjectsData(): Promise<Project[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/projects/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data project");
  return res.json();
}

async function getActivityData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/projects/activity`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil data activity");
  return res.json();
}

export default async function ProjectsPage() {
  const [projects, activityData] = await Promise.all([
    getProjectsData(),
    getActivityData()
  ]);

  return (
    <main className="min-h-screen bg-slate-50 relative py-20 px-4 sm:px-8 font-sans overflow-hidden">
      
      {/* AMBIENT BACKGROUND FUTURISTIK (Konsisten) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-900/5">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-400/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-fuchsia-500/30 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-violet-500/30 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Header Halaman */}
        <div 
          className="opacity-0 animate-fade-in-up text-center max-w-3xl mx-auto"
          style={{ animationDelay: '80ms' }}
        >
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">Inovasi</span>
          </h1>
          <p className="text-slate-700 text-lg leading-relaxed font-medium">
            Kumpulan eksperimen yang saya kembangkan untuk memecahkan masalah nyata.
          </p>
        </div>

        {/* GRAFIK AKTIVITAS (Glass Panel) */}
        <div 
          className="opacity-0 animate-fade-in-up glass-panel p-8 rounded-[2.5rem]"
          style={{ animationDelay: '250ms' }}
        >
          <ActivityChart data={activityData} />
        </div>

        {/* Grid Card Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </main>
  );
}