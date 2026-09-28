import { services } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";

/** Numbered service rows. `detailed` also shows what each service includes. */
export function ServicesList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.title} className="border-b border-line">
          <Reveal delay={0.04 * i}>
            <div className="group grid gap-4 py-8 transition-colors md:grid-cols-[5rem_1fr_1.2fr] md:gap-8 md:py-10">
              <span className="font-mono text-xs text-subtle transition-colors group-hover:text-accent md:pt-2.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:text-[2rem]">
                {s.title}
              </h3>
              <div>
                <p className="text-pretty leading-relaxed text-fg/90">{s.summary}</p>
                <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-muted">{s.details}</p>
                {detailed && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.includes.map((item) => (
                      <li key={item} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
