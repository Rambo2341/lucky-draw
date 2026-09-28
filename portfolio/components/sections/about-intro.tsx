import { Reveal } from "@/components/ui/reveal";

export const aboutCopy = {
  lead: "I’m a developer who turns ideas into polished, dependable digital products.",
  body: [
    "I care about the details people notice without thinking about them: interfaces that are easy to read, layouts that hold up on every screen, pages that load quickly and code that stays easy to change.",
    "I work across modern web technologies and cross-platform mobile development, from marketing sites and storefronts to dashboards and apps. I’m currently taking on freelance projects.",
  ],
};

export const principles = [
  { title: "Clear communication", body: "Straightforward updates, honest timelines and no jargon." },
  { title: "Responsive by default", body: "Every layout is designed and tested from mobile to wide desktop." },
  { title: "Built to last", body: "Typed, organised code that you or another developer can extend." },
];

export function AboutIntro() {
  return (
    <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
      <Reveal>
        <p className="text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] sm:text-4xl md:text-[2.75rem]">{aboutCopy.lead}</p>
      </Reveal>
      <Reveal delay={0.1} className="space-y-5 text-pretty leading-relaxed text-muted md:pt-2 md:text-lg">
        {aboutCopy.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Reveal>
    </div>
  );
}

export function Principles() {
  return (
    <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
      {principles.map((p, i) => (
        <li key={p.title}>
          <Reveal delay={0.05 * i} className="border-t border-line pt-6">
            <h3 className="font-medium tracking-[-0.01em]">{p.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
