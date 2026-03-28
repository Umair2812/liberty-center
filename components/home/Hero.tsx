import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-[min(88vh,780px)] overflow-hidden bg-foreground">
      <Image
        src={heroContent.image}
        alt={heroContent.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%] opacity-[0.92]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-foreground/90 via-foreground/45 to-foreground/25"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-90" aria-hidden />

      <div className="relative flex min-h-[min(88vh,780px)] flex-col justify-end pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-28 lg:pt-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-soft">
              {heroContent.eyebrow}
            </p>
            <h1 className="font-display mt-5 text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.05] tracking-tight text-background whitespace-pre-line">
              {heroContent.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-background/88 sm:text-lg sm:leading-relaxed">
              {heroContent.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href={heroContent.primaryCta.href}
                className="inline-flex h-12 min-w-[188px] items-center justify-center bg-background px-8 text-sm font-semibold tracking-wide text-foreground shadow-sm transition-all duration-300 hover:bg-gold-soft hover:shadow-md"
              >
                {heroContent.primaryCta.label}
              </Link>
              <Link
                href={heroContent.secondaryCta.href}
                className="inline-flex h-12 min-w-[188px] items-center justify-center border border-background/55 bg-background/5 px-8 text-sm font-medium text-background backdrop-blur-[2px] transition-all duration-300 hover:border-background/80 hover:bg-background/15"
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
