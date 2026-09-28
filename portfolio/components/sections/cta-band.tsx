import { getDict, href, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand({ locale, title }: { locale: Locale; title?: string }) {
  const t = getDict(locale).cta;
  return (
    <section aria-labelledby="cta-heading" className="border-t border-line">
      <Container className="py-24 md:py-36">
        <Reveal className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span aria-hidden className="h-px w-6 bg-accent" />
              {t.eyebrow}
            </p>
            <h2 id="cta-heading" className="max-w-3xl text-balance text-[2.5rem] font-medium leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {title ?? t.title}
            </h2>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted sm:text-lg">{t.lede}</p>
          </div>
          <ButtonLink href={href(locale, "/contact")} arrow className="h-14 shrink-0 px-7 text-base">
            {t.button}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
