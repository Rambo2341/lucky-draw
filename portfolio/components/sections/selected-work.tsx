import type { Project } from "@/data/projects";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/project/project-card";

type Props = {
  projects: Project[];
  headingLevel?: "h1" | "h2";
  showAllLink?: boolean;
};

export function SelectedWork({ projects, headingLevel = "h2", showAllLink = true }: Props) {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 md:py-36">
      <Container>
        <SectionHeader
          as={headingLevel}
          eyebrow="Selected work"
          title={<span id="work-heading">Personal and concept projects, built with care.</span>}
          description="Self-initiated projects that show how I approach real product problems — from structure and interface design to responsive implementation."
          action={
            showAllLink ? (
              <ButtonLink href="/work" variant="secondary" arrow>
                All projects
              </ButtonLink>
            ) : undefined
          }
        />
        <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-20 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "md:mt-28" : undefined}>
              <ProjectCard project={p} delay={0.05 * (i % 2)} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
