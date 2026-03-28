import Image from "next/image";
import Link from "next/link";
import { promoBanner } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function PromotionalBanner() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute inset-0 bg-foreground" aria-hidden>
        <Image
          src={promoBanner.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-luminosity"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/55"
          aria-hidden
        />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-soft">
              {promoBanner.eyebrow}
            </p>
            <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08] text-background">
              {promoBanner.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-background/80">
              {promoBanner.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={promoBanner.cta.href}
                className="inline-flex h-12 min-w-[160px] items-center justify-center bg-background px-8 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-gold-soft"
              >
                {promoBanner.cta.label}
              </Link>
              {promoBanner.secondaryCta ? (
                <Link
                  href={promoBanner.secondaryCta.href}
                  className="text-sm font-medium text-background/90 underline decoration-background/40 underline-offset-[6px] transition-colors hover:text-background hover:decoration-background"
                >
                  {promoBanner.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
          <div className="relative hidden aspect-[4/5] max-h-[420px] lg:col-span-5 lg:block">
            <div className="absolute inset-0 ring-1 ring-background/20">
              <Image
                src={promoBanner.spotlightImage}
                alt={promoBanner.spotlightAlt}
                fill
                sizes="(max-width: 1024px) 0vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
