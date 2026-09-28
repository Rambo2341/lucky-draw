import type { ViewingRequest } from "@/lib/store";
import { getDict, tr, type Locale } from "@/lib/i18n";
import { longDate } from "@/lib/format";
import { getProperty } from "@/data/properties";
import { getAgent } from "@/data/people-places";
import { Monogram } from "@/components/monogram";

/** The numbered appointment card issued after a viewing request. */
export function AppointmentCard({ request: r, locale, fresh }: { request: ViewingRequest; locale: Locale; fresh?: boolean }) {
  const t = getDict(locale);
  const p = getProperty(r.slug);
  const agent = p ? getAgent(p.agent) : undefined;
  return (
    <div className="stock relative grid overflow-hidden sm:grid-cols-[1fr_auto]" style={fresh ? { animation: "rise 0.7s var(--ease-out)" } : undefined}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Monogram className="size-9" />
          <p className="display text-[1.375rem]">{t.viewing.cardTitle}</p>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-[0.9375rem]">
          <div className="col-span-2">
            <dt className="label">{t.nav.properties}</dt>
            <dd className="mt-1 font-medium">
              {p ? tr(p.name, locale) : r.slug}{" "}
              <span className="serial text-ink-3" dir="ltr">
                {p?.serial}
              </span>
            </dd>
          </div>
          <div>
            <dt className="label">{t.viewing.date}</dt>
            <dd className="mt-1">{longDate(r.date, locale)}</dd>
          </div>
          <div>
            <dt className="label">{t.viewing.time}</dt>
            <dd className="mt-1 tabular-nums" dir="ltr">
              {r.time}
            </dd>
          </div>
          {agent && (
            <div className="col-span-2">
              <dt className="label">{t.viewing.cardWith}</dt>
              <dd className="mt-1">
                {tr(agent.name, locale)} · {tr(agent.role, locale)}
              </dd>
            </div>
          )}
        </dl>
        <p className="mt-6 text-[0.8125rem] text-ink-3">{t.viewing.cardNote}</p>
      </div>
      {/* Tear-off stub with the reference, separated by a vertical perforation. */}
      <div className="relative flex flex-col items-center justify-center gap-2 border-t-[1.5px] border-dashed border-rule bg-paper px-8 py-6 sm:border-s-[1.5px] sm:border-t-0">
        <span className="label">{t.viewing.cardRef}</span>
        <span className="serial text-[1.05rem] text-ink" dir="ltr">
          {r.ref}
        </span>
        <span
          className="mt-2 border-2 border-ink px-2 py-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] rtl:tracking-normal"
          style={{ animation: fresh ? "stamp 0.5s var(--ease-out) 0.35s both" : undefined, transform: "rotate(-4deg)" }}
        >
          {locale === "ar" ? "طلب مسجّل" : "Requested"}
        </span>
      </div>
    </div>
  );
}
