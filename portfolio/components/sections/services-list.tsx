import { services } from "@/data/services";
import { tr, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/reveal";

/** Numbered service rows. `detailed` also shows what each service includes. */
export function ServicesList({ locale, detailed = false }: { locale: Locale; detailed?: boolean }) {
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.title.en} className="border-b border-line">
          <Reveal delay={0.04 * i}>
            <div className="group grid gap-4 py-8 transition-colors md:grid-cols-[5rem_1fr_1.2fr] md:gap-8 md:py-10">
              <span className="font-mono text-xs text-subtle transition-colors group-hover:text-accent md:pt-2.5">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:text-[2rem] rtl:group-hover:-translate-x-1">
                {tr(s.title, locale)}
              </h3>
              <div>
                <p className="text-pretty leading-relaxed text-fg/90">{tr(s.summary, locale)}</p>
                <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-muted">{tr(s.details, locale)}</p>
                {detailed && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.includes.map((item) => (
                      <li key={item.en} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                        {tr(item, locale)}
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
