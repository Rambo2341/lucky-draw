"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, site, getSocialLinks } from "@/data/site";
import { getDict, href, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AvailabilityBadge } from "@/components/ui/tag";

export function MobileMenu({ locale, pathname }: { locale: Locale; pathname: string }) {
  const t = getDict(locale);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const socials = getSocialLinks();
  const links = [{ label: t.nav.home, href: href(locale) }, ...navItems.map((i) => ({ label: t.nav[i.key], href: href(locale, i.href) }))];

  // Close when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      // Keep keyboard focus inside the menu while it is open.
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [buttonRef.current, ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href]"))].filter(
          (el): el is HTMLElement => Boolean(el),
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        className="relative grid size-11 place-items-center rounded-full border border-line bg-bg-2 text-fg"
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span className={cn("absolute left-0 h-px w-4 bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0.5")} />
          <span className={cn("absolute left-0 h-px w-4 bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-2.5")} />
        </span>
      </button>

      {/* Portalled to <body> so the header's backdrop-filter can't clip the fixed overlay.
          Only rendered after a click, so server and client markup always match. */}
      {open &&
        createPortal(
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            dir={locale === "ar" ? "rtl" : "ltr"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg px-5 pb-8 pt-24 sm:px-8"
          >
            <nav aria-label={t.nav.menu}>
              <ul className="border-t border-line">
                {links.map((item, i) => {
                  const active = item.href === href(locale) ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-16 items-center justify-between text-[2rem] font-medium tracking-[-0.03em]"
                      >
                        <span className={active ? "text-fg" : "text-muted"}>{item.label}</span>
                        <span aria-hidden className="font-mono text-xs text-subtle">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-auto space-y-6 pt-10">
              <Link
                href={href(locale, "/contact")}
                onClick={() => setOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-fg text-[0.9375rem] font-medium text-bg"
              >
                {t.nav.start}
              </Link>
              <div className="flex flex-wrap items-center justify-between gap-4">
                {site.availability.available && <AvailabilityBadge label={t.availability} />}
                {socials.length > 0 && (
                  <ul className="flex gap-4 text-sm text-muted">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} className="inline-flex min-h-11 items-center hover:text-fg">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>,
          document.body,
        )}
    </div>
  );
}
