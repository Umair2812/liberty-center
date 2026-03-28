import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "New arrivals",
};

export default function NewArrivalsPage() {
  return (
    <PlaceholderPage
      title="New arrivals"
      description="A dedicated feed of the latest drops — powered by the same catalog as the homepage cards."
    />
  );
}
