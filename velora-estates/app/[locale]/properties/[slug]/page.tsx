import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getAgent, getCity } from "@/data/people-places";
import { byCity, getProperty, properties, propertyTypes, purposes } from "@/data/properties";
import { images } from "@/data/images";
import { getDict, href, isLocale, locales, tr } from "@/lib/i18n";
import { num, priceLabel } from "@/lib/format";
import { site } from "@/lib/site";
import { Shell } from "@/components/section";
import { Gallery } from "@/components/property/gallery";
import { SetAsideButton } from "@/components/property/set-aside-button";
import { ViewingForm } from "@/components/property/viewing-form";
import { PropertyCard } from "@/components/property/property-card";
import { AgentCard } from "@/components/agent-card";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => properties.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/properties/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProperty(slug);
  if (!p || !isLocale(locale)) return {};
  return {
    title: tr(p.name, locale),
    description: tr(p.summary, locale),
    alternates: { canonical: `/${locale}/properties/${slug}`, languages: { en: `/en/properties/${slug}`, ar: `/ar/properties/${slug}` } },
    openGraph: { images: [{ url: images[p.cover].src }] },
  };
}

export default async function PropertyPage({ params }: PageProps<"/[locale]/properties/[slug]">) {
  const { locale, slug } = await params;
  const p = getProperty(slug);
  if (!p || !isLocale(locale)) notFound();
  const t = getDict(locale);
  const agent = getAgent(p.agent);
  const city = getCity(p.city);
  const more = byCity(p.city).filter((x) => x.slug !== p.slug);
  const name = tr(p.name, locale);

  const spec: [string, string][] = [
    [t.detail.serial, p.serial],
    [t.detail.plot, p.plot ? `${num(p.plot, locale)} ${t.card.sqm}` : "—"],
    [t.detail.built, `${num(p.built, locale)} ${t.card.sqm}`],
    [t.detail.bedrooms, String(p.beds)],
    [t.detail.bathrooms, String(p.baths)],
    [t.detail.parking, String(p.parking)],
    [t.detail.handover, p.handover ? tr(p.handover, locale) : t.detail.ready],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    description: tr(p.description, locale),
    url: `${site.url}/${locale}/properties/${p.slug}`,
    image: images[p.cover].src,
    offers: { "@type": "Offer", price: p.price, priceCurrency: p.currency },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="border-b border-rule bg-paper">
        <Shell className="py-8 md:py-10">
          <Link href={href(locale, "/properties")} className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-ink-2 hover:text-ink">
            <ArrowLeft aria-hidden className="size-4 rtl:rotate-180" strokeWidth={1.5} />
            {t.detail.back}
          </Link>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.9375rem] text-ink-2">
                {tr(purposes[p.purpose], locale)} · {tr(propertyTypes[p.type], locale)} · {tr(p.district, locale)}
              </p>
              <h1 className="display reveal mt-2 text-[2.75rem] sm:text-[4rem]">{name}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-[1.5rem] font-semibold tabular-nums">{priceLabel(p, locale, t.card.perYear)}</p>
              <SetAsideButton slug={p.slug} locale={locale} name={name} large />
            </div>
          </div>
        </Shell>
      </div>

      <Shell className="grid gap-12 py-10 md:py-14 lg:grid-cols-[1.45fr_1fr]">
        <div className="min-w-0 space-y-12">
          <Gallery keys={p.gallery} serial={p.serial} locale={locale} />

          <section aria-labelledby="about">
            <h2 id="about" className="display text-[2rem]">
              {t.detail.about}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-2">{tr(p.description, locale)}</p>
          </section>

          <section aria-labelledby="features">
            <h2 id="features" className="display text-[2rem]">
              {t.detail.features}
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f.en} className="flex items-start gap-3 border-b border-rule pb-3 text-[0.9375rem]">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
                  {tr(f, locale)}
                </li>
              ))}
            </ul>
          </section>

          {city && (
            <section aria-labelledby="location">
              <h2 id="location" className="display text-[2rem]">
                {t.detail.location}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-2">
                {tr(p.district, locale)}. {tr(city.blurb, locale)}
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          {/* The spec sheet, printed like the back of a card. */}
          <section aria-labelledby="spec" className="stock p-6">
            <h2 id="spec" className="display text-[1.5rem]">
              {t.detail.specSheet}
            </h2>
            <dl className="mt-4">
              {spec.map(([k, val]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5 text-[0.9375rem] last:border-0">
                  <dt className="text-ink-2">{k}</dt>
                  <dd className="font-medium tabular-nums" dir={k === t.detail.serial ? "ltr" : undefined}>
                    {val}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="viewing" aria-labelledby="viewing-title" className="bg-sand p-6">
            <h2 id="viewing-title" className="display text-[1.75rem]">
              {t.viewing.title}
            </h2>
            <p className="mb-6 mt-2 text-[0.9375rem] text-ink-2">{t.viewing.lede}</p>
            <ViewingForm slug={p.slug} locale={locale} />
          </section>

          {agent && (
            <section aria-label={t.detail.agent}>
              <h2 className="label mb-3">{t.detail.agent}</h2>
              <AgentCard agent={agent} locale={locale} />
            </section>
          )}
        </aside>
      </Shell>

      {more.length > 0 && city && (
        <section aria-labelledby="more" className="border-t border-rule bg-paper py-16 md:py-20">
          <Shell>
            <h2 id="more" className="display text-[2.25rem]">
              {t.detail.similar} {tr(city.name, locale)}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {more.map((x) => (
                <PropertyCard key={x.slug} property={x} locale={locale} />
              ))}
            </div>
          </Shell>
        </section>
      )}
    </article>
  );
}
