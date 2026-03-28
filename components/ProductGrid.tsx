import type { ReactNode } from "react";

type ProductGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Responsive product grid — pass {@link ProductCard} items as children.
 */
export function ProductGrid({ children, className = "" }: ProductGridProps) {
  return (
    <ul
      className={`grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 ${className}`.trim()}
    >
      {children}
    </ul>
  );
}
