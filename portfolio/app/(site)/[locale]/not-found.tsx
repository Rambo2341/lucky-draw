import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Shown for unknown URLs inside a language. Bilingual because not-found has no access to the route's language. */
export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-5 text-5xl font-medium tracking-[-0.045em] sm:text-7xl">Page not found.</h1>
        <p className="mt-5 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <p className="mt-2 max-w-md text-muted" lang="ar" dir="rtl">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/en">Back home</ButtonLink>
          <ButtonLink href="/ar" variant="secondary" lang="ar">
            العودة للرئيسية
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
