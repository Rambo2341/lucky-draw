"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getDict, href, type Locale } from "@/demos/velora/lib/i18n";
import { useStore } from "@/demos/velora/lib/store";
import { cn } from "@/demos/velora/lib/cn";
import { Monogram } from "@/demos/velora/components/monogram";

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const pathname = usePathname();
  const { saved } = useStore();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [bump, setBump] = useState(0);
  const prevCount = useRef(saved.length);
  const menuButton = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Animate the holder when a card is added.
  useEffect(() => {
    if (saved.length > prevCount.current) setBump((b) => b + 1);
    prevCount.current = saved.length;
  }, [saved.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const other: Locale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/demos\/velora\/(en|ar)(?=\/|$)/, `/demos/velora/${other}`);

  const links = [
    { href: href(locale, "/properties"), label: t.nav.properties },
    { href: href(locale, "/locations"), label: t.nav.locations },
    { href: href(locale, "/agents"), label: t.nav.agents },
    { href: href(locale, "/about"), label: t.nav.about },
    { href: href(locale, "/contact"), label: t.nav.contact },
  ];
  const isActive = (h: string) => pathname === h || pathname.startsWith(`${h}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-stock">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center gap-2 px-4 sm:gap-6 sm:px-6 lg:h-[4.5rem] lg:px-10">
        <Link href={href(locale)} className="flex min-h-11 items-center gap-2.5" aria-label={`${t.brand} — home`}>
          <Monogram className="size-8" />
          <span className="display text-[1.15rem] tracking-[0.1em] sm:tracking-[0.18em] rtl:tracking-normal">{locale === "ar" ? t.brand : "VELORA"}</span>
        </Link>

        <nav aria-label="Main" className="ms-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center px-3 text-[0.9375rem] transition-colors",
                    isActive(l.href) ? "text-ink underline decoration-1 underline-offset-[0.5em]" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className="inline-flex min-h-11 items-center px-2 text-[0.9375rem] text-ink-2 hover:text-ink sm:px-3"
          >
            {t.nav.switchTo}
          </Link>
          <Link
            href={href(locale, "/favorites")}
            aria-current={isActive(href(locale, "/favorites")) ? "page" : undefined}
            className="group inline-flex min-h-11 items-center gap-2 border border-rule px-2 sm:px-3 text-[0.9375rem] hover:border-ink"
          >
            <HolderIcon />
            <span className="hidden sm:inline">{t.nav.setAside}</span>
            <span
              key={bump}
              className="serial grid min-w-6 place-items-center bg-ink px-1.5 py-0.5 text-[0.7rem] text-stock"
              style={bump ? { animation: "bump 0.5s var(--ease-out)" } : undefined}
              aria-label={`${saved.length}`}
            >
              {saved.length}
            </span>
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="site-menu" className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-paper lg:hidden">
          <nav aria-label="Mobile" className="px-4 py-6 sm:px-6">
            <ul className="border-t border-rule">
              {[{ href: href(locale), label: t.brand }, ...links].map((l) => (
                <li key={l.href} className="border-b border-rule">
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="display flex min-h-16 items-center text-[1.75rem]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

/** A card holder: two stacked cards in a sleeve. */
function HolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <rect x="5" y="3.5" width="13" height="9" rx="1" />
      <rect x="3.5" y="6" width="13" height="9" rx="1" fill="var(--color-stock)" />
      <path d="M2.5 11.5h19v7a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z" fill="var(--color-sand)" />
    </svg>
  );
}
