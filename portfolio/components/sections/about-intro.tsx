import type { L, Locale } from "@/lib/i18n";
import { tr } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";

export const aboutCopy: { lead: L; body: L[] } = {
  lead: {
    en: "I’m a developer who turns ideas into polished, dependable digital products.",
    ar: "أنا مطوّر يحوّل الأفكار إلى منتجات رقمية متقنة يُعتمد عليها.",
  },
  body: [
    {
      en: "I care about the details people notice without thinking about them: interfaces that are easy to read, layouts that hold up on every screen, pages that load quickly and code that stays easy to change.",
      ar: "أهتم بالتفاصيل التي يلاحظها الناس دون أن يفكروا فيها: واجهات سهلة القراءة، وتخطيطات تصمد على كل شاشة، وصفحات سريعة التحميل، وكود يبقى سهل التعديل.",
    },
    {
      en: "I work across modern web technologies and cross-platform mobile development, from marketing sites and storefronts to dashboards and apps. I’m currently taking on freelance projects.",
      ar: "أعمل بتقنيات الويب الحديثة وتطوير تطبيقات الجوال لآيفون وأندرويد، من المواقع التعريفية والمتاجر إلى لوحات التحكم والتطبيقات. وأستقبل حاليًا مشاريع العمل الحر.",
    },
  ],
};

export const principles: { title: L; body: L }[] = [
  {
    title: { en: "Clear communication", ar: "تواصل واضح" },
    body: { en: "Straightforward updates, honest timelines and no jargon.", ar: "تحديثات مباشرة، ومواعيد صادقة، وبدون مصطلحات معقدة." },
  },
  {
    title: { en: "Responsive by default", ar: "متجاوب من الأساس" },
    body: { en: "Every layout is designed and tested from mobile to wide desktop.", ar: "كل تخطيط مصمم ومختبر من الجوال حتى الشاشات العريضة." },
  },
  {
    title: { en: "Built to last", ar: "مبني ليدوم" },
    body: { en: "Typed, organised code that you or another developer can extend.", ar: "كود منظم ومحدد الأنواع يمكنك أنت أو أي مطوّر آخر البناء عليه." },
  },
];

export function AboutIntro({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
      <Reveal>
        <p className="text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.03em] sm:text-4xl md:text-[2.75rem]">{tr(aboutCopy.lead, locale)}</p>
      </Reveal>
      <Reveal delay={0.1} className="space-y-5 text-pretty leading-relaxed text-muted md:pt-2 md:text-lg">
        {aboutCopy.body.map((p) => (
          <p key={p.en}>{tr(p, locale)}</p>
        ))}
      </Reveal>
    </div>
  );
}

export function Principles({ locale }: { locale: Locale }) {
  return (
    <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
      {principles.map((p, i) => (
        <li key={p.title.en}>
          <Reveal delay={0.05 * i} className="border-t border-line pt-6">
            <h3 className="font-medium tracking-[-0.01em]">{tr(p.title, locale)}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{tr(p.body, locale)}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
