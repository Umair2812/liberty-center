import type { ReactNode } from "react";
import type { HomeProduct } from "@/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { showcaseProducts } from "@/data/products";

type ProductGridProps = {
  /** When set (and `children` is not passed), renders this list as cards. */
  products?: HomeProduct[];
  /** Custom layout: wrap each card in `<li className="min-w-0">`. */
  children?: ReactNode;
  className?: string;
  /** Tailwind column breakpoints; default fits eight showcase items (1 → 2 → 3 → 4 cols). */
  columnsClassName?: string;
};

const DEFAULT_COLUMNS =
  "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

/**
 * Responsive product grid. Pass `children` for manual composition, or `products`, or use defaults —
 * eight showcase products from `@/data/products`.
 */
export function ProductGrid({
  products,
  children,
  className = "",
  columnsClassName = DEFAULT_COLUMNS,
}: ProductGridProps) {
  const gridClass =
    `m-0 grid list-none gap-x-8 gap-y-12 p-0 ${columnsClassName} ${className}`.trim();

  if (children != null) {
    return <ul className={gridClass}>{children}</ul>;
  }

  const list = products ?? showcaseProducts;

  return (
    <ul className={gridClass}>
      {list.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
