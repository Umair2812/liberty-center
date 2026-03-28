import Image from "next/image";
import Link from "next/link";
import { promoBanner } from "@/data/home";

export function PromotionalBanner() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#2c2825] text-background"
      aria-labelledby="promo-banner-heading"
    >
      <div className="grid w-full lg:min-h-[min(52vh,600px)] lg:grid-cols-2">
        {/* Image — full-width band on mobile; split panel on desktop */}
        <div className="relative order-1 aspect-[16/10] max-h-[380px] w-full overflow-hidden sm:aspect-[21/9] sm:max-h-[420px] lg:order-2 lg:aspect-auto lg:max-h-none lg:min-h-[min(52vh,600px)]">
          <Image
            src={promoBanner.image}
            alt={promoBanner.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_25%] motion-safe:animate-promo-kenburns"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#2c2825]/90 via-transparent to-[#2c2825]/20 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#2c2825]/35"
            aria-hidden
          />
        </div>

        {/* Copy — full-width block on mobile; padded column on desktop */}
        <div className="order-2 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:py-20 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-10 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <p className="animate-promo-fade-up text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-soft sm:text-[11px]">
            Limited offer
          </p>
          <h2
            id="promo-banner-heading"
            className="animate-promo-fade-up-delay-1 font-display mt-3 text-[clamp(1.875rem,4.2vw,3.125rem)] font-medium leading-[1.08] tracking-tight sm:mt-4"
          >
            {promoBanner.title}
          </h2>
          <p className="animate-promo-fade-up-delay-2 mt-4 font-display text-[clamp(1.35rem,2.8vw,2rem)] font-medium tracking-tight text-gold sm:mt-5">
            {promoBanner.offer}
          </p>
          <p className="animate-promo-fade-up-delay-2 mt-3 max-w-md text-[length:var(--text-body)] leading-relaxed text-background/78 sm:mt-4 sm:text-[length:var(--text-body-lg)] sm:leading-[1.65]">
            {promoBanner.description}
          </p>
          <div className="animate-promo-fade-up-delay-3 mt-9 sm:mt-10">
            <Link
              href={promoBanner.cta.href}
              className="inline-flex h-12 min-h-12 min-w-[200px] touch-manipulation items-center justify-center bg-background px-10 text-sm font-semibold tracking-wide text-foreground shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:bg-gold-soft motion-safe:hover:shadow-[0_10px_36px_rgba(0,0,0,0.22)] motion-safe:active:translate-y-0 motion-safe:active:scale-[0.99]"
            >
              {promoBanner.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
