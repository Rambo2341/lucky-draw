import type { Metadata } from "next";
import { site } from "@/data/site";

/** Per-page metadata with canonical URL and matching OpenGraph/Twitter fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} — ${site.name}`, description, url: path },
    twitter: { title: `${title} — ${site.name}`, description },
  };
}
