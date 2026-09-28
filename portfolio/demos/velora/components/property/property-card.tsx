import Image from "next/image";
import Link from "next/link";
import { images } from "@/demos/velora/data/images";
import { propertyTypes, purposes, type Property } from "@/demos/velora/data/properties";
import { getDict, href, tr, type Locale } from "@/demos/velora/lib/i18n";
import { num, priceLabel } from "@/demos/velora/lib/format";
import { cn } from "@/demos/velora/lib/cn";
import { SetAsideButton } from "./set-aside-button";

/**
 * A listing issued as a keycard: photo at card proportions (1.586:1),
 * serial and purpose printed on it, a perforated tear line, and a stub.
 */
export function PropertyCard({
  property: p,
  locale,
  priority,
  notch = "var(--color-paper)",
  className,
}: {
  property: Property;
  locale: Locale;
  priority?: boolean;
  notch?: string;
  className?: string;
}) {
  const t = getDict(locale);
  const img = images[p.cover];
  const name = tr(p.name, locale);
  return (
    <article className={cn("stock group relative flex flex-col", className)}>
      <div className="relative m-2 mb-0 aspect-[1.586] overflow-hidden rounded-[10px] bg-sand-deep">
        <Image
          src={img.src}
          alt={tr(img.alt, locale)}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <span className="serial absolute start-2.5 top-2.5 bg-stock/95 px-2 py-1 text-ink" dir="ltr">
          {p.serial}
        </span>
        <span className="absolute end-2.5 top-2.5 bg-ink px-2 py-1 text-[0.75rem] font-medium text-stock">
          {tr(purposes[p.purpose], locale)} · {tr(propertyTypes[p.type], locale)}
        </span>
      </div>
      <div className="px-5 pb-4 pt-4">
        <h3 className="display text-[1.5rem]">
          <Link
            href={href(locale, `/properties/${p.slug}`)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
          >
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-[0.875rem] text-ink-2">{tr(p.district, locale)}</p>
      </div>
      <div className="perforation mx-0" style={{ ["--notch" as string]: notch }} />
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div>
          <p className="text-[1.0625rem] font-semibold tabular-nums">{priceLabel(p, locale, t.card.perYear)}</p>
          <p className="mt-0.5 text-[0.8125rem] tabular-nums text-ink-2">
            {p.beds} {t.card.beds} · {p.baths} {t.card.baths} · {num(p.built, locale)} {t.card.sqm}
          </p>
        </div>
        <SetAsideButton slug={p.slug} locale={locale} name={name} />
      </div>
    </article>
  );
}
