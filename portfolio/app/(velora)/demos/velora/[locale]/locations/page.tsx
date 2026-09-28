import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { images } from "@/demos/velora/data/images";
import { cities, getAgent, agents } from "@/demos/velora/data/people-places";
import { byCity } from "@/demos/velora/data/properties";
import { getDict, href, isLocale, tr, BASE } from "@/demos/velora/lib/i18n";
import { PageHead, Shell } from "@/demos/velora/components/section";

export async function generateMetadata({ params }: PageProps<"/demos/velora/[locale]/locations">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return { title: t.locations.title, description: t.locations.lede, alternates: { canonical: `${BASE}/${locale}/locations` } };
}

export default async function LocationsPage({ params }: PageProps<"/demos/velora/[locale]/locations">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <>
      <PageHead title={t.locations.title} lede={t.locations.lede} />
      <Shell className="py-10 md:py-16">
        <ul className="divide-y divide-rule border-y border-rule">
          {cities.map((c, i) => {
            const img = images[c.image];
            const count = byCity(c.id).length;
            const agent = getAgent(agents.find((a) => a.city === c.id)?.id ?? "");
            return (
              <li key={c.id} className="grid items-center gap-8 py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
                <div className={`relative aspect-[4/5] max-h-[520px] overflow-hidden bg-sand-deep ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={img.src} alt={tr(img.alt, locale)} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <p className="text-[0.9375rem] text-ink-2">
                    {tr(c.country, locale)} · <span dir="ltr">{c.currency}</span>
                  </p>
                  <h2 className="display mt-2 text-[2.75rem] sm:text-[3.5rem]">{tr(c.name, locale)}</h2>
                  <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">{tr(c.blurb, locale)}</p>
                  <p className="mt-4 text-[0.9375rem]">{tr(c.districts, locale)}</p>
                  {agent && (
                    <p className="mt-2 text-[0.9375rem] text-ink-2">
                      {t.detail.agent}: {tr(agent.name, locale)}
                    </p>
                  )}
                  <Link href={`${href(locale, "/properties")}?city=${c.id}`} className="btn btn-ink mt-8">
                    {t.locations.see(count)}
                    <ArrowRight aria-hidden className="size-4 rtl:rotate-180" strokeWidth={1.5} />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Shell>
    </>
  );
}
