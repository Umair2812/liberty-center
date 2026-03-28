import Image from "next/image";
import Link from "next/link";
import { formatPkr } from "@/lib/format";
import type { HomeProduct } from "@/types";

type ProductCardProps = {
  product: HomeProduct;
  className?: string;
};

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const hasSwap = Boolean(product.hoverImage);

  return (
    <article
      className={`group/card flex flex-col overflow-hidden rounded-xl bg-background shadow-[0_2px_20px_rgba(44,40,37,0.05)] ring-1 ring-line/50 transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_16px_44px_rgba(44,40,37,0.11)] motion-safe:hover:ring-gold/20 ${className}`.trim()}
    >
      <Link
        href={product.href}
        className="block min-w-0 rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          {hasSwap ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="z-[1] object-cover transition-opacity duration-500 ease-out group-hover/card:opacity-0"
              />
              <Image
                src={product.hoverImage!}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
                aria-hidden
              />
            </>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/card:scale-[1.06]"
            />
          )}

          {product.badge ? (
            <span className="pointer-events-none absolute left-3 top-3 z-20 rounded bg-background/93 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm ring-1 ring-line/80 transition-transform duration-300 motion-safe:group-hover/card:scale-[1.02]">
              {product.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 px-3.5 pb-1 pt-4 sm:px-5 sm:pt-5">
          <h3 className="font-display text-[length:var(--text-body-lg)] font-medium leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover/card:text-gold sm:text-lg">
            {product.name}
          </h3>
          <p className="text-sm font-medium tabular-nums tracking-tight text-foreground/78 transition-colors duration-300 group-hover/card:text-foreground/90">
            {formatPkr(product.price)}
          </p>
        </div>
      </Link>

      <div className="mt-auto px-3.5 pb-4 pt-1 sm:px-5 sm:pb-5">
        <button
          type="button"
          className="w-full min-h-11 touch-manipulation rounded-lg border border-line/90 bg-background py-2.5 text-[13px] font-medium tracking-wide text-foreground shadow-[0_1px_3px_rgba(44,40,37,0.05)] transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/25 motion-safe:hover:bg-foreground motion-safe:hover:text-background motion-safe:hover:shadow-[0_6px_20px_rgba(44,40,37,0.14)] motion-safe:active:translate-y-0"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
