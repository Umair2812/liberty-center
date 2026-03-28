import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Newsletter } from "@/components/Newsletter";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";

/**
 * Homepage sections (global site footer is rendered in `app/layout.tsx`).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <NewArrivals />
      <PromotionalBanner />
      <Newsletter />
    </>
  );
}
