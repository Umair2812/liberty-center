import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ");
  return { title: label.charAt(0).toUpperCase() + label.slice(1) };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ");

  return (
    <PlaceholderPage
      title={label.charAt(0).toUpperCase() + label.slice(1)}
      description="Product gallery, sizes, add to bag, and related items will ship with your commerce API."
    />
  );
}
