import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/properties", "/locations", "/agents", "/about", "/contact"];
  return locales.flatMap((l) => [
    ...pages.map((p) => ({ url: `${site.url}/${l}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...properties.map((p) => ({ url: `${site.url}/${l}/properties/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ]);
}
