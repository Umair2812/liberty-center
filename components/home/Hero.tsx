import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/home";

export function Hero() {
  return (
    <section className="relative min-h-[min(92vh,820px)] overflow-hidden bg-foreground">
      <Image
        src={heroContent.image}
        alt={heroContent.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] opacity-90"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/35 to-foreground/20"
        aria-hidden
      />
      <div className="relative flex min-h-[min(92vh,820px)] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft">
            {heroContent.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-[14ch] text-4xl font-medium leading-[1.05] text-background sm:text-5xl lg:text-6xl lg:leading-[1.02] whitespace-pre-line">
            {heroContent.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-background/85 sm:text-base">
            {heroContent.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={heroContent.primaryCta.href}
              className="inline-flex h-12 min-w-[180px] items-center justify-center bg-background px-8 text-sm font-medium text-foreground transition-all duration-300 hover:bg-gold-soft hover:text-foreground"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="inline-flex h-12 min-w-[180px] items-center justify-center border border-background/50 px-8 text-sm font-medium text-background transition-all duration-300 hover:border-background hover:bg-background/10"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
