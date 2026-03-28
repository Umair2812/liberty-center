import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Sale",
};

export default function SalePage() {
  return (
    <PlaceholderPage
      title="Sale"
      description="Markdowns and end-of-season edits will list here once pricing rules are connected."
    />
  );
}
