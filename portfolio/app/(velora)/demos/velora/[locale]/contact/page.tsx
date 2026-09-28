import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { agents, getCity } from "@/demos/velora/data/people-places";
import { getDict, isLocale, tr, BASE } from "@/demos/velora/lib/i18n";
import { PageHead, Shell } from "@/demos/velora/components/section";
import { ContactForm } from "@/demos/velora/components/contact-form";

export async function generateMetadata({ params }: PageProps<"/demos/velora/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return { title: t.nav.contact, description: t.contact.lede, alternates: { canonical: `${BASE}/${locale}/contact` } };
}

export default async function ContactPage({ params }: PageProps<"/demos/velora/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <>
      <PageHead title={t.contact.title} lede={t.contact.lede} />
      <div className="bg-sand">
        <Shell className="grid gap-10 py-10 md:py-16 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm locale={locale} />
          <section aria-labelledby="desks">
            <h2 id="desks" className="display text-[1.75rem]">
              {t.contact.desks}
            </h2>
            <ul className="mt-5 divide-y divide-sand-deep border-y border-sand-deep">
              {agents.map((a) => {
                const c = getCity(a.city);
                return (
                  <li key={a.id} className="py-4">
                    <p className="font-semibold">{c ? tr(c.name, locale) : ""}</p>
                    <p className="mt-0.5 text-[0.9375rem] text-ink-2">{tr(a.name, locale)}</p>
                    <p className="mt-1 text-[0.9375rem] tabular-nums" dir="ltr">
                      <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="hover:underline">
                        {a.phone}
                      </a>
                      {" · "}
                      <a href={`mailto:${a.email}`} className="hover:underline">
                        {a.email}
                      </a>
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[0.75rem] text-ink-2">{t.agents.demoContact}</p>
          </section>
        </Shell>
      </div>
    </>
  );
}
