import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <PlaceholderPage
      title="Search"
      description="Full-text and filtered search will plug in here with your product index."
    />
  );
}
