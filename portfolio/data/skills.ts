/**
 * Skills shown on the home and about pages. Technology names stay in
 * English in both languages; only the group titles are translated.
 */
import type { L } from "@/lib/i18n";

export type SkillGroup = { title: L; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: { en: "Frontend", ar: "الواجهات الأمامية" },
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: { en: "Mobile", ar: "الجوال" },
    items: ["React Native", "Expo"],
  },
  {
    title: { en: "Tools", ar: "الأدوات" },
    items: ["Git", "GitHub", "Figma", "Vercel"],
  },
];
