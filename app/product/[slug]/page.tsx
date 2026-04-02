import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { YouMayAlsoLike } from "@/components/product/YouMayAlsoLike";
import { Container } from "@/components/ui/Container";
import { getProductDetail, getYouMayAlsoLike } from "@/data/productDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProductDetail(slug);
  if (!detail) {
    return { title: "Product" };
  }
  return {
    title: detail.title,
    description: detail.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const detail = getProductDetail(slug);
  if (!detail) {
    notFound();
  }

  const related = getYouMayAlsoLike(slug);

  return (
    <>
      <div className="border-b border-line bg-background pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-11 xl:gap-14">
            <div className="lg:col-span-7">
              <ProductGallery images={detail.images} productTitle={detail.title} />
            </div>
            <div className="lg:col-span-5">
              <ProductPurchasePanel detail={detail} />
            </div>
          </div>
        </Container>
      </div>
      <YouMayAlsoLike products={related} />
    </>
  );
}
