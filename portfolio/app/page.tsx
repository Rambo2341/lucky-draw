import { getFeaturedProjects } from "@/data/projects";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { ServicesList } from "@/components/sections/services-list";
import { AboutIntro } from "@/components/sections/about-intro";
import { Skills } from "@/components/sections/skills";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <SelectedWork projects={getFeaturedProjects()} />

      <section aria-labelledby="services-heading" className="border-t border-line bg-bg-2/40 py-24 md:py-36">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title={<span id="services-heading">What I can build for you.</span>}
            description="From a focused landing page to a full product interface — built responsive, accessible and fast from the first commit."
            action={
              <ButtonLink href="/services" variant="secondary" arrow>
                Services & process
              </ButtonLink>
            }
          />
          <div className="mt-16">
            <ServicesList />
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-heading" className="border-t border-line py-24 md:py-36">
        <Container>
          <h2 id="about-heading" className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span aria-hidden className="h-px w-6 bg-accent" />
            About
          </h2>
          <AboutIntro />
          <div className="mt-20">
            <h3 className="mb-6 text-sm text-muted">Tools I work with</h3>
            <Skills />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
