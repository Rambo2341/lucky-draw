import type { Project } from "@/data/projects";
import { ButtonLink } from "@/components/ui/button";

/** External project links. Buttons only render for URLs that are configured. */
export function ProjectLinks({ project, size = "md" }: { project: Project; size?: "sm" | "md" }) {
  const links = [
    { label: "Live Demo", href: project.liveUrl },
    { label: "App Demo", href: project.appDemoUrl },
    { label: "Source Code", href: project.githubUrl },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  if (links.length === 0) return null;
  return (
    <>
      {links.map((l) => (
        <ButtonLink
          key={l.label}
          href={l.href}
          external
          arrow
          variant="secondary"
          className={size === "sm" ? "min-h-10 px-4 text-sm" : undefined}
        >
          {l.label}
        </ButtonLink>
      ))}
    </>
  );
}
