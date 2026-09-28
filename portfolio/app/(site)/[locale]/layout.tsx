import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { site } from "@/data/site";
import { dir, getDict, isLocale, locales, tr, type Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600"], variable: "--font-arabic", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = `${site.name} — ${tr(site.role, locale)}`;
  const description = tr(site.description, locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", ar: "/ar", "x-default": "/en" } },
    openGraph: { type: "website", locale: locale === "ar" ? "ar_SA" : "en_US", url: `/${locale}`, siteName: site.name, title, description },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#0a0a0b", colorScheme: "dark" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDict(locale);
  return (
    <html lang={locale} dir={dir(locale)} className={`${geist.variable} ${geistMono.variable} ${plexArabic.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
        >
          {t.skip}
        </a>
        <Header locale={locale} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
