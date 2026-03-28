import { Container } from "@/components/ui/Container";

/**
 * Minimal placeholder — centered copy only, matches site container width.
 */
export function ComingSoon() {
  return (
    <section className="flex w-full min-h-[min(60vh,480px)] items-center justify-center px-6 py-20 sm:py-24 lg:py-28">
      <Container>
        <p className="text-center font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Coming Soon
        </p>
      </Container>
    </section>
  );
}
