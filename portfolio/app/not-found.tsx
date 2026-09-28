import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
        <h1 className="mt-5 text-5xl font-medium tracking-[-0.045em] sm:text-7xl">Page not found.</h1>
        <p className="mt-5 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
