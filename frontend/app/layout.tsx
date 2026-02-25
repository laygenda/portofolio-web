// frontend/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio | Lay Genda",
  description: "Portofolio profesional Data Scientist & Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        
        {/* GLOBAL NAVBAR (Kapsul Kaca Futuristik yang Baru) */}
        <Navbar />

        {/* Konten Halaman (Berubah-ubah sesuai URL) */}
        {children}
        
        {/* GLOBAL FOOTER */}
        <footer className="relative z-10 w-full text-center py-8 text-slate-400 font-medium text-sm mt-auto">
          © {new Date().getFullYear()} Lay Genda. Built with FastAPI & Next.js.
        </footer>
      </body>
    </html>
  );
}