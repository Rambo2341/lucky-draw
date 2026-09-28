import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AvailabilityBadge } from "@/components/ui/tag";
import { BrowserFrame, PhoneFrame } from "@/components/project/frames";
import { OrbitDesktop } from "@/components/project/previews/orbit";
import { FlowfinDashboard } from "@/components/project/previews/flowfin";

/** Higgsfield hero image (see HIGGSFIELD_ASSETS.md). Falls back to a CSS backdrop if the file is absent. */
const HERO_SRC = "/images/hero-studio.jpg";
const hasHeroImage = existsSync(join(process.cwd(), "public", HERO_SRC));

const capabilities = ["Websites", "Web applications", "Mobile apps", "Ecommerce", "SaaS dashboards"];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 md:pt-[4.5rem]">
      <div className="enter-fade absolute inset-0 -z-10" style={delay(100)}>
        {hasHeroImage ? (
          <Image
            src={HERO_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] opacity-60 md:opacity-100"
          />
        ) : (
          <HeroBackdrop />
        )}
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

/**
 * Backdrop used until the Higgsfield hero photograph is added: two of the
 * portfolio's own coded interfaces, set quietly into the dark background.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="hairline-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_75%_45%,black,transparent)]" />
      <div className="absolute right-[-10%] top-1/2 aspect-square w-[70vw] max-w-[900px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,107,58,0.08),transparent_60%)]" />
      <div className="absolute right-[-4%] top-1/2 hidden w-[46%] max-w-[760px] -translate-y-[55%] opacity-80 [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:block">
        <BrowserFrame url="app.orbit.team">
          <OrbitDesktop />
        </BrowserFrame>
      </div>
      <div className="absolute right-[6%] top-[58%] hidden w-[13%] max-w-[210px] -translate-y-1/2 lg:block">
        <PhoneFrame>
          <FlowfinDashboard />
        </PhoneFrame>
      </div>
    </div>
  );
}
