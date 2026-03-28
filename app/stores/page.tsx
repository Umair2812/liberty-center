import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Stores",
};

export default function StoresPage() {
  return (
    <PlaceholderPage
      title="Stores"
      description="Store locator and boutique addresses — map integration later."
    />
  );
}
