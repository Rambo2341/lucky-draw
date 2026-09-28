"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "./mobile-menu";

export function Logo() {
  return (
    <Link href="/" className="group flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium tracking-[-0.02em]" aria-label={`${site.name} — home`}>
      <span aria-hidden className="grid size-7 place-items-center rounded-md bg-fg font-mono text-xs font-semibold text-bg transition-colors group-hover:bg-accent">
        {site.name.charAt(0)}
      </span>
      <span>{site.name}</span>
      <span aria-hidden className="text-subtle">/ dev</span>
    </Link>
  );
}

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        scrolled ? "border-line/80 bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-[4.5rem]">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3.5 text-sm transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden className="absolute inset-x-3.5 bottom-2.5 h-px bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink href="/contact" className="h-10 min-h-10 px-4 text-sm">
              Start a Project
            </ButtonLink>
          </div>
          <MobileMenu pathname={pathname} />
        </div>
      </Container>
    </header>
  );
}
