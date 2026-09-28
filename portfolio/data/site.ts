/**
 * Global site configuration.
 *
 * Edit this file to change your name, contact details and social links.
 * Any link left as an empty string is hidden automatically.
 */

import type { L } from "@/lib/i18n";

export const site = {
  /** Your name as shown in the logo, footer and metadata. */
  name: "Zenox",

  /** Main professional role. */
  role: { en: "Web & Mobile Developer", ar: "مطوّر مواقع وتطبيقات جوال" } as L,

  /** Short headline shown in hero sections and metadata. */
  tagline: {
    en: "I design and develop premium websites and mobile applications for iPhone and Android.",
    ar: "أصمّم وأطوّر مواقع إلكترونية وتطبيقات جوال فاخرة لآيفون وأندرويد.",
  } as L,

  /** SEO / metadata description. */
  description: {
    en: "Zenox is a Web & Mobile Developer creating responsive websites, modern web applications, and cross-platform iPhone and Android apps using Next.js, React, TypeScript, and React Native.",
    ar: "Zenox مطوّر مواقع وتطبيقات جوال، يبني مواقع متجاوبة وتطبيقات ويب حديثة وتطبيقات لآيفون وأندرويد باستخدام Next.js وReact وTypeScript وReact Native.",
  } as L,

  /**
   * Production URL used for canonical links, sitemap and OpenGraph.
   * Set NEXT_PUBLIC_SITE_URL in your environment.
   * On Vercel, the production domain is used automatically when available.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),

  locale: "en_US",

  /** Freelance availability status. */
  availability: {
    /** Shows the "Available for freelance projects" badge. */
    available: true,
  },

  /**
   * Public contact email.
   * Leave empty to hide it everywhere.
   */
  email: "",

  /**
   * Social links.
   * Leave any value empty to hide that link automatically.
   */
  social: {
    github: "",
    linkedin: "",
  },
} as const;

export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Returns only social/contact links that are actually configured.
 */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];

  if (site.social.github) {
    links.push({
      label: "GitHub",
      href: site.social.github,
    });
  }

  if (site.social.linkedin) {
    links.push({
      label: "LinkedIn",
      href: site.social.linkedin,
    });
  }

  if (site.email) {
    links.push({
      label: "Email",
      href: `mailto:${site.email}`,
    });
  }

  return links;
}

/** Main navigation. Labels are translated in lib/i18n.ts. */
export const navItems = [
  { key: "work", href: "/work" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;
