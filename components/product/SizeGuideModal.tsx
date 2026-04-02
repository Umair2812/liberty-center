"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type Unit = "inches" | "cm";

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

const SHIRT_INCHES: { label: string; values: number[] }[] = [
  { label: "SHOULDER", values: [14, 14.5, 15.25, 16, 16.75] },
  { label: "BUST/CHEST", values: [18.5, 19.5, 21.5, 23.5, 25.5] },
  { label: "SLEEVE LENGTH", values: [21, 21, 22, 22, 23] },
  { label: "HEM", values: [23.5, 24.5, 26.5, 28.5, 30.5] },
  { label: "FRONT LENGTH", values: [40, 40, 42, 42, 44] },
  { label: "BACK LENGTH", values: [41, 41, 43, 43, 45] },
];

const BOTTOM_INCHES: { label: string; values: number[] }[] = [
  { label: "WAIST", values: [14.75, 15.75, 16.75, 17.75, 18.75] },
  { label: "LENGTH", values: [36, 36, 37, 37, 38] },
  { label: "BOTTOM OPENING", values: [7, 7, 7.5, 8, 8.5] },
];

const CELL_BORDER = "border border-[#e8e4df]";

function toCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

function formatVal(v: number, unit: Unit): string {
  if (unit === "inches") return String(v);
  return String(toCm(v));
}

type SizeGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<Unit>("inches");
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-[#2c2825]/55 backdrop-blur-[2px]"
        aria-label="Close size guide"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-none border border-[#e8e4df] bg-white shadow-[0_24px_80px_rgba(44,40,37,0.2)] sm:rounded-sm"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#e8e4df] bg-white px-4 py-3 sm:px-6 sm:py-4">
          <h2
            id={titleId}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground sm:text-xs"
          >
            Size guide
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-foreground/65 transition-colors duration-200 hover:bg-[#f5f0e8] hover:text-foreground"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-6">
          <div className="flex items-center justify-center gap-3 border-b border-[#e8e4df] pb-4">
            <button
              type="button"
              onClick={() => setUnit("inches")}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 sm:text-xs ${
                unit === "inches"
                  ? "font-semibold text-foreground"
                  : "font-medium text-muted hover:text-foreground/75"
              }`}
            >
              INCHES
            </button>
            <span className="select-none text-muted/40" aria-hidden>
              |
            </span>
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 sm:text-xs ${
                unit === "cm"
                  ? "font-semibold text-foreground"
                  : "font-medium text-muted hover:text-foreground/75"
              }`}
            >
              CM
            </button>
          </div>

          <div className="space-y-0 pt-6">
            <SizeTable title="Shirt" rows={SHIRT_INCHES} unit={unit} />
            <SizeTable title="Bottom" rows={BOTTOM_INCHES} unit={unit} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SizeTable({
  title,
  rows,
  unit,
}: {
  title: string;
  rows: { label: string; values: number[] }[];
  unit: Unit;
}) {
  return (
    <div className="border-t border-[#e8e4df] first:border-t-0 first:pt-0 pt-8 first:mt-0 mt-0">
      <p className="pb-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground sm:text-xs">
        {title}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[300px] border-collapse text-center text-[11px] text-foreground sm:text-xs">
          <thead>
            <tr>
              <th
                className={`${CELL_BORDER} bg-white px-2 py-3.5 font-semibold uppercase tracking-wide sm:px-3 sm:py-4`}
              >
                Size
              </th>
              {SIZES.map((s) => (
                <th
                  key={s}
                  className={`${CELL_BORDER} bg-white px-2 py-3.5 font-semibold uppercase tracking-wide sm:px-3 sm:py-4`}
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th
                  className={`${CELL_BORDER} bg-white px-2 py-3.5 font-semibold uppercase tracking-wide text-foreground sm:px-3 sm:py-4`}
                >
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`${CELL_BORDER} bg-white px-2 py-3.5 tabular-nums text-foreground/90 sm:px-3 sm:py-4`}
                  >
                    {formatVal(v, unit)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
