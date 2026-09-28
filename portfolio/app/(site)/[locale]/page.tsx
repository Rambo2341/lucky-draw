import { notFound } from "next/navigation";
import { getFeaturedProjects } from "@/data/projects";
import { site } from "@/data/site";
import { getDict, href, isLocale, tr } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { ServicesList } from "@/components/sections/services-list";
import { AboutIntro } from "@/components/sections/about-intro";
import { Skills } from "@/components/sections/skills";
import { CtaBand } from "@/components/sections/cta-band";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: tr(site.role, locale),
    description: tr(site.description, locale),
    url: `${site.url}/${locale}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero locale={locale} />
      <SelectedWork projects={getFeaturedProjects()} locale={locale} />

      <section aria-labelledby="services-heading" className="border-t border-line bg-bg-2/40 py-24 md:py-36">
        <Container>
          <SectionHeader
            eyebrow={t.services.eyebrow}
            title={<span id="services-heading">{t.services.title}</span>}
            description={t.services.lede}
            action={
              <ButtonLink href={href(locale, "/services")} variant="secondary" arrow>
                {t.services.more}
              </ButtonLink>
            }
          />
          <div className="mt-16">
            <ServicesList locale={locale} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-heading" className="border-t border-line py-24 md:py-36">
        <Container>
          <h2 id="about-heading" className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {t.about.eyebrow}
          </h2>
          <AboutIntro locale={locale} />
          <div className="mt-20">
            <h3 className="mb-6 text-sm text-muted">{t.about.tools}</h3>
            <Skills locale={locale} />
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
