import Image from "next/image";
import Link from "next/link";
import { homeCategories } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/home/SectionHeader";

export function ShopByCategory() {
  return (
    <section id="categories" className="section-home scroll-mt-[4.5rem] sm:scroll-mt-20">
      <Container>
        <SectionHeader
          eyebrow="Categories"
          title="Shop by category"
          description="Unstitched yardage, stitched pret, luxury edits, and party-ready silhouettes — all in one place."
          action={
            <Link href="/shop" className="link-elegant text-sm font-medium text-foreground">
              View all
            </Link>
          }
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {homeCategories.map((cat) => (
            <li key={cat.slug} className="min-w-0">
              <Link
                href={cat.href}
                className="group relative block overflow-hidden rounded-lg bg-cream shadow-[0_2px_16px_rgba(44,40,37,0.04)] ring-1 ring-line/70 transition-all duration-500 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_12px_36px_rgba(44,40,37,0.1)] motion-safe:hover:ring-gold/25"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-foreground/78 via-foreground/18 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="font-display text-[length:var(--text-h3)] font-medium tracking-tight text-background transition-transform duration-500 ease-out motion-safe:group-hover:translate-y-[-2px]">
                      {cat.label}
                    </p>
                    {cat.tagline ? (
                      <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-background/80 transition-opacity duration-300 group-hover:text-background/95">
                        {cat.tagline}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
