"use client";

import React, { useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
export const MAX_PRICE = 100_000;
export const PIECE_OPTIONS = ["1 Piece", "2 Piece", "3 Piece"] as const;
export const TYPE_OPTIONS = ["Embroidered", "Printed", "Plain"] as const;
export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export const AVAILABILITY_OPTIONS = ["In Stock", "Out of Stock"] as const;

// ─── Filter state type (exported so pages can own the state) ─────────────────
export interface FilterState {
  priceRange: [number, number];
  availability: string[];
  pieces: string[];
  filterType: string[];
  sizes: string[];
}

export const defaultFilterState: FilterState = {
  priceRange: [0, MAX_PRICE],
  availability: [],
  pieces: [],
  filterType: [],
  sizes: [],
};

export function activeFilterCount(f: FilterState): number {
  return (
    f.availability.length +
    f.pieces.length +
    f.filterType.length +
    f.sizes.length +
    (f.priceRange[0] > 0 || f.priceRange[1] < MAX_PRICE ? 1 : 0)
  );
}

/** Apply filter state to a list of products. Products need price & name fields. */
export function applyFilters<T extends { price: number; name: string }>(
  list: T[],
  f: FilterState
): T[] {
  let result = [...list];
  result = result.filter(
    (p) => p.price >= f.priceRange[0] && p.price <= f.priceRange[1]
  );
  if (f.filterType.length > 0) {
    result = result.filter((p) =>
      f.filterType.some((t) => p.name.toLowerCase().includes(t.toLowerCase()))
    );
  }
  if (f.pieces.length > 0) {
    result = result.filter((p) =>
      f.pieces.some((pc) => {
        const n = pc.replace(" Piece", "");
        return (
          p.name.toLowerCase().includes(`${n}-piece`) ||
          p.name.toLowerCase().includes(`${n} piece`)
        );
      })
    );
  }
  return result;
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
}: FilterDrawerProps) {
  const [openSections, setOpenSections] = useState<string[]>([
    "price",
    "availability",
    "pieces",
    "type",
    "size",
  ]);

  const toggleSection = (id: string) =>
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const toggleItem = <T extends string>(
    key: keyof FilterState,
    val: T,
    arr: T[]
  ) =>
    onChange({
      ...filters,
      [key]: arr.includes(val)
        ? arr.filter((v) => v !== val)
        : [...arr, val],
    });

  const clearAll = () => onChange(defaultFilterState);
  const count = activeFilterCount(filters);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#e8e4e0] px-6">
          <h2 className="text-[11px] tracking-[0.25em] text-[#2c2825] uppercase font-semibold">
            Filter
          </h2>
          <div className="flex items-center gap-4">
            {count > 0 && (
              <button
                onClick={clearAll}
                className="text-[10px] tracking-[0.15em] text-[#9a9089] uppercase underline underline-offset-2 hover:text-[#2c2825] transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="flex h-8 w-8 items-center justify-center text-[#9a9089] hover:text-[#2c2825] transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Price Range */}
          <FilterSection
            id="price"
            label="Price Range"
            count={filters.priceRange[0] > 0 || filters.priceRange[1] < MAX_PRICE ? 1 : 0}
            open={openSections.includes("price")}
            onToggle={() => toggleSection("price")}
          >
            <div className="px-6 pb-6">
              <div className="flex justify-between mb-3">
                <span className="text-[11px] tracking-[0.08em] text-[#2c2825] font-medium">
                  Rs. {filters.priceRange[0].toLocaleString()}
                </span>
                <span className="text-[11px] tracking-[0.08em] text-[#2c2825] font-medium">
                  Rs. {filters.priceRange[1].toLocaleString()}
                </span>
              </div>

              {/* Dual range track */}
              <div className="relative h-5 flex items-center">
                <div className="absolute left-0 right-0 h-[2px] bg-[#e8e4e0] rounded-full" />
                <div
                  className="absolute h-[2px] bg-[#2c2825] rounded-full pointer-events-none"
                  style={{
                    left: `${(filters.priceRange[0] / MAX_PRICE) * 100}%`,
                    right: `${100 - (filters.priceRange[1] / MAX_PRICE) * 100}%`,
                  }}
                />
                <input
                  type="range" min={0} max={MAX_PRICE} step={500}
                  value={filters.priceRange[0]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v < filters.priceRange[1])
                      onChange({ ...filters, priceRange: [v, filters.priceRange[1]] });
                  }}
                  className="absolute w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2c2825] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                />
                <input
                  type="range" min={0} max={MAX_PRICE} step={500}
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v > filters.priceRange[0])
                      onChange({ ...filters, priceRange: [filters.priceRange[0], v] });
                  }}
                  className="absolute w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2c2825] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                />
              </div>

              {/* Quick preset pills */}
              <div className="flex gap-2 mt-4">
                {(
                  [
                    [0, 5000, "Under 5K"],
                    [5000, 15000, "5K–15K"],
                    [15000, 30000, "15K–30K"],
                    [30000, MAX_PRICE, "30K+"],
                  ] as [number, number, string][]
                ).map(([min, max, label]) => (
                  <button
                    key={label}
                    onClick={() => onChange({ ...filters, priceRange: [min, max] })}
                    className={`flex-1 py-1.5 text-[9px] tracking-[0.1em] uppercase border transition-colors ${
                      filters.priceRange[0] === min && filters.priceRange[1] === max
                        ? "border-[#2c2825] bg-[#2c2825] text-white"
                        : "border-[#e8e4e0] text-[#9a9089] hover:border-[#2c2825] hover:text-[#2c2825]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection
            id="availability"
            label="Availability"
            count={filters.availability.length}
            open={openSections.includes("availability")}
            onToggle={() => toggleSection("availability")}
          >
            <div className="px-6 pb-5 space-y-3.5">
              {AVAILABILITY_OPTIONS.map((opt) => (
                <FilterCheckbox
                  key={opt}
                  label={opt}
                  checked={filters.availability.includes(opt)}
                  onChange={() =>
                    toggleItem("availability", opt, filters.availability)
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Pieces */}
          <FilterSection
            id="pieces"
            label="Pieces"
            count={filters.pieces.length}
            open={openSections.includes("pieces")}
            onToggle={() => toggleSection("pieces")}
          >
            <div className="px-6 pb-5 flex gap-2 flex-wrap">
              {PIECE_OPTIONS.map((opt) => (
                <PillButton
                  key={opt}
                  label={opt}
                  active={filters.pieces.includes(opt)}
                  onClick={() => toggleItem("pieces", opt, filters.pieces)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Type */}
          <FilterSection
            id="type"
            label="Type"
            count={filters.filterType.length}
            open={openSections.includes("type")}
            onToggle={() => toggleSection("type")}
          >
            <div className="px-6 pb-5 flex gap-2 flex-wrap">
              {TYPE_OPTIONS.map((opt) => (
                <PillButton
                  key={opt}
                  label={opt}
                  active={filters.filterType.includes(opt)}
                  onClick={() => toggleItem("filterType", opt, filters.filterType)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection
            id="size"
            label="Size Available"
            count={filters.sizes.length}
            open={openSections.includes("size")}
            onToggle={() => toggleSection("size")}
          >
            <div className="px-6 pb-5 flex gap-2 flex-wrap">
              {SIZE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleItem("sizes", opt, filters.sizes)}
                  className={`h-9 w-12 text-[10px] tracking-[0.1em] uppercase border transition-all duration-150 ${
                    filters.sizes.includes(opt)
                      ? "border-[#2c2825] bg-[#2c2825] text-white"
                      : "border-[#e8e4e0] text-[#9a9089] hover:border-[#2c2825] hover:text-[#2c2825]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </FilterSection>

        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-[#e8e4e0] p-4">
          <button
            onClick={onClose}
            className="w-full bg-[#2c2825] py-4 text-[11px] tracking-[0.25em] text-white uppercase transition-opacity hover:opacity-85"
          >
            View Results ({resultCount})
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function FilterSection({
  id, label, count, open, onToggle, children,
}: {
  id: string; label: string; count: number;
  open: boolean; onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#e8e4e0]">
      <button
        id={`filter-section-${id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-[11px] tracking-[0.2em] text-[#2c2825] uppercase font-semibold">
          {label}
          {count > 0 && <span className="ml-2 text-[#9a9089]">({count})</span>}
        </span>
        <ChevronDown className={`text-[#9a9089] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
}

function FilterCheckbox({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 group" onClick={onChange}>
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-150 ${
        checked ? "border-[#2c2825] bg-[#2c2825]" : "border-[#c8c0b8] group-hover:border-[#2c2825]"
      }`}>
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`text-[12px] tracking-[0.08em] uppercase transition-colors ${
        checked ? "text-[#2c2825]" : "text-[#9a9089] group-hover:text-[#2c2825]"
      }`}>
        {label}
      </span>
    </label>
  );
}

function PillButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] tracking-[0.12em] uppercase border transition-all duration-150 ${
        active
          ? "border-[#2c2825] bg-[#2c2825] text-white"
          : "border-[#e8e4e0] text-[#9a9089] hover:border-[#2c2825] hover:text-[#2c2825]"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
