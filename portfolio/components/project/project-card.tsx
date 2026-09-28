import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCover } from "./project-visuals";
import { ProjectLinks } from "./project-links";

export function ProjectCard({ project, priority, delay = 0 }: { project: Project; priority?: boolean; delay?: number }) {
  const href = `/work/${project.slug}`;
  return (
    <Reveal delay={delay}>
      <article className="group relative flex flex-col">
        <div className="overflow-hidden rounded-2xl border border-line transition-colors duration-500 group-hover:border-subtle">
          <ProjectCover project={project} priority={priority} className="transition-[filter] duration-700 group-hover:brightness-110" />
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-subtle">{project.number}</span>
              <span aria-hidden className="h-px w-4 bg-line" />
              <span className="text-sm text-muted">{project.category}</span>
            </div>
            <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-[1.75rem]">
              <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent">
                {project.name}
              </Link>
            </h3>
            <p className="mt-2 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-muted">{project.shortDescription}</p>
          </div>
          <span
            aria-hidden
            className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
          >
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag tone="accent">{project.status}</Tag>
          {project.technologies.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
          <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-fg underline-offset-4 hover:text-accent hover:underline">
            View Case Study
          </Link>
          <ProjectLinks project={project} size="sm" />
        </div>
      </article>
    </Reveal>
  );
}
