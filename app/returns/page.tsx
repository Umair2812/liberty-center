import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Returns",
};

export default function ReturnsPage() {
  return (
    <PlaceholderPage
      title="Returns"
      description="Return policy and exchange flow — placeholder for legal and ops copy."
    />
  );
}
