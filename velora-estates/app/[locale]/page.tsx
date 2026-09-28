import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { images } from "@/data/images";
import { agents, cities } from "@/data/people-places";
import { byCity, properties } from "@/data/properties";
import { applyFilters } from "@/lib/filters";
import { getDict, href, isLocale, tr } from "@/lib/i18n";
import { Shell } from "@/components/section";
import { RequestSlip } from "@/components/home/request-slip";
import { FannedCards } from "@/components/home/fanned-cards";
import { PropertyCard } from "@/components/property/property-card";
import { AgentCard } from "@/components/agent-card";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  const newest = applyFilters({ sort: "newest" });
  const fanned = [properties[5], properties[1], properties[2]];

  return (
    <>
      {/* First viewport: the request slip beside the dealt cards. */}
      <section className="border-b border-rule">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-4 pb-12 pt-10 sm:px-6 lg:pb-16 lg:pe-10 lg:ps-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))] lg:pt-16">
            <h1 className="display reveal max-w-[12ch] text-[3.25rem] sm:text-[4.5rem] xl:text-[5.5rem] rtl:max-w-[14ch] rtl:text-[2.9rem] rtl:sm:text-[3.9rem] rtl:xl:text-[4.6rem]">
              {t.home.title}
            </h1>
            <p className="reveal mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2" style={{ ["--d" as string]: "80ms" }}>
              {t.home.lede}
            </p>
            <div className="reveal mt-10" style={{ ["--d" as string]: "160ms" }}>
              <RequestSlip locale={locale} />
            </div>
          </div>
          <FannedCards items={fanned} locale={locale} />
        </div>
      </section>

      {/* Featured cards. */}
      <section aria-labelledby="featured" className="bg-paper py-20 md:py-28">
        <Shell>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="featured" className="display text-[2.5rem] sm:text-[3.25rem]">
                {t.home.featured}
              </h2>
              <p className="mt-3 max-w-lg text-ink-2">{t.home.featuredLede}</p>
            </div>
            <Link href={href(locale, "/properties")} className="btn btn-line self-start md:self-auto">
              {t.home.viewAll}
              <ArrowRight aria-hidden className="size-4 rtl:rotate-180" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {newest.slice(0, 6).map((p) => (
              <PropertyCard key={p.slug} property={p} locale={locale} />
            ))}
          </div>
        </Shell>
      </section>

      {/* How a request is handled: a real three-step sequence. */}
      <section aria-labelledby="how" className="py-20 md:py-28">
        <Shell className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="how" className="display text-[2.5rem] sm:text-[3.25rem]">
            {t.home.howTitle}
          </h2>
          <ol className="grid gap-px bg-rule sm:grid-cols-3">
            {t.home.how.map((s, i) => (
              <li key={s.t} className="bg-stock p-6 sm:pt-10">
                <span className="display text-[3rem] leading-none text-sand-deep" dir="ltr">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[1.0625rem] font-semibold">{s.t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      {/* Cities. */}
      <section aria-labelledby="cities" className="bg-ink py-20 text-stock md:py-28">
        <Shell>
          <h2 id="cities" className="display text-[2.5rem] sm:text-[3.25rem]">
            {t.home.citiesTitle}
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {cities.map((c) => {
              const img = images[c.image];
              return (
                <li key={c.id}>
                  <Link href={`${href(locale, "/properties")}?city=${c.id}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
                      <Image
                        src={img.src}
                        alt={tr(img.alt, locale)}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-2">
                      <span className="display text-[1.5rem]">{tr(c.name, locale)}</span>
                      <span className="text-[0.8125rem] text-stock/70">{t.agents.listings(byCity(c.id).length)}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Shell>
      </section>

      {/* Agents. */}
      <section aria-labelledby="agents" className="bg-paper py-20 md:py-28">
        <Shell>
          <h2 id="agents" className="display text-[2.5rem] sm:text-[3.25rem]">
            {t.home.agentsTitle}
          </h2>
          <p className="mt-3 max-w-lg text-ink-2">{t.home.agentsLede}</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} locale={locale} compact />
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
}
