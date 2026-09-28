export type Service = {
  title: string;
  summary: string;
  details: string;
  includes: string[];
};

export const services: Service[] = [
  {
    title: "Web Development",
    summary: "Modern responsive websites and web experiences.",
    details:
      "Marketing sites, portfolios and landing pages that load fast, read clearly and work properly on every screen size.",
    includes: ["Responsive layouts", "SEO fundamentals", "Performance", "CMS-ready structure"],
  },
  {
    title: "Web Applications",
    summary: "Dashboards, SaaS products, portals, and custom web tools.",
    details:
      "Interfaces with real state: authentication flows, dashboards, data tables, forms and multi-step workflows.",
    includes: ["Dashboards", "Data tables & filters", "Forms & validation", "Component systems"],
  },
  {
    title: "Mobile Applications",
    summary: "Cross-platform mobile apps with clean, intuitive interfaces.",
    details:
      "iOS and Android apps built with React Native and Expo from a single TypeScript codebase.",
    includes: ["React Native & Expo", "Native-feeling navigation", "Dark mode", "Store-ready builds"],
  },
  {
    title: "Frontend Development",
    summary: "Responsive implementation from designs and existing products.",
    details:
      "Turning Figma designs into accurate, accessible, maintainable code — or improving the front end of an existing product.",
    includes: ["Figma to code", "Accessibility", "Design systems", "Refactoring"],
  },
  {
    title: "Ecommerce",
    summary: "Modern storefronts and product experiences.",
    details:
      "Storefronts designed around product discovery and a short path to checkout, with mobile shopping treated as the default.",
    includes: ["Product catalogues", "Product pages", "Cart flows", "Mobile-first UX"],
  },
];

export const workProcess = [
  { step: "01", title: "Discover", body: "We clarify goals, scope, audience and timeline. You get a clear proposal before any work starts." },
  { step: "02", title: "Design", body: "Structure and interface direction, reviewed with you early so changes are cheap." },
  { step: "03", title: "Build", body: "Clean, typed, responsive code with regular progress updates and preview links." },
  { step: "04", title: "Launch", body: "Testing across devices, deployment, and a handover so you can run it with confidence." },
];
