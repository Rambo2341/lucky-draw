/**
 * Synthetic demonstration listings. None of these properties, prices or
 * serials are real. Add a listing by appending an object; every page,
 * filter, the sitemap and the city counts update automatically.
 */
import type { L } from "@/lib/i18n";
import type { ImageKey } from "./images";

export type CityId = "riyadh" | "jeddah" | "dubai" | "kuwait";
export type PropertyType = "villa" | "penthouse" | "apartment" | "townhouse" | "estate";
export type Purpose = "sale" | "rent";
export type Currency = "SAR" | "AED" | "KWD";

export type Property = {
  slug: string;
  serial: string;
  name: L;
  district: L;
  city: CityId;
  type: PropertyType;
  purpose: Purpose;
  /** Sale price, or yearly rent when purpose is "rent". */
  price: number;
  currency: Currency;
  plot: number | null;
  built: number;
  beds: number;
  baths: number;
  parking: number;
  /** null = ready now. */
  handover: L | null;
  listed: string;
  cover: ImageKey;
  gallery: ImageKey[];
  summary: L;
  description: L;
  features: L[];
  agent: string;
};

export const propertyTypes: Record<PropertyType, L> = {
  villa: { en: "Villa", ar: "فيلا" },
  penthouse: { en: "Penthouse", ar: "بنتهاوس" },
  apartment: { en: "Apartment", ar: "شقة" },
  townhouse: { en: "Townhouse", ar: "تاون هاوس" },
  estate: { en: "Estate", ar: "مزرعة خاصة" },
};

export const purposes: Record<Purpose, L> = {
  sale: { en: "Buy", ar: "شراء" },
  rent: { en: "Rent", ar: "إيجار" },
};

/** Fixed peg / reference rates used only to compare budgets across currencies. */
export const usdPerUnit: Record<Currency, number> = { SAR: 0.2667, AED: 0.2723, KWD: 3.26 };
export const toUsd = (p: Pick<Property, "price" | "currency">) => p.price * usdPerUnit[p.currency];

export const properties: Property[] = [
  {
    slug: "najd-courtyard-villa",
    serial: "VE-RYD-0142",
    name: { en: "Najd Courtyard Villa", ar: "فيلا فناء نجد" },
    district: { en: "Al Malqa, Riyadh", ar: "الملقا، الرياض" },
    city: "riyadh",
    type: "villa",
    purpose: "sale",
    price: 14_500_000,
    currency: "SAR",
    plot: 1250,
    built: 980,
    beds: 6,
    baths: 7,
    parking: 4,
    handover: null,
    listed: "2026-09-21",
    cover: "riyadhVilla",
    gallery: ["riyadhVilla", "livingRoom", "majlis", "bedroom", "kitchen"],
    summary: { en: "Limestone villa built around a shaded Najdi courtyard.", ar: "فيلا حجرية حول فناء نجدي مظلل." },
    description: {
      en: "A family villa in north Riyadh arranged around a planted courtyard that stays shaded through the afternoon. Separate men's and family majlis, a double-height living room and a ground-floor guest suite.",
      ar: "فيلا عائلية في شمال الرياض حول فناء مزروع يبقى مظللًا طوال الظهيرة. مجلس رجال ومجلس عائلي منفصلان، وصالة بارتفاع مزدوج، وجناح ضيوف في الدور الأرضي.",
    },
    features: [
      { en: "Two majlis with separate entrances", ar: "مجلسان بمدخلين منفصلين" },
      { en: "Planted inner courtyard", ar: "فناء داخلي مزروع" },
      { en: "Driver's and maid's quarters", ar: "ملحق للسائق والعاملة" },
      { en: "Private elevator", ar: "مصعد خاص" },
      { en: "Rooftop terrace", ar: "سطح مجهز" },
    ],
    agent: "faisal",
  },
  {
    slug: "obhur-sea-house",
    serial: "VE-JED-0317",
    name: { en: "Obhur Sea House", ar: "بيت أبحر البحري" },
    district: { en: "North Obhur, Jeddah", ar: "أبحر الشمالية، جدة" },
    city: "jeddah",
    type: "villa",
    purpose: "sale",
    price: 18_900_000,
    currency: "SAR",
    plot: 1600,
    built: 1150,
    beds: 5,
    baths: 6,
    parking: 3,
    handover: null,
    listed: "2026-09-18",
    cover: "jeddahSeaHouse",
    gallery: ["jeddahSeaHouse", "livingRoom", "bedroom", "bathroom", "terrace"],
    summary: { en: "White seafront villa with roshan screens and a private jetty.", ar: "فيلا بيضاء على البحر برواشين ورصيف خاص." },
    description: {
      en: "Directly on the Obhur creek, with an infinity pool that meets the Red Sea. Carved teak roshan screens filter the western sun across every sea-facing room.",
      ar: "على خور أبحر مباشرة، بمسبح لا متناهٍ يلتقي بالبحر الأحمر. رواشين من خشب الساج تُليّن شمس الغروب في كل غرفة مطلة على البحر.",
    },
    features: [
      { en: "Private jetty", ar: "رصيف بحري خاص" },
      { en: "Infinity pool", ar: "مسبح لا متناهٍ" },
      { en: "Teak roshan screens", ar: "رواشين من الساج" },
      { en: "Beach cabana", ar: "كابانا شاطئية" },
    ],
    agent: "lama",
  },
  {
    slug: "frond-house",
    serial: "VE-DXB-0058",
    name: { en: "Frond House", ar: "منزل السعفة" },
    district: { en: "Palm Jumeirah, Dubai", ar: "نخلة جميرا، دبي" },
    city: "dubai",
    type: "villa",
    purpose: "sale",
    price: 42_000_000,
    currency: "AED",
    plot: 1450,
    built: 1020,
    beds: 6,
    baths: 8,
    parking: 4,
    handover: null,
    listed: "2026-09-25",
    cover: "palmMansion",
    gallery: ["palmMansion", "livingRoom", "kitchen", "bathroom", "terrace"],
    summary: { en: "Cantilevered beachfront mansion on a Palm frond.", ar: "قصر بكتل معلقة على شاطئ النخلة." },
    description: {
      en: "Three white volumes cantilever over a travertine terrace and a 25-metre pool, with 30 metres of private beach on the frond's quiet side.",
      ar: "ثلاث كتل بيضاء معلقة فوق تراس من الترافرتين ومسبح بطول 25 مترًا، مع 30 مترًا من الشاطئ الخاص في الجهة الهادئة من السعفة.",
    },
    features: [
      { en: "30 m private beach", ar: "شاطئ خاص بطول 30 م" },
      { en: "25 m pool", ar: "مسبح بطول 25 م" },
      { en: "Cinema room", ar: "غرفة سينما" },
      { en: "Staff wing", ar: "جناح للعاملين" },
      { en: "Smart-home system", ar: "نظام منزل ذكي" },
    ],
    agent: "omar",
  },
  {
    slug: "downtown-sky-penthouse",
    serial: "VE-DXB-0211",
    name: { en: "Downtown Sky Penthouse", ar: "بنتهاوس وسط المدينة" },
    district: { en: "Downtown Dubai", ar: "وسط مدينة دبي" },
    city: "dubai",
    type: "penthouse",
    purpose: "sale",
    price: 16_750_000,
    currency: "AED",
    plot: null,
    built: 610,
    beds: 4,
    baths: 5,
    parking: 3,
    handover: { en: "Q2 2027", ar: "الربع الثاني 2027" },
    listed: "2026-09-12",
    cover: "downtownPenthouse",
    gallery: ["downtownPenthouse", "livingRoom", "bedroom", "kitchen"],
    summary: { en: "Full-floor penthouse with a wraparound skyline terrace.", ar: "بنتهاوس بطابق كامل وتراس يطل على الأفق." },
    description: {
      en: "An off-plan full-floor residence on the 61st level, with a 180 m² terrace on three sides and a private lift lobby.",
      ar: "وحدة على الخارطة تشغل الطابق 61 بالكامل، بتراس مساحته 180 م² على ثلاث جهات وردهة مصعد خاصة.",
    },
    features: [
      { en: "180 m² terrace", ar: "تراس بمساحة 180 م²" },
      { en: "Private lift lobby", ar: "ردهة مصعد خاصة" },
      { en: "Full-floor layout", ar: "طابق كامل" },
      { en: "Payment plan available", ar: "خطة سداد متاحة" },
    ],
    agent: "omar",
  },
  {
    slug: "mashrabiya-house",
    serial: "VE-KWI-0076",
    name: { en: "Mashrabiya House", ar: "بيت المشربية" },
    district: { en: "Abdullah Al-Salem, Kuwait City", ar: "ضاحية عبدالله السالم، مدينة الكويت" },
    city: "kuwait",
    type: "villa",
    purpose: "sale",
    price: 1_450_000,
    currency: "KWD",
    plot: 1000,
    built: 850,
    beds: 5,
    baths: 6,
    parking: 3,
    handover: null,
    listed: "2026-09-15",
    cover: "kuwaitCourtyard",
    gallery: ["kuwaitCourtyard", "majlis", "livingRoom", "bedroom"],
    summary: { en: "Travertine courtyard house behind a geometric screen.", ar: "بيت بفناء خلف واجهة ترافرتين ومشربية هندسية." },
    description: {
      en: "A private house in one of Kuwait City's established suburbs. The mashrabiya façade shades a sunken olive courtyard that every main room opens onto.",
      ar: "منزل خاص في إحدى ضواحي مدينة الكويت العريقة. تظلل المشربية فناءً منخفضًا بشجرة زيتون تنفتح عليه كل الغرف الرئيسية.",
    },
    features: [
      { en: "Sunken courtyard", ar: "فناء منخفض" },
      { en: "Diwaniya with street entrance", ar: "ديوانية بمدخل مستقل" },
      { en: "Basement garage", ar: "مواقف في القبو" },
      { en: "Bronze entrance doors", ar: "أبواب مدخل برونزية" },
    ],
    agent: "noura",
  },
  {
    slug: "thumamah-estate",
    serial: "VE-RYD-0188",
    name: { en: "Al Thumamah Estate", ar: "مزرعة الثمامة" },
    district: { en: "Al Thumamah, Riyadh", ar: "الثمامة، الرياض" },
    city: "riyadh",
    type: "estate",
    purpose: "sale",
    price: 9_800_000,
    currency: "SAR",
    plot: 10000,
    built: 720,
    beds: 5,
    baths: 6,
    parking: 6,
    handover: null,
    listed: "2026-09-02",
    cover: "thumamahEstate",
    gallery: ["thumamahEstate", "majlis", "terrace", "livingRoom"],
    summary: { en: "Weekend estate on the dunes with a reflecting pool.", ar: "مزرعة لعطلات نهاية الأسبوع على حافة الكثبان." },
    description: {
      en: "A one-hectare retreat forty minutes from north Riyadh: rammed-earth walls, a palm grove and a long reflecting pool facing the dunes at sunset.",
      ar: "استراحة بمساحة هكتار على بعد أربعين دقيقة من شمال الرياض: جدران من الطين المدكوك، وبستان نخيل، وبركة عاكسة طويلة تواجه الكثبان وقت الغروب.",
    },
    features: [
      { en: "1 hectare plot", ar: "أرض بمساحة هكتار" },
      { en: "Palm grove", ar: "بستان نخيل" },
      { en: "Outdoor majlis", ar: "مجلس خارجي" },
      { en: "Stables-ready land", ar: "أرض مهيأة لإسطبل" },
    ],
    agent: "faisal",
  },
  {
    slug: "hills-garden-townhouse",
    serial: "VE-DXB-0134",
    name: { en: "Hills Garden Townhouse", ar: "تاون هاوس حدائق التلال" },
    district: { en: "Dubai Hills Estate, Dubai", ar: "دبي هيلز استيت، دبي" },
    city: "dubai",
    type: "townhouse",
    purpose: "rent",
    price: 420_000,
    currency: "AED",
    plot: 320,
    built: 390,
    beds: 4,
    baths: 5,
    parking: 2,
    handover: null,
    listed: "2026-09-23",
    cover: "hillsTownhouse",
    gallery: ["hillsTownhouse", "livingRoom", "kitchen", "bedroom"],
    summary: { en: "Corner townhouse on a park, ready to move in.", ar: "تاون هاوس زاوية على حديقة، جاهز للسكن." },
    description: {
      en: "A corner unit facing the community park, five minutes' walk from schools and the mall. Available unfurnished on a one-year lease.",
      ar: "وحدة زاوية تطل على حديقة المجمع، على بعد خمس دقائق مشيًا من المدارس والمول. متاحة دون أثاث بعقد سنة.",
    },
    features: [
      { en: "Corner plot facing the park", ar: "زاوية مطلة على الحديقة" },
      { en: "Private garden", ar: "حديقة خاصة" },
      { en: "Maid's room", ar: "غرفة عاملة" },
      { en: "Community pool and gym", ar: "مسبح ونادٍ رياضي للمجمع" },
    ],
    agent: "omar",
  },
  {
    slug: "gulf-road-residence",
    serial: "VE-KWI-0203",
    name: { en: "Gulf Road Residence", ar: "شقة شارع الخليج" },
    district: { en: "Sharq, Kuwait City", ar: "شرق، مدينة الكويت" },
    city: "kuwait",
    type: "apartment",
    purpose: "rent",
    price: 28_800,
    currency: "KWD",
    plot: null,
    built: 290,
    beds: 3,
    baths: 4,
    parking: 2,
    handover: null,
    listed: "2026-09-08",
    cover: "gulfRoadTower",
    gallery: ["gulfRoadTower", "livingRoom", "bedroom", "bathroom"],
    summary: { en: "Sea-view apartment on Gulf Road with deep balconies.", ar: "شقة مطلة على البحر في شارع الخليج بشرفات واسعة." },
    description: {
      en: "A high-floor, three-bedroom apartment in a stone-clad tower on Gulf Road, with uninterrupted sea views and building concierge.",
      ar: "شقة بثلاث غرف في طابق مرتفع ببرج مكسو بالحجر على شارع الخليج، بإطلالة بحرية مفتوحة وخدمة كونسيرج في المبنى.",
    },
    features: [
      { en: "Uninterrupted sea view", ar: "إطلالة بحرية مفتوحة" },
      { en: "Building concierge", ar: "كونسيرج في المبنى" },
      { en: "Two covered parking spaces", ar: "موقفان مغطيان" },
      { en: "Residents' pool", ar: "مسبح للسكان" },
    ],
    agent: "noura",
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const byCity = (city: CityId) => properties.filter((p) => p.city === city);
export const byAgent = (id: string) => properties.filter((p) => p.agent === id);
