import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { Agent } from "@/data/people-places";
import { byAgent } from "@/data/properties";
import { getDict, href, tr, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/** A calling card: monogram, name, desk, languages and (demo) contact lines. */
export function AgentCard({
  agent: a,
  locale,
  compact,
  notch = "var(--color-paper)",
  className,
}: {
  agent: Agent;
  locale: Locale;
  compact?: boolean;
  notch?: string;
  className?: string;
}) {
  const t = getDict(locale);
  const count = byAgent(a.id).length;
  return (
    <article className={cn("stock relative flex flex-col p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <span className="display grid size-14 place-items-center rounded-full border border-ink text-[1.25rem] tracking-[0.06em]" aria-hidden dir="ltr">
          {a.initials}
        </span>
        <span className="label">{tr(a.role, locale)}</span>
      </div>
      <h3 className="display mt-6 text-[1.625rem]">{tr(a.name, locale)}</h3>
      <p className="mt-1 text-[0.875rem] text-ink-2">
        {t.agents.languages}: {tr(a.languages, locale)}
      </p>
      {!compact && (
        <>
          <div className="perforation my-5 -mx-6" style={{ ["--notch" as string]: notch }} />
          <ul className="space-y-1 text-[0.9375rem]">
            <li>
              <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="inline-flex min-h-10 items-center gap-2 tabular-nums hover:underline" dir="ltr">
                <Phone aria-hidden className="size-4" strokeWidth={1.4} />
                {a.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${a.email}`} className="inline-flex min-h-10 items-center gap-2 hover:underline" dir="ltr">
                <Mail aria-hidden className="size-4" strokeWidth={1.4} />
                {a.email}
              </a>
            </li>
          </ul>
          <p className="mt-2 text-[0.75rem] text-ink-3">{t.agents.demoContact}</p>
        </>
      )}
      <Link
        href={`${href(locale, "/properties")}?city=${a.city}`}
        className="mt-5 inline-flex min-h-10 items-center text-[0.9375rem] font-medium underline hover:no-underline"
      >
        {t.agents.listings(count)}
      </Link>
    </article>
  );
}
