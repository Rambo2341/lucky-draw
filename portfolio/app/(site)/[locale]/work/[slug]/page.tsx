import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAdjacentProject, getProject, liveHref, projects } from "@/data/projects";
import { site } from "@/data/site";
import { getDict, href, isLocale, locales, tr } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { ProjectCover } from "@/components/project/project-visuals";
import { ProjectLinks } from "@/components/project/project-links";
import { CaseSection, FeatureGrid, ChallengeList, MobileViews, DesktopView, NextProject } from "@/components/project/case-study";

type Props = PageProps<"/[locale]/work/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  return pageMetadata({ locale, title: `${project.name} — ${tr(project.category, locale)}`, description: tr(project.description, locale), path: `/work/${project.slug}` });
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) notFound();
  const t = getDict(locale).cs;
  const cs = project.caseStudy;
  const next = getAdjacentProject(project.slug);
  const live = liveHref(project, locale);
  const external = Boolean(live && /^https?:/.test(live));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: tr(project.description, locale),
    genre: tr(project.category, locale),
    dateCreated: String(project.year),
    keywords: project.technologies.join(", "),
    url: `${site.url}/${locale}/work/${project.slug}`,
    creator: { "@type": "Person", name: site.name },
  };

  const meta = [
    { label: t.status, value: getDict(locale).status[project.status] },
    { label: t.category, value: tr(project.category, locale) },
    { label: t.year, value: String(project.year) },
    { label: t.platform, value: project.platform === "mobile" ? t.platformMobile : project.bilingual ? t.platformWebBilingual : t.platformWeb },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="pt-28 md:pt-40">
        <Container>
          <Link href={href(locale, "/work")} className="enter group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
            {t.allWork}
          </Link>
          <div className="enter mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted" style={d(60)}>
            <span className="text-accent">{project.number}</span>
            <span aria-hidden className="h-px w-6 bg-line" />
            {tr(project.category, locale)}
          </div>
          <h1 className="enter mt-5 text-[3rem] font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[7.5rem]" style={d(120)} dir="ltr">
            {project.name}
          </h1>
          <div className="enter mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16" style={d(200)}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">{tr(project.description, locale)}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">{m.label}</dt>
                  <dd className="mt-1.5 text-fg">{m.value}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">{t.technology}</dt>
                <dd className="mt-2.5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {live && (
            <div className="enter mt-10 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between" style={d(260)}>
              <p className="flex items-center gap-3 text-[0.9375rem] text-fg">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-emerald-400" />
                {t.liveNote}
              </p>
              <a
                href={live}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-fg px-6 text-[0.9375rem] font-medium text-bg transition-colors hover:bg-white"
              >
                {t.liveCta}
                <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
              </a>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3 empty:hidden">
            <ProjectLinks project={project} locale={locale} />
          </div>
        </Container>
        <Container className="mt-14 md:mt-20">
          <div className="enter-fade overflow-hidden rounded-2xl border border-line md:rounded-3xl" style={d(300)}>
            {live ? (
              <a href={live} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block transition-[filter] hover:brightness-110" aria-label={t.liveCta}>
                <ProjectCover project={project} locale={locale} priority className="md:aspect-[16/9]" />
              </a>
            ) : (
              <ProjectCover project={project} locale={locale} priority className="md:aspect-[16/9]" />
            )}
          </div>
        </Container>
      </header>

      <Container className="py-20 md:py-32">
        <div className="divide-y divide-line border-y border-line">
          <CaseSection title={t.overview}>
            <p>{tr(cs.overview, locale)}</p>
          </CaseSection>
          <CaseSection title={t.goal}>
            <p>{tr(cs.goal, locale)}</p>
          </CaseSection>
          <CaseSection title={t.design}>
            <p>{tr(cs.designDirection, locale)}</p>
          </CaseSection>
          <CaseSection title={t.dev}>
            <p>{tr(cs.developmentApproach, locale)}</p>
          </CaseSection>
          <CaseSection title={t.features}>
            <FeatureGrid features={cs.features} locale={locale} />
          </CaseSection>
        </div>
      </Container>

      <DesktopView project={project} locale={locale} />
      <MobileViews project={project} locale={locale} />

      <Container className="py-20 md:py-32">
        <div className="divide-y divide-line border-y border-line">
          <CaseSection title={t.challenges}>
            <ChallengeList items={cs.challenges} locale={locale} />
          </CaseSection>
          <CaseSection title={t.result}>
            <p>{tr(cs.result, locale)}</p>
            <p className="mt-6 rounded-xl border border-line bg-bg-2 p-5 text-[0.9375rem] leading-relaxed text-muted">
              <span className="font-medium text-fg">{t.aboutTitle}</span> {t.aboutBody(project.name, getDict(locale).status[project.status])}
            </p>
          </CaseSection>
        </div>
      </Container>

      <NextProject project={next} locale={locale} />
    </article>
  );
}
