import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/project/project-card";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return pageMetadata({ locale, title: t.workTitle, description: t.workDesc, path: "/work" });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale).work;
  return (
    <>
      <section className="pb-24 pt-36 md:pb-36 md:pt-48">
        <Container>
          <SectionHeader as="h1" eyebrow={t.pageEyebrow(projects.length)} title={t.pageTitle} description={t.pageLede} />
          <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-24">
            {projects.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "md:mt-28" : undefined}>
                <ProjectCard project={p} locale={locale} priority={i < 2} delay={0.05 * (i % 2)} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
