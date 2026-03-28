import Link from "next/link";
import { featuredProducts } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/home/SectionHeader";

export function FeaturedProducts() {
  return (
    <section className="section-home border-y border-line/70 bg-cream/35">
      <Container>
        <SectionHeader
          eyebrow="Editor's pick"
          title="Featured products"
          description="Pieces our stylists love right now — from statement lawns to elevated everyday kurtas."
          action={
            <Link href="/shop" className="link-elegant text-sm font-medium text-foreground">
              View all
            </Link>
          }
        />

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <ProductGrid
            columnsClassName="grid-cols-2 lg:grid-cols-4"
            className="gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:gap-x-7 lg:gap-y-14"
          >
            {featuredProducts.map((product) => (
              <li key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </li>
            ))}
          </ProductGrid>
        </div>
      </Container>
    </section>
  );
}
