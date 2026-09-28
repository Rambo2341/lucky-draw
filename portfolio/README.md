# Portfolio — Web & Mobile Developer

A professional developer portfolio built with **Next.js (App Router)**, **React**,
**TypeScript**, **Tailwind CSS** and **Framer Motion**. It presents services,
four documented concept projects with full case studies, an about page and a
validated contact form — designed to convince a potential client within
30 seconds that you can build polished websites and apps.

Everything that changes often (projects, skills, services, name, links) is data,
not markup, so you can update the site without touching components.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, selected work, services, about + skills, call to action |
| `/work` | All projects |
| `/work/[slug]` | Case study for each project (statically generated) |
| `/services` | Services in detail + working process |
| `/about` | Short bio, principles, skills |
| `/contact` | Contact form with validation |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Folder structure

```
app/                  Routes, metadata, sitemap, robots, API route
  api/contact/        Contact form endpoint (email via Resend)
components/
  ui/                 Buttons, container, tags, reveal animation, section header
  layout/             Header, mobile menu, footer
  sections/           Page sections (hero, work grid, services, skills, CTA…)
  project/            Project cards, device frames, case-study blocks
    previews/         Coded interface previews for each project
  contact/            Contact form
data/                 site.ts, projects.ts, services.ts, skills.ts  ← edit these
lib/                  Validation, metadata helpers, utils
public/               Images, OpenGraph image
styles/globals.css    Design tokens (colours, fonts) and base styles
scripts/              Screenshot + image helper scripts
screenshots/          Portfolio screenshots (desktop + mobile)
```

---

## Requirements

- Node.js 20.9 or newer
- npm 10+

## Installation & local development

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

Other scripts:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript, no emit
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. Never commit real
values.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL, e.g. `https://yourname.dev`. Used for canonical URLs, sitemap and OpenGraph. |
| `RESEND_API_KEY` | For contact email | API key from [Resend](https://resend.com). |
| `CONTACT_TO_EMAIL` | For contact email | The inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | Optional | Sender, e.g. `Portfolio <hello@yourname.dev>`. Must be on a domain verified in Resend. |

---

## Editing your details

Open **`data/site.ts`**:

- `name` — shown in the logo, footer and page titles (**change this first**).
- `role`, `tagline`, `description` — used in the hero and SEO.
- `availability` — toggles the “Available for freelance projects” badge.
- `email`, `social.github`, `social.linkedin` — leave empty to hide. Only
  configured links are shown anywhere on the site.

## Adding or updating projects

All projects live in **`data/projects.ts`**. To add one, copy an existing object
and change the fields:

```ts
{
  slug: "my-new-project",          // URL: /work/my-new-project
  number: "05",
  name: "My New Project",
  category: "Booking Website",
  status: "Personal Project",      // or "Concept Project"
  year: 2026,
  platform: "web",                 // or "mobile"
  featured: true,                  // show on the home page
  shortDescription: "…",
  description: "…",
  technologies: ["Next.js", "TypeScript"],
  visual: "velora",                // coded preview to use until you add images
  thumbnail: { src: "/projects/my-new-project/cover.jpg", alt: "…", width: 1600, height: 1100, kind: "desktop" },
  images: [
    { src: "/projects/my-new-project/home.png", alt: "Home page", width: 1440, height: 900, kind: "desktop" },
    { src: "/projects/my-new-project/mobile.png", alt: "Mobile home", width: 390, height: 844, kind: "mobile" },
  ],
  liveUrl: "https://…",            // empty → button hidden
  githubUrl: "https://github.com/…",
  appDemoUrl: "",
  caseStudy: { overview, goal, designDirection, developmentApproach, features, responsive, challenges, result },
}
```

The home grid, `/work`, the case study page, the sitemap and structured data all
update automatically. Buttons for **Live Demo**, **App Demo** and **Source Code**
appear only when the URL is filled in — there are never dead links.

## Replacing images

- **Project screenshots:** put files in `public/projects/<slug>/` and reference
  them in `thumbnail` and `images`. Real images automatically replace the coded
  previews on cards and case studies. Recommended: desktop 1440×900 (or larger,
  same ratio), mobile 390×844, PNG or high-quality JPG. Next.js optimises and
  serves AVIF/WebP automatically.
- **Coded previews:** the default project visuals are real React components in
  `components/project/previews/`. They scale with their container, so no
  screenshots are needed to get started.
- **Hero image:** replace `public/images/hero-studio.jpg` (≥ 2400px wide, dark,
  subject on the right). See `HIGGSFIELD_ASSETS.md`.
- **Share image:** replace `public/og.jpg` (1200×630). You can regenerate it from
  the hero with `node scripts/optimize-images.mjs`.
- **Favicon:** edit `app/icon.svg`.

## Skills and services

- Skills: `data/skills.ts` — only list what you genuinely use.
- Services and process steps: `data/services.ts`.

---

## Connecting the contact form to email

The form is fully validated on the client **and** on the server
(`lib/contact.ts` is shared by both). The endpoint is `app/api/contact/route.ts`
and uses the Resend HTTP API with plain `fetch` (no extra dependency).

1. Create a free account at https://resend.com.
2. Add and verify your domain (Resend → Domains). For quick testing you can skip
   this and use the default sender `onboarding@resend.dev`, which can only send to
   your own Resend account email.
3. Create an API key (Resend → API Keys).
4. Set the variables locally in `.env.local` and on Vercel
   (Project → Settings → Environment Variables):
   ```
   RESEND_API_KEY=re_…
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL=Portfolio <hello@yourdomain.com>
   ```
5. Redeploy. Submissions arrive in your inbox with the visitor’s address as
   `reply-to`, so you can answer directly.

Until it is configured the API responds with `503 not_configured`. In
development the form shows a hint explaining this; in production it shows a
friendly error, plus a direct email link if `site.email` is set.

Want a different provider (Postmark, SendGrid, Formspree…)? Replace only the
`fetch` call inside `app/api/contact/route.ts` — validation and the UI stay the
same. A hidden honeypot field filters simple spam bots.

---

## Deploying to Vercel

1. Push the `portfolio` folder to a GitHub repository (it can be the repo root or
   a subfolder).
2. In Vercel, **Add New → Project** and import the repository.
3. If the site is in a subfolder, set **Root Directory** to `portfolio`.
4. Framework preset: **Next.js** (auto-detected). Build command `npm run build`.
5. Add the environment variables above (at least `NEXT_PUBLIC_SITE_URL`).
6. Deploy. Add your custom domain under Settings → Domains and update
   `NEXT_PUBLIC_SITE_URL` to match.

---

## Screenshots

`screenshots/` contains desktop and mobile captures for Upwork and social posts.
To regenerate them after changes:

```bash
npm run build && npm run start      # in one terminal
node scripts/screenshots.mjs        # in another (requires Playwright)
```

## Higgsfield-generated assets

Only the hero image was generated with Higgsfield; project visuals are real coded
interfaces rather than generated mockups. Details, prompt summary and how to
replace it are in [`HIGGSFIELD_ASSETS.md`](./HIGGSFIELD_ASSETS.md).

## Upwork copy

Profile headline, overviews, project descriptions and proposal links are in
[`UPWORK_PROFILE_ASSETS.md`](./UPWORK_PROFILE_ASSETS.md).

## Accessibility & performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus states.
- Mobile menu traps focus, closes on Escape and route change.
- Form fields have labels, error messages linked with `aria-describedby`.
- All animation respects `prefers-reduced-motion`.
- Above-the-fold entrance animation is CSS-only, so text never waits on JavaScript.
- Fonts are self-hosted via `next/font`; images use `next/image` with AVIF/WebP.
