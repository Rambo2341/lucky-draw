import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";

/** Per-page metadata with a canonical URL, language alternates and matching OpenGraph/Twitter fields. */
export function pageMetadata({ locale, title, description, path }: { locale: Locale; title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` } },
    openGraph: { title: `${title} — ${site.name}`, description, url: `/${locale}${path}` },
    twitter: { title: `${title} — ${site.name}`, description },
  };
}
