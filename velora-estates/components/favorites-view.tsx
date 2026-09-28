"use client";

import Link from "next/link";
import { getProperty, type Property } from "@/data/properties";
import { getDict, href, type Locale } from "@/lib/i18n";
import { actions, useStore } from "@/lib/store";
import { Shell } from "@/components/section";
import { PropertyCard } from "@/components/property/property-card";
import { AppointmentCard } from "@/components/property/appointment-card";

export function FavoritesView({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const { saved, requests } = useStore();
  const cards = saved.map(getProperty).filter((p): p is Property => Boolean(p));

  return (
    <Shell className="space-y-16 py-10 md:py-14">
      <section aria-labelledby="held">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="held" className="display text-[2rem]">
            {t.props.results(cards.length)}
          </h2>
          {cards.length > 0 && (
            <button type="button" onClick={() => actions.clearSaved()} className="btn min-h-11 px-0 text-[0.9375rem] text-ink-2 underline hover:text-ink">
              {t.fav.clear}
            </button>
          )}
        </div>
        {cards.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((p) => (
              <PropertyCard key={p.slug} property={p} locale={locale} notch="var(--color-stock)" />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-sand-deep bg-paper px-6 py-16 text-center">
            <p className="display text-[1.75rem]">{t.fav.emptyTitle}</p>
            <p className="mx-auto mt-3 max-w-md text-ink-2">{t.fav.emptyBody}</p>
            <Link href={href(locale, "/properties")} className="btn btn-ink mt-8">
              {t.fav.browse}
            </Link>
          </div>
        )}
      </section>

      <section aria-labelledby="requests">
        <h2 id="requests" className="display text-[2rem]">
          {t.fav.requests}
        </h2>
        {requests.length > 0 ? (
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {requests.map((r) => (
              <li key={r.ref}>
                <AppointmentCard request={r} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-ink-2">{t.fav.noRequests}</p>
        )}
      </section>
    </Shell>
  );
}
