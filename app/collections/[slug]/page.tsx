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

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ");

  return (
    <PlaceholderPage
      title={label.charAt(0).toUpperCase() + label.slice(1)}
      description="Collection lookbook, story, and shoppable products will be added with your backend."
    />
  );
}
