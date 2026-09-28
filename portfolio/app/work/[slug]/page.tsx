import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdjacentProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { ProjectCover } from "@/components/project/project-visuals";
import { ProjectLinks } from "@/components/project/project-links";
import { CaseSection, FeatureGrid, ChallengeList, MobileViews, DesktopView, NextProject } from "@/components/project/case-study";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — ${project.category}`,
    description: project.description,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const next = getAdjacentProject(project.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    genre: project.category,
    dateCreated: String(project.year),
    keywords: project.technologies.join(", "),
    url: `${site.url}/work/${project.slug}`,
    creator: { "@type": "Person", name: site.name },
  };

  const meta = [
    { label: "Status", value: project.status },
    { label: "Category", value: project.category },
    { label: "Year", value: String(project.year) },
    { label: "Platform", value: project.platform === "mobile" ? "iOS & Android" : "Web · Responsive" },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="pt-28 md:pt-40">
        <Container>
          <Link href="/work" className="enter group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <div className="enter mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted" style={{ "--d": "60ms" } as React.CSSProperties}>
            <span className="text-accent">{project.number}</span>
            <span aria-hidden className="h-px w-6 bg-line" />
            {project.category}
          </div>
          <h1
            className="enter mt-5 text-[3rem] font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[7.5rem]"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {project.name}
          </h1>
          <div className="enter mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16" style={{ "--d": "200ms" } as React.CSSProperties}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">{project.description}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">{m.label}</dt>
                  <dd className="mt-1.5 text-fg">{m.value}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">Technology</dt>
                <dd className="mt-2.5 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 empty:hidden">
            <ProjectLinks project={project} />
          </div>
        </Container>
        <Container className="mt-14 md:mt-20">
          <div className="enter-fade overflow-hidden rounded-2xl border border-line md:rounded-3xl" style={{ "--d": "300ms" } as React.CSSProperties}>
            <ProjectCover project={project} priority className="md:aspect-[16/9]" />
          </div>
        </Container>
      </header>

      <Container className="py-20 md:py-32">
        <div className="divide-y divide-line border-y border-line">
          <CaseSection title="Overview">
            <p>{cs.overview}</p>
          </CaseSection>
          <CaseSection title="Goal">
            <p>{cs.goal}</p>
          </CaseSection>
          <CaseSection title="Design direction">
            <p>{cs.designDirection}</p>
          </CaseSection>
          <CaseSection title="Development approach">
            <p>{cs.developmentApproach}</p>
          </CaseSection>
          <CaseSection title="Key features">
            <FeatureGrid features={cs.features} />
          </CaseSection>
        </div>
      </Container>

      <DesktopView project={project} />
      <MobileViews project={project} />

      <Container className="py-20 md:py-32">
        <div className="divide-y divide-line border-y border-line">
          <CaseSection title="Challenges & solutions">
            <ChallengeList items={cs.challenges} />
          </CaseSection>
          <CaseSection title="Final result">
            <p>{cs.result}</p>
            <p className="mt-6 rounded-xl border border-line bg-bg-2 p-5 text-[0.9375rem] leading-relaxed text-muted">
              <span className="font-medium text-fg">About this project.</span> {project.name} is a self-initiated {project.status.toLowerCase()} —
              not client work. The interfaces on this page are rendered live in code, not static mockups. Live demo and source links
              appear here when they are available.
            </p>
          </CaseSection>
        </div>
      </Container>

      <NextProject project={next} />
    </article>
  );
}
