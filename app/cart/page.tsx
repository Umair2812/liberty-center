import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <PlaceholderPage
      title="Your bag"
      description="Cart persistence, promo codes, and checkout will connect when you're ready to integrate payments."
    />
  );
}
