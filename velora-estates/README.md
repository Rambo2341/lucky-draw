# VELORA ESTATES

A fully working, bilingual (Arabic / English) luxury real-estate website for the Gulf market — a
**Personal Concept Project by Zenox**. Every page and control works: search, filters, favourites,
property details, agents, locations and a validated viewing request. All listings, prices and agents
are fictional; all images are AI-generated (see [IMAGES.md](./IMAGES.md)).

Target deployment: `velora-estates.vercel.app`.

## What a visitor can do

| Page | Route | Works |
| --- | --- | --- |
| Home | `/en`, `/ar` | Concierge request slip (type, city, purpose, budget) that opens filtered results; featured cards; cities; agents |
| Residences | `/[locale]/properties` | Filters (city, type, buy/rent, budget, bedrooms), sort, live count, empty state; state kept in the URL |
| Property | `/[locale]/properties/[slug]` | Gallery with keyboard arrows, spec sheet, features, location, agent card, **Schedule Viewing** form with validation that issues a numbered appointment card |
| Set aside | `/[locale]/favorites` | Saved cards and viewing requests, stored in the browser (localStorage) |
| Locations | `/[locale]/locations` | Riyadh, Jeddah, Dubai, Kuwait City, each linking to filtered results |
| Agents | `/[locale]/agents` | Calling cards with languages, demo contact details and listings |
| About | `/[locale]/about` | The concept and an honest note about the demo |
| Contact | `/[locale]/contact` | Validated form (demo: nothing is sent) and city desks |

The language switch keeps you on the same page; Arabic renders right-to-left with Amiri and Readex Pro.

## Stack

Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react.
No backend and no accounts. Motion is CSS-only and respects `prefers-reduced-motion`.

## Run it

```bash
cd velora-estates
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run build      # production build
npm run lint
npm run typecheck
```

## Deploy on Vercel

1. Import the repository in Vercel and set **Root Directory** to `velora-estates`.
2. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL` — canonical URL (defaults to the Vercel production domain).
   - `NEXT_PUBLIC_PORTFOLIO_URL` — the Zenox portfolio; shows "View the portfolio" links in the demo banner and footer.
3. Deploy. Then add the live URL as `liveUrl` for Velora in `portfolio/data/projects.ts`.

## Editing content

- Listings: `data/properties.ts` (bilingual fields; add an object and every page updates).
- Agents and cities: `data/people-places.ts`.
- Interface text: `lib/i18n.ts` (English and Arabic dictionaries side by side).
- Images: `data/images.ts`. Run `npm run fetch-images` to self-host the Higgsfield images in `public/images/`.

## Design

The visual direction is a private agency's **concierge stationery**: white card stock, black letterpress
ink, sand-coloured fields and an embossed V monogram. Listings are issued as keycards (1.586:1) with a
serial number and a perforated stub; favourites are cards "set aside" in a holder; a viewing request
issues a numbered appointment card. Product context lives in `PRODUCT.md`.
