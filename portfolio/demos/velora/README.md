# VELORA ESTATES

A fully working, bilingual (Arabic / English) luxury real-estate website for the Gulf market — a
**Personal Concept Project by Zenox**. Every page and control works: search, filters, favourites,
property details, agents, locations and a validated viewing request. All listings, prices and agents
are fictional; all images are AI-generated (see [IMAGES.md](./IMAGES.md)).

Lives inside the Zenox portfolio at `/demos/velora/en` and `/demos/velora/ar`.

## What a visitor can do

| Page | Route | Works |
| --- | --- | --- |
| Home | `/demos/velora/en`, `/demos/velora/ar` | Concierge request slip (type, city, purpose, budget) that opens filtered results; featured cards; cities; agents |
| Residences | `/demos/velora/[locale]/properties` | Filters (city, type, buy/rent, budget, bedrooms), sort, live count, empty state; state kept in the URL |
| Property | `/demos/velora/[locale]/properties/[slug]` | Gallery with keyboard arrows, spec sheet, features, location, agent card, **Schedule Viewing** form with validation that issues a numbered appointment card |
| Set aside | `/demos/velora/[locale]/favorites` | Saved cards and viewing requests, stored in the browser (localStorage) |
| Locations | `/demos/velora/[locale]/locations` | Riyadh, Jeddah, Dubai, Kuwait City, each linking to filtered results |
| Agents | `/demos/velora/[locale]/agents` | Calling cards with languages, demo contact details and listings |
| About | `/demos/velora/[locale]/about` | The concept and an honest note about the demo |
| Contact | `/demos/velora/[locale]/contact` | Validated form (demo: nothing is sent) and city desks |

The language switch keeps you on the same page; Arabic renders right-to-left with Amiri and Readex Pro.

## Stack

Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react.
No backend and no accounts. Motion is CSS-only and respects `prefers-reduced-motion`.

## Run it

Velora is part of the portfolio project, so it runs with it:

```bash
cd portfolio
npm install
npm run dev        # http://localhost:3000/demos/velora/en
```

It deploys with the portfolio (one Vercel project). Its code lives in
`portfolio/app/(velora)/demos/velora/` (routes) and `portfolio/demos/velora/`
(components, data, styles).

## Editing content

- Listings: `data/properties.ts` (bilingual fields; add an object and every page updates).
- Agents and cities: `data/people-places.ts`.
- Interface text: `lib/i18n.ts` (English and Arabic dictionaries side by side).
- Images: `data/images.ts`. Run `node scripts/fetch-velora-images.mjs` (from `portfolio/`) to self-host them in `public/images/velora/`.

## Design

The visual direction is a private agency's **concierge stationery**: white card stock, black letterpress
ink, sand-coloured fields and an embossed V monogram. Listings are issued as keycards (1.586:1) with a
serial number and a perforated stub; favourites are cards "set aside" in a holder; a viewing request
issues a numbered appointment card. Product context lives in `PRODUCT.md`.
