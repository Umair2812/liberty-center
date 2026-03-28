import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <PlaceholderPage
      title="Account"
      description="Sign in, order history, and saved addresses will be available after authentication is wired up."
    />
  );
}
