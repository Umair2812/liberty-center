import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return <PlaceholderPage title="Shop" description="Browse all lawn, unstitched, pret, and luxury pieces — catalog integration coming next." />;
}
