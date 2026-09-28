import { skillGroups } from "@/data/skills";
import { tr, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";

export function Skills({ locale }: { locale: Locale }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
      {skillGroups.map((g, i) => (
        <Reveal key={g.title.en} delay={0.05 * i} className="bg-bg-2 p-6 md:p-8">
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">{tr(g.title, locale)}</dt>
          <dd className="mt-5">
            <ul className="flex flex-wrap gap-x-4 gap-y-2.5" dir="ltr">
              {g.items.map((item) => (
                <li key={item} className="text-[0.9375rem] text-fg/90">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
