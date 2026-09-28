# Zenox — Web & Mobile Developer portfolio

One Next.js project that contains three things:

1. **The portfolio** in English (default) and Arabic — `/en`, `/ar`.
2. **Live project demos** hosted inside it — VELORA ESTATES at `/demos/velora/en`
   and `/demos/velora/ar`. Clicking the project in the portfolio opens it directly.
3. **A private admin panel** at `/admin` that only works on a separate domain you
   choose, behind a password. Every request sent from the contact form appears there.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**
and **Framer Motion**. Everything that changes often (projects, services, skills, your
name and links, all text) is data, not markup.

---

## Routes

| Route | What it is |
| --- | --- |
| `/` | Redirects to `/en` |
| `/en`, `/ar` | Home |
| `/{en,ar}/work` | All projects |
| `/{en,ar}/work/[slug]` | Case study |
| `/{en,ar}/services`, `/about`, `/contact` | Services, About, Contact (phone and email required) |
| `/demos/velora/{en,ar}/…` | VELORA ESTATES — the full working real-estate site |
| `/admin` | Private admin panel (only on `ADMIN_HOST`) |
| `/api/contact` | Saves contact requests (and optionally emails them) |
| `/sitemap.xml`, `/robots.txt` | SEO (admin and API are disallowed) |

## Folder structure

```
app/
  (site)/[locale]/      Portfolio pages (en / ar), each with its own <html lang dir>
  (velora)/demos/velora/[locale]/   Velora demo pages
  (admin)/admin/        Admin panel (login, list, request detail, server actions)
  api/contact/          Contact endpoint
proxy.ts                Locks /admin to ADMIN_HOST and requires a session
components/             Portfolio components (ui, layout, sections, project, contact)
data/                   site.ts, projects.ts, services.ts, skills.ts   ← edit these
lib/
  i18n.ts               All interface text in English and Arabic
  contact.ts            Contact validation (shared by the form and the API)
  submissions.ts        Where requests are stored (Upstash Redis / local file)
  admin-auth.ts         Password check and signed session cookie
demos/velora/           Velora's components, data, styles and design docs
styles/globals.css      Portfolio design tokens
scripts/                Screenshots and image helpers
```

---

## Run it

Requires Node.js 20.9+.

```bash
cd portfolio
npm install
npm run dev          # http://localhost:3000 → /en
npm run build && npm run start
npm run lint
npm run typecheck
```

In development `/admin` works on `localhost` so you can try it (set `ADMIN_PASSWORD`
in `.env.local` first); requests are saved to `.data/submissions.json`.

---

## Languages

- English is the default; every page has an Arabic version with full right-to-left
  layout and IBM Plex Sans Arabic.
- The **العربية / English** link in the header keeps you on the same page.
- Interface text: `lib/i18n.ts`. Content: the `{ en, ar }` pairs in `data/*.ts`.

## Adding a project

Add an object to `data/projects.ts` (every text field is `{ en, ar }`).

- **Hosted inside this site?** Put its pages under `app/(…)/demos/<name>/` like Velora
  and set `livePath: "/demos/<name>"`. The card then opens the live site directly, in
  the visitor's language.
- **Deployed elsewhere?** Set `liveUrl: "https://…"` instead.
- No live version yet? Leave both empty — the card opens the case study.

---

## Deploying to Vercel (step by step)

### 1. Import the project
1. vercel.com → **Add New → Project** → choose this GitHub repository.
2. **Root Directory:** `portfolio`. Framework: Next.js (detected). Deploy.

### 2. Store the requests (required)
1. In the Vercel project: **Storage → Create / Connect → Upstash for Redis** (free plan).
2. Connect it to the project. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   automatically.

Without this, the contact form cannot save requests in production.

### 3. Create the private admin domain
1. Project → **Settings → Domains → Add** → type a second domain, for example
   `zenox-admin.vercel.app` (any free `*.vercel.app` name), or `admin.yourdomain.com`
   if you own a domain.
2. Project → **Settings → Environment Variables**, add:
   - `ADMIN_HOST` = `zenox-admin.vercel.app` (exactly the domain from step 1)
   - `ADMIN_PASSWORD` = a long, random password
3. **Redeploy** (Deployments → ⋯ → Redeploy).

Now:
- `https://zenox-admin.vercel.app` opens the admin login — nothing else is served there.
- `/admin` on your public portfolio domain returns **404**, so nobody can find it.
- Without `ADMIN_HOST` the admin panel is switched off in production.

### 4. Optional
- `NEXT_PUBLIC_SITE_URL` — your final public URL (canonical links, sitemap).
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — also receive each
  request by email (Resend, https://resend.com).

All variables are listed in `.env.example`. Never commit real values.

---

## The admin panel

- **List:** every request, newest first, with counts for New / In progress / Done,
  status tabs and search by name, phone, email or message.
- **Request page:** full details, the message, and one-tap **Call**, **WhatsApp** and
  **Email** buttons; change status; delete (asks for confirmation).
- **Security:** host lock (proxy.ts) + password; the session is a signed, httpOnly,
  SameSite=strict cookie that expires after 7 days; failed logins are slowed down;
  pages are `noindex` and never cached.

## The contact form

Name, email, **phone** (with country code), project type, budget and message are all
required, validated in the browser and again on the server (`lib/contact.ts`).
A hidden honeypot field filters simple spam bots.

---

## Images

- Portfolio hero: `public/images/hero-studio.jpg` (optional — without it the hero shows
  the coded project interfaces). See `HIGGSFIELD_ASSETS.md`.
- Velora photos: AI-generated with Higgsfield, loaded from its CDN. To self-host them,
  run `node scripts/fetch-velora-images.mjs` from the `portfolio` folder (it rewrites
  `demos/velora/data/images.ts`). Details: `demos/velora/IMAGES.md`.

## Screenshots

```bash
npm run build && npm run start      # terminal 1
npm run screenshots                 # terminal 2
```

## More docs

- `HIGGSFIELD_ASSETS.md` — generated assets and prompts
- `UPWORK_PROFILE_ASSETS.md` — profile headline, overviews, project copy
- `demos/velora/README.md`, `PRODUCT.md`, `DESIGN.md` — the Velora project
