"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import { ProductGalleryLightbox } from "@/components/product/ProductGalleryLightbox";

type ProductGalleryProps = {
  images: string[];
  productTitle: string;
};

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-3.5">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            suppressHydrationWarning
            className="group animate-pdp-gallery-cell relative aspect-[3/4] w-full cursor-pointer overflow-hidden border-0 bg-cream p-0 text-left shadow-none outline-none ring-0 transition-[box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            style={{ "--pdp-stagger": i } as CSSProperties}
            onClick={() => setLightbox({ open: true, index: i })}
            aria-label={`View larger — ${productTitle}, image ${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${productTitle} — view ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 50vw, 38vw"
              className="pointer-events-none object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
              priority={i < 2}
            />
          </button>
        ))}
      </div>

      <ProductGalleryLightbox
        open={lightbox.open}
        initialIndex={lightbox.index}
        onClose={() => setLightbox((s) => ({ ...s, open: false }))}
        images={images}
        productTitle={productTitle}
      />
    </>
  );
}
