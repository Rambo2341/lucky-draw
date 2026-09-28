import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { images } from "@/demos/velora/data/images";
import { getDict, isLocale, tr, BASE } from "@/demos/velora/lib/i18n";
import { Shell } from "@/demos/velora/components/section";
import { EmbossMark } from "@/demos/velora/components/monogram";

export async function generateMetadata({ params }: PageProps<"/demos/velora/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return { title: t.nav.about, description: t.about.body[0], alternates: { canonical: `${BASE}/${locale}/about` } };
}

export default async function AboutPage({ params }: PageProps<"/demos/velora/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  const img = images.majlis;
  return (
    <>
      <section className="border-b border-rule">
        <Shell className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h1 className="display reveal max-w-[14ch] text-[2.75rem] sm:text-[4rem]">{t.about.title}</h1>
            <div className="mt-8 max-w-[58ch] space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
              {t.about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="stock rounded-[14px] p-2">
            <div className="relative aspect-[1.586] overflow-hidden rounded-[10px] bg-sand-deep">
              <Image src={img.src} alt={tr(img.alt, locale)} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority />
            </div>
          </div>
        </Shell>
      </section>

      <section aria-labelledby="principles" className="relative overflow-hidden bg-sand py-16 md:py-24">
        <EmbossMark className="absolute -end-20 -top-20 w-[380px]" />
        <Shell className="relative">
          <h2 id="principles" className="display text-[2.25rem] sm:text-[3rem]">
            {t.about.principlesTitle}
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {t.about.principles.map((p) => (
              <li key={p.t} className="stock p-6">
                <h3 className="text-[1.0625rem] font-semibold">{p.t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{p.d}</p>
              </li>
            ))}
          </ul>
        </Shell>
      </section>

      <section aria-labelledby="concept" className="py-16 md:py-20">
        <Shell>
          <div className="max-w-3xl border-t border-ink pt-6">
            <h2 id="concept" className="display text-[1.75rem]">
              {t.about.conceptTitle}
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{t.about.concept}</p>
          </div>
        </Shell>
      </section>
    </>
  );
}
