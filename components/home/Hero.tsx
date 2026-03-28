import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="group/hero relative w-full overflow-hidden bg-foreground">
      <div className="relative min-h-[min(82dvh,720px)] w-full sm:min-h-[min(86vh,800px)]">
        <Image
          src={heroContent.image}
          alt={heroContent.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_26%] transition-[transform,opacity] duration-[1.6s] ease-out motion-safe:group-hover/hero:scale-[1.025] sm:object-[center_30%]"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-foreground/55 via-foreground/22 to-transparent" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/68 via-foreground/18 to-foreground/8" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/38 via-transparent to-foreground/12 opacity-90" aria-hidden />

        <div className="absolute inset-0 flex flex-col justify-end pb-11 pt-20 sm:pb-14 sm:pt-24 lg:pb-[5.5rem] lg:pt-28">
          <Container>
            <div className="max-w-xl lg:max-w-2xl">
              <h1 className="animate-hero-1 font-display font-medium leading-[1.06] tracking-tight text-background [font-size:var(--text-display)]">
                {heroContent.title}
              </h1>
              <p className="animate-hero-2 mt-4 max-w-md [font-size:var(--text-lead)] leading-[1.6] text-background/85 sm:mt-5">
                {heroContent.description}
              </p>

              <div className="animate-hero-3 mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href={heroContent.primaryCta.href}
                  className="inline-flex h-12 w-full min-h-12 touch-manipulation items-center justify-center bg-background px-8 text-sm font-semibold tracking-wide text-foreground shadow-md transition-all duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] motion-safe:hover:bg-gold-soft motion-safe:hover:shadow-xl motion-safe:active:translate-y-0 motion-safe:active:scale-[0.99] sm:w-auto sm:min-w-[172px]"
                >
                  {heroContent.primaryCta.label}
                </Link>
                <Link
                  href={heroContent.secondaryCta.href}
                  className="inline-flex h-12 w-full min-h-12 touch-manipulation items-center justify-center border border-background/50 bg-background/[0.08] px-8 text-sm font-semibold tracking-wide text-background backdrop-blur-[8px] transition-all duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] motion-safe:hover:border-background/75 motion-safe:hover:bg-background/18 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.99] sm:w-auto sm:min-w-[172px]"
                >
                  {heroContent.secondaryCta.label}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
