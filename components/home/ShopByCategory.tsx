import Image from "next/image";
import Link from "next/link";
import { homeCategories } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function ShopByCategory() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Categories
            </p>
            <h2 className="font-display mt-2 text-3xl font-medium text-foreground sm:text-4xl">
              Shop by edit
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-foreground underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold hover:decoration-gold"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {homeCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative min-w-[200px] flex-1 overflow-hidden sm:min-w-0"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-background">
                  <p className="font-display text-xl font-medium">{cat.label}</p>
                  <p className="mt-0.5 text-xs text-background/80">{cat.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
