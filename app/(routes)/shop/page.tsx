"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { formatPkr } from "@/lib/format";
import { showcaseProducts } from "@/data/products";
import { newArrivals, featuredProducts } from "@/data/home";
import type { HomeProduct } from "@/data/home";
import {
  FilterDrawer,
  type FilterState,
  defaultFilterState,
  activeFilterCount,
  applyFilters,
} from "@/components/ui/FilterDrawer";

// Combine all products into one big list
const allProducts: HomeProduct[] = [
  ...featuredProducts,
  ...newArrivals,
  ...showcaseProducts,
  ...featuredProducts.map((p) => ({ ...p, id: p.id + "-b" })),
  ...newArrivals.map((p) => ({ ...p, id: p.id + "-b" })),
  ...showcaseProducts.map((p) => ({ ...p, id: p.id + "-b" })),
  ...featuredProducts.map((p) => ({ ...p, id: p.id + "-c" })),
  ...newArrivals.map((p) => ({ ...p, id: p.id + "-c" })),
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

type GridCols = 2 | 4;

export default function ShopPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<GridCols>(4);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);

  const filterCount = activeFilterCount(filters);

  const displayed = useMemo(() => {
    const sorted = [...allProducts];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return applyFilters(sorted, filters);
  }, [sortBy, filters]);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Page Header */}
      <div className="border-b border-[#e8e4e0] bg-white">
        <div className="px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 pt-5 pb-4 text-[11px] tracking-[0.15em] text-[#9a9089] uppercase">
            <Link href="/" className="hover:text-[#2c2825] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#9a9089]">Shop</span>
            <span>/</span>
            <span className="text-[#2c2825]">Products</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="pb-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-[#2c2825] uppercase">
            Products
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[4.25rem] z-30 border-b border-[#e8e4e0] bg-white/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Grid View Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridCols(4)}
                aria-label="4-column grid"
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  gridCols === 4
                    ? "text-[#2c2825]"
                    : "text-[#b0a89e] hover:text-[#2c2825]"
                }`}
              >
                <Grid4Icon />
              </button>
              <button
                onClick={() => setGridCols(2)}
                aria-label="2-column grid"
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  gridCols === 2
                    ? "text-[#2c2825]"
                    : "text-[#b0a89e] hover:text-[#2c2825]"
                }`}
              >
                <Grid2Icon />
              </button>
            </div>

            {/* Product Count */}
            <p className="text-[11px] tracking-[0.18em] text-[#9a9089] uppercase">
              {displayed.length} Products
            </p>

            {/* Sort & Filter */}
            <div className="flex items-center gap-5">
              <div className="relative hidden sm:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-5 text-[11px] tracking-[0.15em] text-[#2c2825] uppercase cursor-pointer focus:outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Sort By: {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#9a9089]" />
              </div>

              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#2c2825] uppercase transition-colors hover:text-[#9a9089]"
              >
                Filter
                {filterCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2c2825] text-[9px] text-white">
                    {filterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="py-6 px-4 sm:px-6">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[13px] tracking-[0.15em] text-[#9a9089] uppercase">
              No products match your filters
            </p>
            <button
              onClick={() => setFilters(defaultFilterState)}
              className="mt-4 text-[11px] tracking-[0.15em] text-[#2c2825] underline underline-offset-2 uppercase"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid border border-[#e8e4e0] divide-x divide-y divide-[#e8e4e0] ${
              gridCols === 4
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-2"
            }`}
          >
            {displayed.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {displayed.length > 0 && (
          <div className="mt-16 flex justify-center">
            <button className="group relative overflow-hidden border border-[#2c2825] px-14 py-3.5 text-[11px] tracking-[0.2em] text-[#2c2825] uppercase transition-colors duration-300 hover:text-white">
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#2c2825] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <span className="relative">Load More</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={displayed.length}
      />
    </div>
  );
}

// ─── Shop Product Card ───────────────────────────────────────────────────────
function ShopProductCard({ product }: { product: HomeProduct }) {
  const hasSwap = Boolean(product.hoverImage);
  return (
    <article className="group/card relative bg-white">
      <Link href={product.href} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f2ef]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 ease-out ${
              hasSwap
                ? "group-hover/card:opacity-0"
                : "group-hover/card:scale-105"
            }`}
          />
          {hasSwap && (
            <Image
              src={product.hoverImage!}
              alt=""
              fill
              aria-hidden
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
            />
          )}
          {product.badge && (
            <span className="absolute left-3 top-3 bg-white px-2 py-0.5 text-[9px] tracking-[0.15em] font-semibold uppercase text-[#2c2825]">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          <p className="line-clamp-2 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#9a9089] leading-relaxed">
            {product.name}
          </p>
          <p className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-[#2c2825]">
            {product.category}
          </p>
          <p className="mt-1 text-[11px] sm:text-[12px] font-medium tabular-nums text-[#2c2825]">
            {formatPkr(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────
function Grid4Icon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="1" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="10" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="10" width="7" height="7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function Grid2Icon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="16" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="1" width="7" height="16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
