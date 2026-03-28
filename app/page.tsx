import { EditorialSection } from "@/components/home/EditorialSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Newsletter } from "@/components/home/Newsletter";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { TrustStrip } from "@/components/home/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ShopByCategory />
      <FeaturedCollections />
      <NewArrivals />
      <EditorialSection />
      <Newsletter />
    </>
  );
}
