import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workProcess } from "@/data/services";
import { getDict, isLocale, tr } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ServicesList } from "@/components/sections/services-list";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return pageMetadata({ locale, title: t.servicesTitle, description: t.servicesDesc, path: "/services" });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale).services;
  return (
    <>
      <section className="pb-20 pt-36 md:pb-28 md:pt-48">
        <Container>
          <SectionHeader as="h1" eyebrow={t.eyebrow} title={t.pageTitle} description={t.pageLede} />
          <div className="mt-16 md:mt-24">
            <ServicesList locale={locale} detailed />
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="border-t border-line bg-bg-2/40 py-24 md:py-32">
        <Container>
          <SectionHeader eyebrow={t.processEyebrow} title={<span id="process-heading">{t.processTitle}</span>} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((p, i) => (
              <li key={p.step} className="bg-bg">
                <Reveal delay={0.05 * i} className="h-full p-7 md:p-8">
                  <span className="font-mono text-xs text-accent">{p.step}</span>
                  <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{tr(p.title, locale)}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{tr(p.body, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand locale={locale} title={t.ctaTitle} />
    </>
  );
}
