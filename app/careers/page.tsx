import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <PlaceholderPage
      title="Careers"
      description="Open roles and culture page — placeholder."
    />
  );
}
