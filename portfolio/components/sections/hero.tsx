import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AvailabilityBadge } from "@/components/ui/tag";
import heroImage from "@/public/images/hero-studio.jpg";

const capabilities = ["Websites", "Web applications", "Mobile apps", "Ecommerce", "SaaS dashboards"];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 md:pt-[4.5rem]">
      <div className="enter-fade absolute inset-0 -z-10" style={delay(100)}>
        <Image
          src={heroImage}
          alt=""
          priority
          placeholder="blur"
          sizes="100vw"
          className="size-full object-cover object-[72%_center] opacity-60 md:opacity-100"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent md:via-bg/40" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Container className="flex flex-1 flex-col justify-center py-16 md:py-24">
        <div className="max-w-[46rem]">
          {site.availability.available && (
            <div className="enter" style={delay(0)}>
              <AvailabilityBadge label={site.availability.label} />
            </div>
          )}
          <p className="enter mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted" style={delay(80)}>
            {site.role}
          </p>
          <h1 className="mt-5 text-balance text-[2.625rem] font-medium leading-[1] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="enter block" style={delay(140)}>
              I build digital products
            </span>
            <span className="enter block text-muted" style={delay(220)}>
              that feel as good <span className="text-fg">as they work.</span>
            </span>
          </h1>
          <p className="enter mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg" style={delay(320)}>
            Modern websites, web applications and cross-platform mobile apps — designed with care and built with clean, fast,
            responsive code.
          </p>
          <div className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(400)}>
            <ButtonLink href="/work" arrow className="h-12 px-6">
              View My Work
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" className="h-12 px-6">
              Let’s Work Together
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="enter border-t border-line/70" style={delay(520)}>
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5 text-sm text-muted">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">I build</span>
          {capabilities.map((c) => (
            <span key={c} className="flex items-center gap-2">
              <span aria-hidden className="size-1 rounded-full bg-accent" />
              {c}
            </span>
          ))}
        </Container>
      </div>
    </section>
  );
}
