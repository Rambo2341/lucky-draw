/** Fictional agents and the four cities. Contact details use reserved demo values. */
import type { L } from "@/demos/velora/lib/i18n";
import type { ImageKey } from "./images";
import type { CityId, Currency } from "./properties";

export type Agent = {
  id: string;
  name: L;
  initials: string;
  role: L;
  city: CityId;
  languages: L;
  phone: string;
  email: string;
};

export const agents: Agent[] = [
  {
    id: "faisal",
    name: { en: "Faisal Al-Qahtani", ar: "فيصل القحطاني" },
    initials: "FQ",
    role: { en: "Riyadh desk", ar: "مكتب الرياض" },
    city: "riyadh",
    languages: { en: "Arabic, English", ar: "العربية، الإنجليزية" },
    phone: "+966 11 000 0142",
    email: "riyadh@velora.example",
  },
  {
    id: "lama",
    name: { en: "Lama Al-Ghamdi", ar: "لمى الغامدي" },
    initials: "LG",
    role: { en: "Jeddah desk", ar: "مكتب جدة" },
    city: "jeddah",
    languages: { en: "Arabic, English, French", ar: "العربية، الإنجليزية، الفرنسية" },
    phone: "+966 12 000 0317",
    email: "jeddah@velora.example",
  },
  {
    id: "omar",
    name: { en: "Omar Haddad", ar: "عمر حداد" },
    initials: "OH",
    role: { en: "Dubai desk", ar: "مكتب دبي" },
    city: "dubai",
    languages: { en: "Arabic, English, Russian", ar: "العربية، الإنجليزية، الروسية" },
    phone: "+971 4 000 0058",
    email: "dubai@velora.example",
  },
  {
    id: "noura",
    name: { en: "Noura Al-Mutairi", ar: "نورة المطيري" },
    initials: "NM",
    role: { en: "Kuwait desk", ar: "مكتب الكويت" },
    city: "kuwait",
    languages: { en: "Arabic, English", ar: "العربية، الإنجليزية" },
    phone: "+965 2000 0076",
    email: "kuwait@velora.example",
  },
];

export const getAgent = (id: string) => agents.find((a) => a.id === id);

export type City = {
  id: CityId;
  name: L;
  country: L;
  currency: Currency;
  image: ImageKey;
  blurb: L;
  districts: L;
};

export const cities: City[] = [
  {
    id: "riyadh",
    name: { en: "Riyadh", ar: "الرياض" },
    country: { en: "Saudi Arabia", ar: "السعودية" },
    currency: "SAR",
    image: "riyadh",
    blurb: {
      en: "Family villas in the northern districts and weekend estates at the city's desert edge.",
      ar: "فلل عائلية في الأحياء الشمالية، ومزارع لنهاية الأسبوع على أطراف المدينة الصحراوية.",
    },
    districts: { en: "Al Malqa · Hittin · Al Thumamah", ar: "الملقا · حطين · الثمامة" },
  },
  {
    id: "jeddah",
    name: { en: "Jeddah", ar: "جدة" },
    country: { en: "Saudi Arabia", ar: "السعودية" },
    currency: "SAR",
    image: "jeddah",
    blurb: {
      en: "Seafront houses along the Obhur creek and apartments on the Red Sea corniche.",
      ar: "بيوت على خور أبحر وشقق على كورنيش البحر الأحمر.",
    },
    districts: { en: "North Obhur · Al Shati · Al Hamra", ar: "أبحر الشمالية · الشاطئ · الحمراء" },
  },
  {
    id: "dubai",
    name: { en: "Dubai", ar: "دبي" },
    country: { en: "United Arab Emirates", ar: "الإمارات" },
    currency: "AED",
    image: "dubai",
    blurb: {
      en: "Beachfront villas, skyline penthouses and family townhouses in green communities.",
      ar: "فلل على الشاطئ، وبنتهاوس فوق الأفق، وتاون هاوس عائلي في مجمعات خضراء.",
    },
    districts: { en: "Palm Jumeirah · Downtown · Dubai Hills", ar: "نخلة جميرا · وسط المدينة · دبي هيلز" },
  },
  {
    id: "kuwait",
    name: { en: "Kuwait City", ar: "مدينة الكويت" },
    country: { en: "Kuwait", ar: "الكويت" },
    currency: "KWD",
    image: "kuwait",
    blurb: {
      en: "Courtyard houses in established suburbs and sea-view apartments on Gulf Road.",
      ar: "بيوت بأفنية في الضواحي العريقة، وشقق مطلة على البحر في شارع الخليج.",
    },
    districts: { en: "Abdullah Al-Salem · Sharq · Salmiya", ar: "عبدالله السالم · شرق · السالمية" },
  },
];

export const getCity = (id: string) => cities.find((c) => c.id === id);
