import Link from "next/link";
import { featuredProducts } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/home/SectionHeader";

export function FeaturedProducts() {
  return (
    <section className="border-y border-line/80 bg-cream/40 py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Editor's pick"
          title="Featured products"
          description="Pieces our stylists love right now — from statement lawns to elevated everyday kurtas."
          action={
            <Link
              href="/shop"
              className="inline-flex text-sm font-medium text-foreground underline decoration-gold/45 underline-offset-[6px] transition-colors duration-300 hover:text-gold hover:decoration-gold"
            >
              View all
            </Link>
          }
        />

        <div className="mt-12 lg:mt-16">
          <ProductGrid className="gap-x-4 gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-14">
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
