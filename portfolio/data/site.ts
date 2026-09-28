/**
 * Global site configuration.
 *
 * Edit this file to change your name, contact details and social links.
 * Any link left as an empty string is hidden automatically.
 */

export const site = {
  /** Your name as shown in the logo, footer and metadata. */
  name: "Zenox",

  /** Main professional role. */
  role: "Web & Mobile Developer",

  /** Short headline shown in hero sections and metadata. */
  tagline:
    "I design and develop premium websites and mobile applications for iPhone and Android.",

  /** SEO / metadata description. */
  description:
    "Zenox is a Web & Mobile Developer creating responsive websites, modern web applications, and cross-platform iPhone and Android apps using Next.js, React, TypeScript, and React Native.",

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
    available: true,
    label: "Available for freelance projects",
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

/**
 * Main navigation items.
 */
export const navItems = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;
