import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Our story",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="Our story"
      description="Brand narrative, atelier imagery, and values — placeholder until editorial content is ready."
    />
  );
}
