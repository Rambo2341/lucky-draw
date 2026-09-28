import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Amiri, Bodoni_Moda, Hanken_Grotesk, Readex_Pro } from "next/font/google";
import { dir, getDict, isLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { DemoBanner, Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });
const readex = Readex_Pro({ subsets: ["arabic"], variable: "--font-readex", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${t.brand} — ${t.home.title}`, template: `%s — ${t.brand}` },
    description: t.home.lede,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", ar: "/ar" } },
    openGraph: { title: t.brand, description: t.home.lede, locale: locale === "ar" ? "ar_SA" : "en_US", type: "website" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return (
    <html lang={locale} dir={dir(locale)} className={`${bodoni.variable} ${hanken.variable} ${amiri.variable} ${readex.variable}`}>
      <body>
        <a href="#main" className="fixed start-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-2 text-sm text-stock focus:translate-y-0">
          {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
        </a>
        <DemoBanner locale={locale} />
        <Header locale={locale} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
