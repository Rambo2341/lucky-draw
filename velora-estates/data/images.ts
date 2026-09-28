/**
 * Every raster on the site. All are AI-generated with Higgsfield
 * (GPT Image 2.5) — see IMAGES.md for the exact prompts.
 *
 * They are served from Higgsfield's CDN. To self-host them, run
 * `npm run fetch-images`: it downloads each file into /public/images and
 * rewrites the `src` values below to local paths.
 */
export type SiteImage = { src: string; alt: { en: string; ar: string }; width: number; height: number };

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3JsS0m289mPfxRAJebie6eqrga6";
const wide = (file: string, en: string, ar: string): SiteImage => ({ src: `${CDN}/${file}`, alt: { en, ar }, width: 2048, height: 1360 });
const tall = (file: string, en: string, ar: string): SiteImage => ({ src: `${CDN}/${file}`, alt: { en, ar }, width: 1792, height: 2240 });

export const images = {
  riyadhVilla: wide("hf_20260928_145739_be754447-b703-4a6c-b55c-fef13fb9be5a.png", "Limestone villa with a shaded loggia and date palms", "فيلا حجرية بواجهة مظللة ونخيل"),
  jeddahSeaHouse: wide("hf_20260928_145741_1c29a00b-0177-4daa-9688-1d900fa8c84c.png", "White seafront villa with carved roshan screens and an infinity pool", "فيلا بيضاء على البحر برواشين خشبية ومسبح لا متناهي"),
  palmMansion: wide("hf_20260928_145949_81b53f69-1275-477e-ae67-5ad55c01553d.png", "Cantilevered white beachfront mansion with a pool", "قصر أبيض على الشاطئ بمسبح"),
  downtownPenthouse: wide("hf_20260928_145740_4ef3c4cf-0c80-4861-9de9-00a3eab9685b.png", "Penthouse terrace above the city at blue hour", "تراس بنتهاوس فوق المدينة وقت الغروب"),
  kuwaitCourtyard: wide("hf_20260928_145947_c0425eac-a839-47f3-a307-fadfe25dcce8.png", "Travertine courtyard house with a mashrabiya screen", "بيت بفناء وواجهة ترافرتين ومشربية"),
  thumamahEstate: wide("hf_20260928_145741_5ec8d060-e612-4b8a-9b6a-7afb4b9993d7.png", "Desert estate with a reflecting pool and palm grove at golden hour", "مزرعة صحراوية ببركة عاكسة وبستان نخيل"),
  hillsTownhouse: wide("hf_20260928_145739_fc7690c6-43cb-4c94-ac8e-46874ec8431a.png", "Row of contemporary townhouses with timber louvres", "صف منازل تاون هاوس حديثة بشرائح خشبية"),
  gulfRoadTower: wide("hf_20260928_145741_2a635c58-5296-4481-a74d-c5fbc8dfddc9.png", "Stone-clad residential tower on the seafront", "برج سكني بواجهة حجرية على البحر"),
  livingRoom: wide("hf_20260928_145740_1c715200-afce-4fe5-9bb4-117d0fae800c.png", "Double-height living room with limestone walls", "صالة بارتفاع مزدوج وجدران حجرية"),
  bedroom: wide("hf_20260928_145740_06427944-b4a8-45a8-81fe-a1cc96036cf1.png", "Bedroom with mashrabiya light patterns", "غرفة نوم بظلال المشربية"),
  kitchen: wide("hf_20260928_145740_17e77de2-1a27-4dd6-95c8-1a6a042d12c9.png", "Kitchen with a travertine island", "مطبخ بجزيرة من الترافرتين"),
  bathroom: wide("hf_20260928_145950_97f1643b-ad17-4771-9c66-04d8d8a0ef27.png", "Marble bathroom with a stone bathtub under a skylight", "حمّام رخامي بحوض حجري تحت نافذة سقفية"),
  majlis: wide("hf_20260928_145951_b4b15a3b-3715-47d5-a7be-bd3a07d076ec.png", "Contemporary majlis with low floor seating", "مجلس عصري بجلسات أرضية"),
  terrace: wide("hf_20260928_150132_e5ecc3ac-2b15-413b-b648-ba6aa674c8c5.png", "Rooftop terrace with a timber pergola at dusk", "سطح بمظلة خشبية وقت الغروب"),
  riyadh: tall("hf_20260928_150130_14e7eefe-924f-4f14-828f-ba48a2546b58.png", "Riyadh skyline at blue hour", "أفق الرياض وقت الغروب"),
  jeddah: tall("hf_20260928_150135_845999b4-b117-4414-98a0-92730ccfdc38.png", "Jeddah corniche at sunset", "كورنيش جدة وقت الغروب"),
  dubai: tall("hf_20260928_150131_b7c3dbff-60b0-49d3-9eb2-9ac94cad2031.png", "Dubai waterfront at dawn", "واجهة دبي البحرية فجرًا"),
  kuwait: tall("hf_20260928_150703_b06ebdd0-9ca0-41cd-8326-026606412696.png", "Kuwait City seafront at blue hour", "واجهة مدينة الكويت البحرية مساءً"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
