/**
 * Skills shown on the home and about pages.
 * Only list technologies you actually use — add a group or item here and it
 * appears automatically.
 */
export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Figma", "Vercel"],
  },
];
