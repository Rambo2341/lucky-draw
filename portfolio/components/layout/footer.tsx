import Link from "next/link";
import { navItems, site, getSocialLinks } from "@/data/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  const socials = getSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <p className="text-lg font-medium tracking-[-0.02em]">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">Pages</p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">Contact</p>
          <ul className="space-y-1">
            <li>
              <Link href="/contact" className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-fg">
                Start a project
              </Link>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>Designed and built with Next.js.</p>
      </Container>
    </footer>
  );
}
