import { getSocialLinks, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AvailabilityBadge } from "@/components/ui/tag";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Start a project — tell me about the website, web app or mobile app you want to build.",
  path: "/contact",
});

const expectations = [
  "A reply with questions or a first estimate",
  "A short call if it helps clarify scope",
  "A clear written proposal before any work begins",
];

export default function ContactPage() {
  const socials = getSocialLinks();
  return (
    <section className="pb-24 pt-36 md:pb-36 md:pt-48">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div>
          <SectionHeader
            as="h1"
            eyebrow="Contact"
            title="Let’s build something good."
            description="Share a few details about your project. The more context you give, the more useful my reply will be."
          />
          {site.availability.available && (
            <div className="mt-10">
              <AvailabilityBadge label={site.availability.label} />
            </div>
          )}
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="text-sm font-medium">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {expectations.map((e, i) => (
                <li key={e} className="flex gap-4 text-[0.9375rem] text-muted">
                  <span className="font-mono text-xs leading-6 text-accent">0{i + 1}</span>
                  {e}
                </li>
              ))}
            </ol>
          </div>
          {socials.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-sm font-medium">Elsewhere</h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-11 items-center text-muted underline-offset-4 hover:text-fg hover:underline"
                    >
                      {s.label === "Email" ? site.email : s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="lg:pt-6">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
