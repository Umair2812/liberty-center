import Image from "next/image";
import Link from "next/link";
import { formatPkr } from "@/lib/format";
import type { HomeProduct } from "@/data/home";

type ProductCardProps = {
  product: HomeProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={product.href}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <article className="flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {product.badge ? (
            <span className="absolute left-3 top-3 bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground ring-1 ring-line">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            {product.category}
          </p>
          <h3 className="text-base font-medium text-foreground transition-colors duration-300 group-hover:text-gold">
            {product.name}
          </h3>
          <p className="text-sm text-foreground/90">{formatPkr(product.price)}</p>
        </div>
      </article>
    </Link>
  );
}
