// frontend/components/ActivityChart.tsx
"use client";

import dynamic from "next/dynamic";

// FIXED dynamic import
const ActivityCalendar = dynamic(
  () =>
    import("react-activity-calendar").then(
      (mod) => mod.ActivityCalendar
    ),
  { ssr: false }
)

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

export default function ActivityChart({ data }: { data: ActivityData[] }) {
  return (
    // 1. Menghapus bg-white dan border karena sudah dibungkus glass-panel di halaman utamanya
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 w-full text-left">
        Riwayat Kontribusi & Pengerjaan Project
      </h2>

      {/* 2. KUNCI PERBAIKAN: Menambahkan text-slate-600 dan font-medium di sini */}
      <div className="overflow-x-auto w-full flex justify-center pb-4 text-slate-600 font-medium">
        {data && data.length > 0 ? (
          <ActivityCalendar
            data={data}
            colorScheme="light" // 3. Memaksa mode terang agar teks menggunakan warna gelap
            theme={{
              // 4. TEMA FUTURISTIK: Mengganti hijau GitHub menjadi gradasi Ungu & Cyan!
              light: [
                '#f1f5f9', // Level 0: Abu-abu sangat muda (Kosong)
                '#c4b5fd', // Level 1: Ungu Muda (Violet 300)
                '#8b5cf6', // Level 2: Ungu Terang (Violet 500)
                '#06b6d4', // Level 3: Cyan Terang (Cyan 500)
                '#0891b2'  // Level 4: Cyan Gelap (Cyan 600)
              ],
            }}
            labels={{
              totalCount: '{{count}} aktivitas dalam satu tahun terakhir',
            }}
          />
        ) : (
          <p className="text-slate-400">Memuat data aktivitas...</p>
        )}
      </div>
    </div>
  );
}