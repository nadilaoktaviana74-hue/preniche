import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Preniche Untag — Marketplace & Preloved Mahasiswa Untag Surabaya",
  description:
    "Platform jual-beli dan sewa barang preloved mahasiswa Untag Surabaya. Temukan peralatan kos, alat praktikum, dan buku modul murah di lingkungan Semolowaru.",
  keywords: [
    "campus thrift",
    "preloved mahasiswa",
    "Untag Surabaya",
    "Universitas 17 Agustus 1945 Surabaya",
    "peralatan kos Semolowaru",
    "alat praktikum teknik Untag",
    "buku modul Untag",
    "titik COD Graha Wiyata",
    "preniche untag",
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
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}
