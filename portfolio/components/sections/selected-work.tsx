import type { Project } from "@/data/projects";
import { getDict, href, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/project/project-card";

export function SelectedWork({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const t = getDict(locale).work;
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 md:py-36">
      <Container>
        <SectionHeader
          eyebrow={t.eyebrow}
          title={<span id="work-heading">{t.title}</span>}
          description={t.lede}
          action={
            <ButtonLink href={href(locale, "/work")} variant="secondary" arrow>
              {t.all}
            </ButtonLink>
          }
        />
        <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-20 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "md:mt-28" : undefined}>
              <ProjectCard project={p} locale={locale} delay={0.05 * (i % 2)} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
