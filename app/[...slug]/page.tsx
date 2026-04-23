"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { formatPkr } from "@/lib/format";
import {
  getProductsBySlug,
  slugLabels,
  slugParent,
  type CatalogProduct,
} from "@/data/catalog";
import {
  FilterDrawer,
  type FilterState,
  defaultFilterState,
  activeFilterCount,
  applyFilters,
} from "@/components/ui/FilterDrawer";

// ─── Types ──────────────────────────────────────────────────────────────────
type GridCols = 2 | 4;
type SortKey =
  | "featured"
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "date-old"
  | "date-new";

const sortOpts: { value: SortKey; label: string }[] = [
  { value: "featured",    label: "Featured" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc",   label: "Price, Low to High" },
  { value: "price-desc",  label: "Price, High to Low" },
  { value: "date-old",    label: "Date, Old to New" },
  { value: "date-new",    label: "Date, New to Old" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CatalogPage() {
  const params = useParams();
  const rawSlug = Array.isArray(params.slug) ? params.slug.join("/") : (params.slug ?? "");

  const products = useMemo(() => getProductsBySlug(rawSlug), [rawSlug]);
  const pageTitle = slugLabels[rawSlug] ?? "Products";
  const parentSlug = slugParent[rawSlug] ?? null;
  const parentLabel = parentSlug ? (slugLabels[parentSlug] ?? parentSlug) : null;

  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [gridCols, setGridCols] = useState<GridCols>(4);
  const [mounted, setMounted] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, [rawSlug]);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-asc":   list.sort((a, b) => a.price - b.price); break;
      case "price-desc":  list.sort((a, b) => b.price - a.price); break;
      case "best-selling": list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0)); break;
      case "date-old":  list.sort((a, b) => a.id.localeCompare(b.id)); break;
      case "date-new":  list.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: break;
    }
    return list;
  }, [products, sortBy]);

  const displayed = useMemo(() => applyFilters(sorted, filters), [sorted, filters]);
  const filterCount = activeFilterCount(filters);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-[#e8e4e0] bg-white">
        {/* Decorative background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-16 h-64 w-64 rounded-full bg-[#f5f0e8] opacity-60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-0 h-48 w-48 rounded-full bg-[#f0e6e2] opacity-40 blur-2xl"
        />

        <div className="px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-1.5 pt-5 pb-3 text-[11px] tracking-[0.15em] text-[#9a9089] uppercase"
          >
            <Link href="/" className="hover:text-[#2c2825] transition-colors">
              Home
            </Link>
            <ChevRight />
            {parentLabel && parentSlug && (
              <>
                <Link
                  href={`/${parentSlug}`}
                  className="hover:text-[#2c2825] transition-colors"
                >
                  {parentLabel}
                </Link>
                <ChevRight />
              </>
            )}
            <span className="text-[#2c2825]">{pageTitle}</span>
          </nav>

          {/* Title */}
          <div className="pb-8 pt-3">
            <h1 className="font-serif text-3xl md:text-4xl tracking-[0.28em] text-[#2c2825] uppercase">
              {pageTitle}
            </h1>
            <p className="mt-2 text-[12px] tracking-[0.12em] text-[#9a9089] uppercase">
              {displayed.length} {displayed.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="sticky top-[4.25rem] z-30 border-b border-[#e8e4e0] bg-white/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6">
          <div className="flex h-12 items-center justify-between gap-4">
            {/* Grid toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridCols(4)}
                aria-label="4-column grid"
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  gridCols === 4 ? "text-[#2c2825]" : "text-[#b0a89e] hover:text-[#2c2825]"
                }`}
              >
                <Grid4Icon />
              </button>
              <button
                onClick={() => setGridCols(2)}
                aria-label="2-column grid"
                className={`flex h-8 w-8 items-center justify-center transition-colors ${
                  gridCols === 2 ? "text-[#2c2825]" : "text-[#b0a89e] hover:text-[#2c2825]"
                }`}
              >
                <Grid2Icon />
              </button>
            </div>

            {/* Sort + Filter */}
            <div className="flex items-center gap-5">
              <SortDropdown value={sortBy} onChange={setSortBy} />
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

      {/* ── Product Grid ────────────────────────────────────────────── */}
      <div className="py-6 px-4 sm:px-6">
        {displayed.length === 0 ? (
          products.length === 0 ? (
            <EmptyState title={pageTitle} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-[13px] tracking-[0.15em] text-[#9a9089] uppercase">No products match your filters</p>
              <button
                onClick={() => setFilters(defaultFilterState)}
                className="mt-4 text-[11px] tracking-[0.15em] text-[#2c2825] underline underline-offset-2 uppercase"
              >
                Clear All Filters
              </button>
            </div>
          )
        ) : (
          <div
            className={`grid border border-[#e8e4e0] divide-x divide-y divide-[#e8e4e0] ${
              gridCols === 4
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-2"
            }`}
          >
            {displayed.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                mounted={mounted}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Filter Drawer ───────────────────────────────────────────── */}
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

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  mounted,
}: {
  product: CatalogProduct;
  index: number;
  mounted: boolean;
}) {
  const hasSwap = Boolean(product.hoverImage);
  const delay = Math.min(index * 60, 480);

  return (
    <article
      className="group/card relative bg-white"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <Link href={product.href} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f2ef]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${
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
              className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover/card:opacity-100"
            />
          )}
          {product.badge && (
            <span className="absolute left-3 top-3 bg-white px-2 py-0.5 text-[9px] tracking-[0.15em] font-semibold uppercase text-[#2c2825]">
              {product.badge}
            </span>
          )}

          {/* Quick-add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#2c2825]/90 py-3 text-center text-[10px] tracking-[0.2em] text-white uppercase transition-transform duration-300 ease-out group-hover/card:translate-y-0">
            Quick Add
          </div>
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

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#e8e4e0] bg-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14H6L5 6"
            stroke="#b0a89e"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="font-serif text-xl tracking-[0.2em] uppercase text-[#2c2825] mb-2">
        No products yet
      </h2>
      <p className="text-[13px] text-[#9a9089] max-w-xs tracking-wide">
        We&apos;re adding new pieces to <span className="text-[#2c2825]">{title}</span> soon.
        Check back shortly.
      </p>
      <Link
        href="/shop"
        className="mt-8 border border-[#2c2825] px-10 py-3 text-[11px] tracking-[0.2em] uppercase text-[#2c2825] hover:bg-[#2c2825] hover:text-white transition-colors duration-300"
      >
        Browse All
      </Link>
    </div>
  );
}

// ─── Sort Dropdown ───────────────────────────────────────────────────────────
function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = sortOpts.find((o) => o.value === value)?.label ?? "Featured";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="relative hidden sm:block">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-[#2c2825] uppercase cursor-pointer focus:outline-none"
      >
        <span>Sort By: {selectedLabel}</span>
        <ChevDown
          className={`text-[#9a9089] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 min-w-[200px] bg-white border border-[#e8e4e0] shadow-lg transition-all duration-200 origin-top-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {sortOpts.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => {
              onChange(o.value);
              close();
            }}
            className={`w-full px-5 py-3 text-left text-[12px] tracking-[0.08em] transition-colors ${
              o.value === value
                ? "text-[#2c2825] font-semibold bg-[#f5f2ef]"
                : "text-[#6b6560] hover:text-[#2c2825] hover:bg-[#fafaf9]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
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
function ChevDown({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function ChevRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mx-0.5">
      <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
