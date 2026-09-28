# Images — provenance

Every raster on VELORA ESTATES is AI-generated with **Higgsfield** (model: GPT Image 2.5, medium quality, 2K).
None of them shows a real, for-sale property. The site states this on every property page.

Style suffix used on every prompt: *editorial architectural photography, medium format, warm sand and limestone
tones, no people, no text, no logos, no watermark, photorealistic, restrained luxury.*

| Key (`data/images.ts`) | Aspect | Used for | Prompt (subject) |
| --- | --- | --- | --- |
| `riyadhVilla` | 3:2 | Najd Courtyard Villa | Limestone villa in Riyadh, shaded loggia, stone fins, Najdi earth-plaster walls, date palms, morning light |
| `jeddahSeaHouse` | 3:2 | Obhur Sea House | Red Sea villa north of Jeddah, white render, teak roshan screens, infinity pool, evening light |
| `palmMansion` | 3:2 | Frond House | Palm-frond beachfront mansion in Dubai, cantilevered white volumes, travertine terrace, pool |
| `downtownPenthouse` | 3:2 | Downtown Sky Penthouse | Penthouse terrace above Downtown Dubai at blue hour, linen sofas, glass balustrade |
| `kuwaitCourtyard` | 3:2 | Mashrabiya House | Kuwait City courtyard house, travertine, geometric mashrabiya, olive tree, bronze door |
| `thumamahEstate` | 3:2 | Al Thumamah Estate | Desert estate near Riyadh, rammed-earth walls, reflecting pool, palm grove, dunes |
| `hillsTownhouse` | 3:2 | Hills Garden Townhouse | Row of Dubai townhouses, stucco, timber louvres, gardens, morning light |
| `gulfRoadTower` | 3:2 | Gulf Road Residence | Stone-clad residential tower on the Kuwait City seafront |
| `livingRoom` | 3:2 | Galleries | Double-height living room, limestone walls, linen sofas |
| `bedroom` | 3:2 | Galleries | Bedroom with mashrabiya light patterns, linen, walnut |
| `kitchen` | 3:2 | Galleries | Kitchen with a travertine island, black fixtures, oak |
| `bathroom` | 3:2 | Galleries | Marble bathroom, stone bathtub under a skylight |
| `majlis` | 3:2 | Galleries, About | Contemporary majlis, low floor seating, brass dallah |
| `terrace` | 3:2 | Galleries | Rooftop terrace with timber pergola at dusk |
| `riyadh` | 4:5 | Locations, Home | Riyadh skyline at blue hour |
| `jeddah` | 4:5 | Locations, Home | Jeddah corniche at sunset |
| `dubai` | 4:5 | Locations, Home | Dubai waterfront at dawn |
| `kuwait` | 4:5 | Locations, Home | Kuwait City seafront with the Kuwait Towers at blue hour |

Agents have **no portraits** on purpose: they appear as monogram calling cards, so no fictional faces are presented as real people.

## Hosting

The images load from Higgsfield's CDN (`d8j0ntlcm91z4.cloudfront.net`). To self-host, run `node scripts/fetch-velora-images.mjs`
from the `portfolio` folder on a machine that can reach that host; it downloads the files into `public/images/velora/` and rewrites `demos/velora/data/images.ts`.
