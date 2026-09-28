/**
 * Portfolio projects.
 *
 * To add a project, append an object to `projects` below. Everything else —
 * the home page grid, /work, the case-study route, the sitemap and the
 * structured data — is generated from this list.
 *
 * Visuals: `visual` selects a coded interface preview registered in
 * components/project/project-visuals.tsx. If you have real screenshots, put
 * them in /public/projects/<slug>/ and fill `thumbnail` / `images`; images
 * take priority over the coded preview.
 *
 * Links: leave `liveUrl`, `githubUrl` or `appDemoUrl` empty and the matching
 * button is hidden. Never put "#" here.
 */

export type ProjectStatus = "Personal Project" | "Concept Project";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "desktop" images are shown in a browser frame, "mobile" in a phone frame. */
  kind: "desktop" | "mobile";
};

export type ProjectFeature = { title: string; body: string };
export type ProjectChallenge = { challenge: string; solution: string };

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  status: ProjectStatus;
  year: number;
  platform: "web" | "mobile";
  featured: boolean;
  shortDescription: string;
  description: string;
  technologies: string[];
  /** Key of a coded preview in project-visuals.tsx. */
  visual: "velora" | "nova" | "flowfin" | "orbit";
  thumbnail?: ProjectImage;
  images?: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  appDemoUrl?: string;
  caseStudy: {
    overview: string;
    goal: string;
    designDirection: string;
    developmentApproach: string;
    features: ProjectFeature[];
    responsive: string;
    challenges: ProjectChallenge[];
    result: string;
  };
};

export const projects: Project[] = [
  {
    slug: "velora-estates",
    number: "01",
    name: "Velora Estates",
    category: "Luxury Real Estate Website",
    status: "Concept Project",
    year: 2026,
    platform: "web",
    featured: true,
    shortDescription:
      "A premium real-estate experience built around elegant property discovery and calm, responsive UX.",
    description:
      "A premium real-estate web experience focused on elegant property discovery, sophisticated presentation, and responsive UX.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    visual: "velora",
    liveUrl: "",
    githubUrl: "",
    caseStudy: {
      overview:
        "Velora Estates is a concept website for a high-end property agency. It explores how a listing site can feel closer to an editorial magazine than a database, without losing the search and filtering that buyers depend on.",
      goal:
        "The goal of this personal project was to design and structure a real-estate experience where browsing feels unhurried and premium, while search, filters, favourites and viewing requests stay fast and obvious.",
      designDirection:
        "A restrained palette of warm stone and deep charcoal, large photography, generous whitespace and a serif display face for property names. Interface chrome is kept quiet so the homes carry the page.",
      developmentApproach:
        "The interface is planned as a Next.js App Router project in TypeScript. Listings are typed data objects, so filters, sorting and favourites are pure functions over one source of truth. Search state lives in the URL, which keeps results shareable and the back button honest.",
      features: [
        { title: "Property listings", body: "Card grid with price, location, size and key facts scannable at a glance." },
        { title: "Search & filtering", body: "Location search combined with price, bedrooms and property type filters, reflected in the URL." },
        { title: "Favourites", body: "Save properties to a shortlist that persists between visits." },
        { title: "Property details", body: "Gallery, specifications, floor area and neighbourhood notes in one clear layout." },
        { title: "Schedule a viewing", body: "A short, validated request form with preferred date and time." },
        { title: "Responsive layouts", body: "Designed separately for desktop browsing and one-handed mobile use." },
      ],
      responsive:
        "On desktop, filters sit in a persistent bar above a three-column grid. On tablet the grid drops to two columns. On mobile, filters collapse into a bottom sheet, cards go full-width and the primary action — ‘Schedule viewing’ — stays within thumb reach.",
      challenges: [
        {
          challenge: "Premium visuals tend to make listing pages heavy and slow.",
          solution: "Responsive image sizes, lazy loading below the fold and fixed aspect ratios so the layout never shifts while photos load.",
        },
        {
          challenge: "Many filters can overwhelm a minimal design.",
          solution: "Only the three most-used filters are visible; the rest live behind a single ‘More filters’ control with a live result count.",
        },
      ],
      result:
        "A calm, editorial property experience that keeps the practical tools buyers need one tap away. The previews on this page are rendered live in code rather than as static mockups.",
    },
  },
  {
    slug: "nova-commerce",
    number: "02",
    name: "Nova Commerce",
    category: "Premium Ecommerce Website",
    status: "Concept Project",
    year: 2026,
    platform: "web",
    featured: true,
    shortDescription:
      "A modern storefront designed around product discovery, fast navigation and clean mobile shopping.",
    description:
      "A modern ecommerce experience designed around product discovery, conversion, fast navigation, and clean mobile shopping.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    visual: "nova",
    liveUrl: "",
    githubUrl: "",
    caseStudy: {
      overview:
        "Nova Commerce is a concept storefront for a contemporary lifestyle brand. It focuses on the parts of ecommerce that decide whether a visitor buys: finding the right product quickly, understanding it, and checking out without friction.",
      goal:
        "The goal of this personal project was to build a storefront structure that stays fast and clear across a large catalogue, with a mobile experience that feels designed rather than squeezed.",
      designDirection:
        "Neutral backgrounds that let product photography lead, a strict type scale, and a single accent colour reserved for purchase actions so the path to checkout is always visually obvious.",
      developmentApproach:
        "Structured as a Next.js App Router project with typed product and collection models. Catalogue pages are statically generated, the cart is client state with optimistic updates, and filters are URL-driven so any result set can be linked.",
      features: [
        { title: "Product catalogue", body: "Responsive product grid with quick price and variant information." },
        { title: "Collections", body: "Curated collection pages with editorial headers." },
        { title: "Search & filters", body: "Instant search with category, price and size filters." },
        { title: "Product page", body: "Gallery, variant selection, sizing and delivery information above the fold." },
        { title: "Cart", body: "Slide-over cart with quantity controls and a running total." },
        { title: "Mobile navigation", body: "Bottom-anchored actions and a full-screen category menu." },
      ],
      responsive:
        "Desktop uses a four-column grid with a sticky filter rail. Tablet shifts to three columns with filters in a drawer. Mobile uses two columns, a sticky ‘Add to bag’ bar on product pages and a slide-up cart that never hides the total.",
      challenges: [
        {
          challenge: "Filter-heavy pages easily become slow and hard to share.",
          solution: "Filters are encoded in the URL and resolved on the server, so pages load pre-filtered and remain linkable.",
        },
        {
          challenge: "Mobile product pages often bury the purchase action.",
          solution: "A compact sticky purchase bar keeps price, variant and ‘Add to bag’ visible while scrolling.",
        },
      ],
      result:
        "A storefront structure that prioritises clarity and speed, with a mobile shopping flow designed from the start rather than adapted at the end.",
    },
  },
  {
    slug: "flowfin",
    number: "03",
    name: "Flowfin",
    category: "Mobile Finance Application",
    status: "Concept Project",
    year: 2026,
    platform: "mobile",
    featured: true,
    shortDescription:
      "A personal finance app for tracking spending and understanding daily money habits at a glance.",
    description:
      "A modern personal finance mobile application focused on tracking spending, understanding financial activity, and simple daily money management.",
    technologies: ["React Native", "Expo", "TypeScript"],
    visual: "flowfin",
    liveUrl: "",
    githubUrl: "",
    appDemoUrl: "",
    caseStudy: {
      overview:
        "Flowfin is a concept mobile app that helps people understand where their money goes. Instead of dense spreadsheets, it surfaces a few clear numbers and lets the details unfold when needed.",
      goal:
        "The goal of this personal project was to design a finance app that someone could open for five seconds a day and come away knowing whether they are on track.",
      designDirection:
        "Dark-first interface with a single accent for positive balance, large numerals and soft category colours. Every screen answers one question before offering more detail.",
      developmentApproach:
        "Planned as a cross-platform React Native app with Expo and TypeScript. Screens share a small design-token layer, charts are drawn from typed transaction data, and dark mode is driven by system settings.",
      features: [
        { title: "Dashboard", body: "Current balance, monthly spend and budget progress on one screen." },
        { title: "Expenses", body: "Quick add flow with amount, category and note in three taps." },
        { title: "Categories", body: "Spending grouped by category with colour-coded progress." },
        { title: "Charts", body: "Weekly and monthly spending trends that are readable at phone size." },
        { title: "Transactions", body: "Searchable history grouped by day." },
        { title: "Dark mode", body: "Designed dark-first, with a matching light theme." },
      ],
      responsive:
        "Layouts are built for phone widths from 360px upward, with safe-area handling for notches and home indicators, and touch targets of at least 44px throughout.",
      challenges: [
        {
          challenge: "Finance data is dense and can feel stressful.",
          solution: "Progressive disclosure: one headline number per screen, with breakdowns one tap away.",
        },
        {
          challenge: "Charts are hard to read on small screens.",
          solution: "Simplified bar charts with direct labels instead of legends, and a highlighted current period.",
        },
      ],
      result:
        "A focused mobile experience that makes daily money checks quick and calm. The screens on this page are rendered live in code.",
    },
  },
  {
    slug: "orbit",
    number: "04",
    name: "Orbit",
    category: "SaaS Dashboard",
    status: "Concept Project",
    year: 2026,
    platform: "web",
    featured: true,
    shortDescription:
      "A productivity SaaS dashboard exploring complex UI architecture, analytics, tables and filtering.",
    description:
      "A clean productivity SaaS dashboard demonstrating complex UI architecture, analytics, navigation, tables, filtering, and responsive application design.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    visual: "orbit",
    liveUrl: "",
    githubUrl: "",
    caseStudy: {
      overview:
        "Orbit is a concept dashboard for a team productivity tool. It is an exercise in the kind of interface most SaaS products need: navigation, analytics, data tables and filters that remain usable as data grows.",
      goal:
        "The goal of this personal project was to design a dashboard architecture that stays readable with real-world data volumes and adapts properly to tablet and mobile.",
      designDirection:
        "Quiet neutral surfaces, a compact but legible type scale, and colour used only for status and data. Density is adjustable without breaking alignment.",
      developmentApproach:
        "Structured as a Next.js App Router application with a shared layout shell, typed data models and composable table, filter and chart components that can be reused across views.",
      features: [
        { title: "Analytics overview", body: "Key metrics with period comparison and a trend chart." },
        { title: "Navigation", body: "Collapsible sidebar with sections, search and keyboard access." },
        { title: "Data tables", body: "Sortable columns, status badges and row selection." },
        { title: "Filtering", body: "Combined filters for status, owner and date, shown as removable chips." },
        { title: "Responsive shell", body: "Sidebar becomes a drawer on tablet and a bottom bar on mobile." },
      ],
      responsive:
        "At 1280px and up the sidebar is always visible. At tablet widths it collapses to icons, and on mobile tables transform into stacked cards so no data requires horizontal scrolling.",
      challenges: [
        {
          challenge: "Wide data tables break on small screens.",
          solution: "Tables switch to a card layout below 768px, keeping the most important columns and moving the rest into a detail view.",
        },
        {
          challenge: "Dashboards drift into visual noise as features grow.",
          solution: "A small component system with strict spacing and colour rules keeps new views consistent.",
        },
      ],
      result:
        "A dashboard foundation that demonstrates structured, scalable front-end architecture and careful responsive design.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
