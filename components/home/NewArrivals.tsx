import Link from "next/link";
import { newArrivals } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";

export function NewArrivals() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Just in
            </p>
            <h2 className="font-display mt-2 text-3xl font-medium text-foreground sm:text-4xl">
              New arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="text-sm font-medium text-foreground underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold"
          >
            See everything new
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
