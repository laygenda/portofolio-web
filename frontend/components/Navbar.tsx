// frontend/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    // 1. Mengubah top-6 menjadi top-4 agar lebih merapat ke langit-langit layar
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      
      {/* 2. Mengurangi py-3 menjadi py-2, dan max-w-3xl menjadi max-w-2xl agar kapsul lebih ramping */}
      <nav className="pointer-events-auto bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] rounded-full px-5 py-2 w-full max-w-2xl flex justify-between items-center transition-all duration-500 hover:bg-white/80 hover:shadow-violet-500/10 hover:border-white/80">
        
        {/* 3. Ukuran logo diturunkan dari text-2xl menjadi text-xl agar proporsional */}
        <Link href="/" className="text-xl font-extrabold tracking-tighter hover:scale-105 transition-transform duration-300">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500 drop-shadow-sm">LAY.</span>
          <span className="text-slate-800">GENDA</span>
        </Link>

        {/* Menu Links */}
        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  // 4. Padding tombol dikurangi menjadi px-4 py-1.5, dan teks sedikit diperkecil
                  className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center ${
                    isActive 
                      ? "bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 text-violet-700 shadow-inner border border-white/80" 
                      : "text-slate-500 hover:text-cyan-600 hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}