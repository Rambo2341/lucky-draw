import { workProcess } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ServicesList } from "@/components/sections/services-list";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Freelance web development, web applications, mobile apps, frontend development and ecommerce — responsive, accessible and fast.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="pb-20 pt-36 md:pb-28 md:pt-48">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="Services"
            title="Websites and apps, designed and built end to end."
            description="I work with founders, small businesses and teams who need a reliable developer to design, build or improve a digital product."
          />
          <div className="mt-16 md:mt-24">
            <ServicesList detailed />
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="border-t border-line bg-bg-2/40 py-24 md:py-32">
        <Container>
          <SectionHeader eyebrow="Process" title={<span id="process-heading">How a project runs.</span>} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((p, i) => (
              <li key={p.step} className="bg-bg">
                <Reveal delay={0.05 * i} className="h-full p-7 md:p-8">
                  <span className="font-mono text-xs text-accent">{p.step}</span>
                  <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title="Let’s scope your project." />
    </>
  );
}
