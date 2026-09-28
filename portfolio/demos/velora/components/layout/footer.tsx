import Link from "next/link";
import { cities } from "@/demos/velora/data/people-places";
import { getDict, href, tr, type Locale } from "@/demos/velora/lib/i18n";
import { site } from "@/demos/velora/lib/site";
import { Monogram } from "@/demos/velora/components/monogram";

export function DemoBanner({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const portfolio = site.portfolioUrl || `/${locale}`;
  return (
    <div className="bg-ink text-stock">
      <p className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[0.8125rem] sm:px-6">
        <span>{t.demoBanner}</span>
        <a href={portfolio} className="underline hover:no-underline">
          {t.demoBannerLink}
        </a>
      </p>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const portfolio = site.portfolioUrl || `/${locale}`;
  const pages = [
    { href: href(locale, "/properties"), label: t.nav.properties },
    { href: href(locale, "/locations"), label: t.nav.locations },
    { href: href(locale, "/agents"), label: t.nav.agents },
    { href: href(locale, "/about"), label: t.nav.about },
    { href: href(locale, "/contact"), label: t.nav.contact },
    { href: href(locale, "/favorites"), label: t.nav.setAside },
  ];
  return (
    <footer className="bg-sand">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Link href={href(locale)} className="inline-flex items-center gap-3">
            <Monogram className="size-10" />
            <span className="display text-2xl">{t.brand}</span>
          </Link>
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">{t.footer.rights}</p>
          <p className="mt-1 text-[0.9375rem] text-ink-2">
            <a href={portfolio} className="underline hover:text-ink">
              {t.footer.by}
            </a>
          </p>
        </div>
        <nav aria-label={t.footer.pages}>
          <h2 className="label mb-3">{t.footer.pages}</h2>
          <ul className="space-y-1">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:underline">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.footer.cities}>
          <h2 className="label mb-3">{t.footer.cities}</h2>
          <ul className="space-y-1">
            {cities.map((c) => (
              <li key={c.id}>
                <Link href={`${href(locale, "/properties")}?city=${c.id}`} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:underline">
                  {tr(c.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
