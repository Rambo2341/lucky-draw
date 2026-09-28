import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { liveHref, type Project } from "@/data/projects";
import { getDict, href, tr, type Locale } from "@/lib/i18n";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCover } from "./project-visuals";
import { ProjectLinks } from "./project-links";

/**
 * A project card. When the project has a live site, the whole card opens it
 * directly; the case study stays one click away. Otherwise the card opens
 * the case study.
 */
export function ProjectCard({ project, locale, priority, delay = 0 }: { project: Project; locale: Locale; priority?: boolean; delay?: number }) {
  const t = getDict(locale);
  const caseHref = href(locale, `/work/${project.slug}`);
  const live = liveHref(project, locale);
  const primary = live ?? caseHref;
  const external = Boolean(live && /^https?:/.test(live));

  return (
    <Reveal delay={delay}>
      <article className="group relative flex flex-col">
        <div className="relative overflow-hidden rounded-2xl border border-line transition-colors duration-500 group-hover:border-subtle">
          <ProjectCover project={project} locale={locale} priority={priority} className="transition-[filter] duration-700 group-hover:brightness-110" />
          {live && (
            <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/90 px-3 py-1.5 text-xs font-medium text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
              {t.work.liveBadge}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-subtle">{project.number}</span>
              <span aria-hidden className="h-px w-4 bg-line" />
              <span className="text-sm text-muted">{tr(project.category, locale)}</span>
            </div>
            <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-[1.75rem]">
              <a
                href={primary}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
              >
                <span dir="ltr">{project.name}</span>
                {live && <span className="sr-only"> — {t.work.openLive}</span>}
              </a>
            </h3>
            <p className="mt-2 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">{tr(project.shortDescription, locale)}</p>
          </div>
          <span
            aria-hidden
            className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
          >
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag tone="accent">{t.status[project.status]}</Tag>
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {live && (
            <a
              href={live}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-white"
            >
              {t.work.openLive}
              <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
          )}
          <Link href={caseHref} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg underline-offset-4 hover:text-accent hover:underline">
            {t.work.caseStudy}
          </Link>
          <ProjectLinks project={project} locale={locale} size="sm" />
        </div>
      </article>
    </Reveal>
  );
}
