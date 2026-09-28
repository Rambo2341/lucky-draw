import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { locales } from "@/lib/i18n";
import { properties } from "@/demos/velora/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/services", "/about", "/contact"];
  const velora = ["", "/properties", "/locations", "/agents", "/about", "/contact", ...properties.map((p) => `/properties/${p.slug}`)];
  return locales.flatMap((l) => [
    ...pages.map((p) => ({ url: `${site.url}/${l}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/${l}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...velora.map((p) => ({ url: `${site.url}/demos/velora/${l}${p}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ]);
}
