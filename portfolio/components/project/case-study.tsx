import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectChallenge, ProjectFeature } from "@/data/projects";
import { getDict, href, tr, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { BrowserFrame, PhoneFrame } from "./frames";
import { ProjectCover, visuals } from "./project-visuals";

export function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-5 py-12 md:grid-cols-[1fr_2fr] md:gap-12 md:py-16">
      <Reveal>
        <h2 className="text-sm font-medium text-fg md:sticky md:top-28">
          <span aria-hidden className="me-3 inline-block h-px w-5 translate-y-[-0.25em] bg-accent align-middle" />
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.05} className="max-w-2xl text-pretty text-lg leading-relaxed text-fg/85">
        {children}
      </Reveal>
    </section>
  );
}

export function FeatureGrid({ features, locale }: { features: ProjectFeature[]; locale: Locale }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {features.map((f) => (
        <li key={f.title.en} className="bg-bg p-6">
          <h3 className="text-base font-medium">{tr(f.title, locale)}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{tr(f.body, locale)}</p>
        </li>
      ))}
    </ul>
  );
}

export function ChallengeList({ items, locale }: { items: ProjectChallenge[]; locale: Locale }) {
  const t = getDict(locale).cs;
  return (
    <ol className="space-y-8">
      {items.map((c, i) => (
        <li key={c.challenge.en} className="grid gap-4 sm:grid-cols-2 sm:gap-8">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
              {t.challenge} {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-base leading-relaxed">{tr(c.challenge, locale)}</p>
          </div>
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">{t.solution}</p>
            <p className="mt-2 text-base leading-relaxed text-muted">{tr(c.solution, locale)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ShowcaseHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[1fr_2fr] md:gap-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">{title}</h2>
        {children && <div className="mt-4 text-pretty leading-relaxed text-muted md:text-lg">{children}</div>}
      </div>
    </Reveal>
  );
}

/** Large desktop screenshot — real images if configured, otherwise the coded preview. */
export function DesktopView({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDict(locale).cs;
  const set = visuals[project.visual];
  const Desktop = set.desktop;
  const shots = project.images?.filter((img) => img.kind === "desktop") ?? [];
  if (!Desktop && shots.length === 0) return null;
  return (
    <section className="border-y border-line bg-bg-2 py-20 md:py-32">
      <Container>
        <ShowcaseHeading eyebrow={t.screenshots} title={t.desktopTitle}>
          {shots.length > 0 ? t.desktopShots : t.desktopCoded}
        </ShowcaseHeading>
        <div className="space-y-10">
          {shots.length > 0
            ? shots.map((img) => (
                <Reveal key={img.src}>
                  <BrowserFrame url={set.url} className="mx-auto max-w-6xl">
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1200px) 1152px, 100vw" className="h-auto w-full" />
                  </BrowserFrame>
                </Reveal>
              ))
            : Desktop && (
                <Reveal>
                  <BrowserFrame url={set.url} className="mx-auto max-w-6xl">
                    <Desktop />
                  </BrowserFrame>
                </Reveal>
              )}
        </div>
      </Container>
    </section>
  );
}

export function MobileViews({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDict(locale).cs;
  const set = visuals[project.visual];
  const mobileShots = project.images?.filter((img) => img.kind === "mobile") ?? [];
  return (
    <section className={set.desktop ? "py-20 md:py-32" : "border-y border-line bg-bg-2 py-20 md:py-32"}>
      <Container>
        <ShowcaseHeading eyebrow={set.desktop ? t.mobileViews : t.screens} title={set.desktop ? t.responsiveTitle : t.mobileScreens}>
          {tr(project.caseStudy.responsive, locale)}
        </ShowcaseHeading>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {mobileShots.map((img, i) => (
            <Reveal key={img.src} delay={0.08 * i} className="w-[min(78vw,300px)]">
              <figure>
                <PhoneFrame>
                  <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="300px" className="h-auto w-full" />
                </PhoneFrame>
                <figcaption className="mt-5 text-center text-sm text-muted">{img.alt}</figcaption>
              </figure>
            </Reveal>
          ))}
          {mobileShots.length === 0 &&
            set.mobile.map(({ component: M, label, tone }, i) => (
              <Reveal key={label} delay={0.08 * i} className="w-[min(78vw,300px)]">
                <figure>
                  <PhoneFrame tone={tone}>
                    <M />
                  </PhoneFrame>
                  <figcaption className="mt-5 text-center text-sm text-muted" dir="ltr">
                    {label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  );
}

export function NextProject({ project, locale }: { project: Project; locale: Locale }) {
  const t = getDict(locale).cs;
  return (
    <section className="border-t border-line">
      <Container className="py-20 md:py-28">
        <Link href={href(locale, `/work/${project.slug}`)} className="group grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{t.next}</p>
            <p className="mt-4 flex items-center gap-4 text-4xl font-medium tracking-[-0.045em] transition-colors group-hover:text-accent sm:text-6xl">
              <span dir="ltr">{project.name}</span>
              <ArrowUpRight aria-hidden className="size-8 shrink-0 transition-transform duration-500 group-hover:rotate-45 sm:size-12 rtl:-scale-x-100" />
            </p>
            <p className="mt-3 text-muted">{tr(project.category, locale)}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line transition-colors group-hover:border-subtle">
            <ProjectCover project={project} locale={locale} />
          </div>
        </Link>
      </Container>
    </section>
  );
}
