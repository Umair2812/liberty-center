import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Liberty Center order — contact, shipping, and payment.",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
