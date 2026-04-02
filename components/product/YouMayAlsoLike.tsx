import type { HomeProduct } from "@/types";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";

type YouMayAlsoLikeProps = {
  products: HomeProduct[];
};

export function YouMayAlsoLike({ products }: YouMayAlsoLikeProps) {
  if (products.length === 0) return null;

  return (
    <section className="section-home border-t border-line/70 bg-background">
      <Container>
        <h2 className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
          You may also like
        </h2>
        <ProductGrid
          products={products}
          columnsClassName="grid-cols-2 lg:grid-cols-4"
          className="mt-10 gap-x-3 gap-y-10 sm:mt-12 sm:gap-x-5 sm:gap-y-12 lg:mt-14 lg:gap-x-7 lg:gap-y-14"
        />
      </Container>
    </section>
  );
}
