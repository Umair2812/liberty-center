"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { formatPkr } from "@/lib/format";
import { showcaseProducts } from "@/data/products";
import { newArrivals, featuredProducts } from "@/data/home";
import type { HomeProduct } from "@/data/home";

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

const filterSections = [
  {
    id: "availability",
    label: "Availability",
    options: ["In Stock", "Out of Stock"],
  },
  {
    id: "wearType",
    label: "Wear Type",
    options: ["Stitched", "Un-Stitched", "Ready to Wear"],
  },
  {
    id: "category",
    label: "Category",
    options: [
      "Lawn",
      "Silk",
      "Chiffon",
      "Cotton",
      "Velvet",
      "Luxury",
      "Pret",
      "Party Wear",
      "Accessories",
    ],
  },
  {
    id: "price",
    label: "Price",
    options: [
      "Under Rs. 5,000",
      "Rs. 5,000 – 15,000",
      "Rs. 15,000 – 30,000",
      "Over Rs. 30,000",
    ],
  },
];

type GridCols = 2 | 4;

export default function ShopPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<GridCols>(4);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [openSections, setOpenSections] = useState<string[]>(["wearType", "category"]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleFilter = (sectionId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[sectionId] ?? [];
      return {
        ...prev,
        [sectionId]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  const sortedProducts = useMemo(() => {
    const list = [...allProducts];
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [sortBy]);

  const clearFilters = () => setActiveFilters({});

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Page Header */}
      <div className="border-b border-[#e8e4e0] bg-white">
        <Container>
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
        </Container>

        {/* Page Title */}
        <div className="pb-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-[#2c2825] uppercase">
            Products
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[4.25rem] z-30 border-b border-[#e8e4e0] bg-white/95 backdrop-blur-sm">
        <Container>
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
              {sortedProducts.length} Products
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
                {activeFilterCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2c2825] text-[9px] text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Product Grid */}
      <Container className="py-10">
        <div
          className={`grid border border-[#e8e4e0] divide-x divide-y divide-[#e8e4e0] ${
            gridCols === 4
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-2"
          }`}
        >
          {sortedProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 flex justify-center">
          <button className="group relative overflow-hidden border border-[#2c2825] px-14 py-3.5 text-[11px] tracking-[0.2em] text-[#2c2825] uppercase transition-colors duration-300 hover:text-white">
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#2c2825] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <span className="relative">Load More</span>
          </button>
        </div>
      </Container>

      {/* Filter Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          filterOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
        onClick={() => setFilterOpen(false)}
        aria-hidden
      />

      {/* Filter Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          filterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#e8e4e0] px-6">
          <h2 className="text-[11px] tracking-[0.25em] text-[#2c2825] uppercase font-semibold">
            Filter
          </h2>
          <div className="flex items-center gap-4">
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-[10px] tracking-[0.15em] text-[#9a9089] uppercase underline underline-offset-2 hover:text-[#2c2825] transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setFilterOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-[#9a9089] hover:text-[#2c2825] transition-colors"
              aria-label="Close filters"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto">
          {filterSections.map((section) => {
            const isOpen = openSections.includes(section.id);
            const selected = activeFilters[section.id] ?? [];
            return (
              <div key={section.id} className="border-b border-[#e8e4e0]">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-[11px] tracking-[0.2em] text-[#2c2825] uppercase font-semibold">
                    {section.label}
                    {selected.length > 0 && (
                      <span className="ml-2 text-[#9a9089]">
                        ({selected.length})
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`text-[#9a9089] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 space-y-3.5">
                    {section.options.map((opt) => {
                      const checked = selected.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex cursor-pointer items-center gap-3 group"
                          onClick={() => toggleFilter(section.id, opt)}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-150 ${
                              checked
                                ? "border-[#2c2825] bg-[#2c2825]"
                                : "border-[#c8c0b8] group-hover:border-[#2c2825]"
                            }`}
                          >
                            {checked && (
                              <svg
                                width="8"
                                height="6"
                                viewBox="0 0 8 6"
                                fill="none"
                              >
                                <path
                                  d="M1 3l2 2 4-4"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span
                            className={`text-[12px] tracking-[0.08em] uppercase transition-colors ${
                              checked
                                ? "text-[#2c2825]"
                                : "text-[#9a9089] group-hover:text-[#2c2825]"
                            }`}
                          >
                            {opt}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View Results Button */}
        <div className="shrink-0 border-t border-[#e8e4e0] p-4">
          <button
            onClick={() => setFilterOpen(false)}
            className="w-full bg-[#2c2825] py-4 text-[11px] tracking-[0.25em] text-white uppercase transition-opacity hover:opacity-85"
          >
            View Results ({sortedProducts.length})
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shop Product Card ──────────────────────────────────────────────────────
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
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
