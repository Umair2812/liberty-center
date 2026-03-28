import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Size guide",
};

export default function SizeGuidePage() {
  return (
    <PlaceholderPage
      title="Size guide"
      description="Measurement charts and fit notes per category will live here."
    />
  );
}
