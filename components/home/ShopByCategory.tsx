import Image from "next/image";
import Link from "next/link";
import { homeCategories } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/home/SectionHeader";

export function ShopByCategory() {
  return (
    <section id="categories" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Categories"
          title="Shop by category"
          description="From breathable lawns to statement pret — find your next favorite silhouette."
          action={
            <Link
              href="/shop"
              className="inline-flex text-sm font-medium text-foreground underline decoration-gold/45 underline-offset-[6px] transition-colors duration-300 hover:text-gold hover:decoration-gold"
            >
              View all
            </Link>
          }
        />

        <div className="mt-12 grid grid-flow-col grid-rows-1 gap-3 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid-flow-row sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:mt-16 lg:grid-cols-5 lg:gap-4 [&::-webkit-scrollbar]:hidden">
          {homeCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group relative w-[min(72vw,220px)] shrink-0 overflow-hidden sm:w-auto"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-xl font-medium text-background sm:text-2xl">
                    {cat.label}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-background/75">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
