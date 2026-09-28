import type { Project } from "@/data/projects";
import { getDict, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";

/** External code/app links. Buttons only render for URLs that are configured. The live site has its own button. */
export function ProjectLinks({ project, locale, size = "md" }: { project: Project; locale: Locale; size?: "sm" | "md" }) {
  const t = getDict(locale).work;
  const links = [
    { label: t.appDemo, href: project.appDemoUrl },
    { label: t.sourceCode, href: project.githubUrl },
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
          newTabLabel={locale === "ar" ? "(يفتح في نافذة جديدة)" : "(opens in a new tab)"}
          className={size === "sm" ? "min-h-10 px-4 text-sm" : undefined}
        >
          {l.label}
        </ButtonLink>
      ))}
    </>
  );
}
