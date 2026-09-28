import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AboutIntro, Principles } from "@/components/sections/about-intro";
import { Skills } from "@/components/sections/skills";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return pageMetadata({ locale, title: t.aboutTitle, description: t.aboutDesc, path: "/about" });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale).about;
  return (
    <>
      <section className="pb-20 pt-36 md:pb-28 md:pt-48">
        <Container>
          <SectionHeader as="h1" eyebrow={t.eyebrow} title={t.pageTitle} />
          <div className="mt-16 md:mt-24">
            <AboutIntro locale={locale} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="border-t border-line py-24 md:py-32">
        <Container>
          <h2 id="principles-heading" className="mb-12 text-3xl font-medium tracking-[-0.035em] md:text-4xl">
            {t.howTitle}
          </h2>
          <Principles locale={locale} />
        </Container>
      </section>

      <section aria-labelledby="skills-heading" className="border-t border-line py-24 md:py-32">
        <Container>
          <h2 id="skills-heading" className="mb-12 text-3xl font-medium tracking-[-0.035em] md:text-4xl">
            {t.skillsTitle}
          </h2>
          <Skills locale={locale} />
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
