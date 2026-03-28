import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholders/PlaceholderPage";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = category.replace(/-/g, " ");
  return { title: label.charAt(0).toUpperCase() + label.slice(1) };
}

export default async function ShopCategoryPage({ params }: Props) {
  const { category } = await params;
  const label = category.replace(/-/g, " ");

  return (
    <PlaceholderPage
      title={label.charAt(0).toUpperCase() + label.slice(1)}
      description="Category filters, sorting, and product grid will appear here once the catalog is connected."
    />
  );
}
