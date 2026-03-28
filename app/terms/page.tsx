import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms of use"
      description="Terms and conditions — placeholder for your legal team."
    />
  );
}
