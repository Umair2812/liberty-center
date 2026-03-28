import Link from "next/link";
import { newArrivals } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/home/SectionHeader";

export function NewArrivals() {
  return (
    <section className="section-home">
      <Container>
        <SectionHeader
          eyebrow="Just in"
          title="New arrivals"
          description="Fresh drops each week — limited quantities on select capsules."
          action={
            <Link href="/new-arrivals" className="link-elegant text-sm font-medium text-foreground">
              See everything new
            </Link>
          }
        />

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <ProductGrid
            columnsClassName="grid-cols-2 lg:grid-cols-4"
            className="gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 lg:gap-x-7 lg:gap-y-14"
          >
            {newArrivals.map((product) => (
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
