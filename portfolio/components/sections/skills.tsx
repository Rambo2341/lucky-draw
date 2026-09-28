import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
      {skillGroups.map((g, i) => (
        <Reveal key={g.title} delay={0.05 * i} className="bg-bg-2 p-6 md:p-8">
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">{g.title}</dt>
          <dd className="mt-5">
            <ul className="flex flex-wrap gap-x-4 gap-y-2.5">
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
