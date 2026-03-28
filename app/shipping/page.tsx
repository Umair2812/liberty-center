import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Shipping",
};

export default function ShippingPage() {
  return (
    <PlaceholderPage
      title="Shipping"
      description="Delivery zones, timelines, and courier partners — content placeholder."
    />
  );
}
