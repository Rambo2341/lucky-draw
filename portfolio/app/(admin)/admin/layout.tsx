import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Sans_Arabic } from "next/font/google";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600"], variable: "--font-arabic", display: "swap" });

export const metadata: Metadata = {
  title: "لوحة التحكم — Zenox",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#0a0a0b", colorScheme: "dark" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${geist.variable} ${plexArabic.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
