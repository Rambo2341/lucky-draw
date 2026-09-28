import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/project/project-card";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "Work",
  description: "Personal and concept projects in web development, ecommerce, SaaS dashboards and mobile apps.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="pb-24 pt-36 md:pb-36 md:pt-48">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow={`Work · ${projects.length} projects`}
            title="Selected projects."
            description="Self-initiated personal and concept projects covering real-estate, ecommerce, finance and SaaS — each one labelled honestly and documented as a case study."
          />
          <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-24">
            {projects.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "md:mt-28" : undefined}>
                <ProjectCard project={p} priority={i < 2} delay={0.05 * (i % 2)} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
