import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Preniche — Campus Thrift & Preloved Marketplace Mahasiswa",
  description:
    "Platform jual-beli dan sewa barang preloved terverifikasi email kampus .ac.id. Temukan buku kuliah, peralatan kost, alat praktikum murah dengan titik COD aman di lingkungan kampus.",
  keywords: [
    "campus thrift",
    "preloved mahasiswa",
    "jual beli buku kuliah",
    "peralatan kost",
    "titik temu COD kampus",
    "preniche",
    "ITB",
    "UI",
    "UGM",
    "Undip",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
