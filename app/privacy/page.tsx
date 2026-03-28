import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy policy"
      description="Legal privacy copy will replace this placeholder."
    />
  );
}
