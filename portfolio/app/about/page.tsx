import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AboutIntro, Principles } from "@/components/sections/about-intro";
import { Skills } from "@/components/sections/skills";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "About",
  description: "A web and mobile developer focused on clean interfaces, responsive implementation and performance.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="pb-20 pt-36 md:pb-28 md:pt-48">
        <Container>
          <SectionHeader as="h1" eyebrow="About" title="Thoughtful interfaces, built properly." />
          <div className="mt-16 md:mt-24">
            <AboutIntro />
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="border-t border-line py-24 md:py-32">
        <Container>
          <h2 id="principles-heading" className="mb-12 text-3xl font-medium tracking-[-0.035em] md:text-4xl">
            How I work
          </h2>
          <Principles />
        </Container>
      </section>

      <section aria-labelledby="skills-heading" className="border-t border-line py-24 md:py-32">
        <Container>
          <h2 id="skills-heading" className="mb-12 text-3xl font-medium tracking-[-0.035em] md:text-4xl">
            Skills & tools
          </h2>
          <Skills />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
