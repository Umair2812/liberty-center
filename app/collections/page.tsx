import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <PlaceholderPage
      title="Collections"
      description="Seasonal edits and capsule stories will live here — same elegance as the homepage, with room to explore each drop."
    />
  );
}
