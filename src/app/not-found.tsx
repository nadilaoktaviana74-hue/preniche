import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center font-black text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm text-slate-600 max-w-md mb-6">
        Halaman yang Anda cari mungkin telah dipindahkan atau tautan tidak valid.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}
