/** Deployment settings. Leave a URL empty to hide the link that uses it. */
export const site = {
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  /** The Zenox portfolio, linked from the demo banner. Empty = the portfolio on this same site (/en or /ar). */
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "",
};
