import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSocialLinks, site } from "@/data/site";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AvailabilityBadge } from "@/components/ui/tag";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return pageMetadata({ locale, title: t.contactTitle, description: t.contactDesc, path: "/contact" });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);
  const t = dict.contact;
  const socials = getSocialLinks();
  return (
    <section className="pb-24 pt-36 md:pb-36 md:pt-48">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div>
          <SectionHeader as="h1" eyebrow={t.eyebrow} title={t.title} description={t.lede} />
          {site.availability.available && (
            <div className="mt-10">
              <AvailabilityBadge label={dict.availability} />
            </div>
          )}
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="text-sm font-medium">{t.nextTitle}</h2>
            <ol className="mt-5 space-y-4">
              {t.next.map((e, i) => (
                <li key={e} className="flex gap-4 text-[0.9375rem] text-muted">
                  <span className="font-mono text-xs leading-6 text-accent">0{i + 1}</span>
                  {e}
                </li>
              ))}
            </ol>
          </div>
          {socials.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-sm font-medium">{t.elsewhere}</h2>
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
          <ContactForm locale={locale} />
        </div>
      </Container>
    </section>
  );
}
