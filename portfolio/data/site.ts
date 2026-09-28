/**
 * Global site configuration.
 *
 * Edit this file to change your name, contact details and social links.
 * Any link left as an empty string is hidden automatically — nothing is
 * rendered as a broken or placeholder link.
 */
export const site = {
  /** Your name as shown in the logo, footer and metadata. */
  name: "Rambo",
  role: "Web & Mobile Developer",
  tagline: "I design and build polished digital experiences for web and mobile.",
  description:
    "Web & Mobile Developer building modern websites, web applications and cross-platform mobile apps with Next.js, React, TypeScript and React Native.",
  /**
   * Production URL, used for canonical links, sitemap and OpenGraph.
   * Set NEXT_PUBLIC_SITE_URL in your environment; on Vercel the production
   * domain is used automatically when it isn't set.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  locale: "en_US",
  availability: {
    available: true,
    label: "Available for freelance projects",
  },
  /** Public contact email. Leave empty to hide it everywhere. */
  email: "",
  social: {
    github: "",
    linkedin: "",
  },
} as const;

export type SocialLink = { label: string; href: string };

/** Returns only the social/contact links that are actually configured. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (site.social.github) links.push({ label: "GitHub", href: site.social.github });
  if (site.social.linkedin) links.push({ label: "LinkedIn", href: site.social.linkedin });
  if (site.email) links.push({ label: "Email", href: `mailto:${site.email}` });
  return links;
}

export const navItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
