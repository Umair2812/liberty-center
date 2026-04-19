"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProductDetail } from "@/data/productDetails";
import { useCart } from "@/context/CartContext";
import { formatPkr } from "@/lib/format";
import { showSizeGuideAndSizes, wearTypeLabel } from "@/lib/wearType";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";

type TabId = "details" | "description";

type ProductPurchasePanelProps = {
  detail: ProductDetail;
};

/**
 * PDP primary CTAs: no native `disabled` so hover (sweep + text) still works while a size is required.
 * Use `aria-disabled` + click guard; muted opacity until size is selected.
 */
const pdpCtaClass =
  "relative z-0 w-full cursor-pointer overflow-hidden border border-foreground bg-transparent py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground transition-[color,opacity] duration-300 before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-foreground before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.85,0,0.15,1)] hover:text-background hover:before:origin-left hover:before:scale-x-100";

export function ProductPurchasePanel({ detail }: ProductPurchasePanelProps) {
  const [tab, setTab] = useState<TabId>("details");
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const { addItem } = useCart();

  const hasSizes = Boolean(detail.sizes?.length);
  const showGuide = showSizeGuideAndSizes(detail.wearType);
  const showNewIn = detail.badge?.toLowerCase().includes("new");
  const canSubmit = !hasSizes || size !== null;

  useEffect(() => {
    setTab("details");
    setQty(1);
    setSize(null);
    setGuideOpen(false);
  }, [detail.slug]);

  function bumpQty(delta: number) {
    setQty((q) => Math.min(10, Math.max(1, q + delta)));
  }

  const addProductToCart = useCallback(() => {
    if (!canSubmit) return;
    const baseTitle = detail.title.toUpperCase();
    const title =
      hasSizes && size ? `${baseTitle} · ${size}` : baseTitle;
    addItem({
      id: detail.slug,
      title,
      price: detail.price,
      image: detail.images[0] ?? "",
      inStock: true,
      quantity: qty,
    });
  }, [
    addItem,
    canSubmit,
    detail.images,
    detail.price,
    detail.slug,
    detail.title,
    hasSizes,
    qty,
    size,
  ]);

  const descriptionParagraphs = detail.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="animate-pdp-panel lg:sticky lg:top-28 lg:self-start">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
        {wearTypeLabel(detail.wearType)}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h1 className="font-display text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
          {detail.title}
        </h1>
        {showNewIn ? (
          <span className="bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            New in
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-lg font-medium tabular-nums text-foreground sm:text-xl">
        {formatPkr(detail.price)}
      </p>

      <p className="mt-3 text-[11px] text-muted">SKU: {detail.sku}</p>

      {hasSizes ? (
        <fieldset
          className="relative z-[1] mt-6 border-0 p-0"
          aria-labelledby="pdp-size-legend"
        >
          <legend id="pdp-size-legend" className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
            Size
          </legend>
          {!size ? (
            <p className="mt-1 text-xs text-muted">Select a size to continue.</p>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-2">
            {detail.sizes!.map((s) => {
              const inputId = `pdp-size-${detail.slug}-${s}`;
              const selected = size === s;
              return (
                <label
                  key={s}
                  htmlFor={inputId}
                  className={[
                    "flex h-11 w-11 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center border text-xs font-bold uppercase tracking-wide transition-[color,background-color,border-color,transform] duration-200",
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-line bg-white text-foreground motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/35",
                  ].join(" ")}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={`pdp-size-${detail.slug}`}
                    value={s}
                    checked={selected}
                    onChange={() => setSize(s)}
                    className="sr-only"
                  />
                  {s}
                </label>
              );
            })}
          </div>
          {showGuide ? (
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setGuideOpen(true)}
              className="mt-4 block w-full cursor-pointer text-left text-xs font-medium text-foreground underline decoration-foreground/35 underline-offset-[5px] transition-colors duration-200 hover:text-gold hover:decoration-gold/60"
            >
              Size guide
            </button>
          ) : null}
        </fieldset>
      ) : null}

      <div className="mt-8 flex max-w-[220px] items-center border border-line">
        <button
          type="button"
          suppressHydrationWarning
          aria-label="Decrease quantity"
          className="flex h-11 w-11 touch-manipulation items-center justify-center text-lg transition-colors duration-200 hover:bg-cream"
          onClick={() => bumpQty(-1)}
        >
          −
        </button>
        <span className="flex flex-1 items-center justify-center text-sm font-medium tabular-nums">
          {qty}
        </span>
        <button
          type="button"
          suppressHydrationWarning
          aria-label="Increase quantity"
          className="flex h-11 w-11 touch-manipulation items-center justify-center text-lg transition-colors duration-200 hover:bg-cream"
          onClick={() => bumpQty(1)}
        >
          +
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:max-w-md">
        <button
          type="button"
          suppressHydrationWarning
          className={`${pdpCtaClass} ${!canSubmit ? "opacity-[0.42] hover:opacity-100" : ""}`}
          aria-disabled={!canSubmit}
          onClick={(e) => {
            if (!canSubmit) {
              e.preventDefault();
              return;
            }
            addProductToCart();
          }}
        >
          Add to cart
        </button>
        <button
          type="button"
          suppressHydrationWarning
          className={`${pdpCtaClass} ${!canSubmit ? "opacity-[0.42] hover:opacity-100" : ""}`}
          aria-disabled={!canSubmit}
          onClick={(e) => {
            if (!canSubmit) {
              e.preventDefault();
              return;
            }
            addProductToCart();
          }}
        >
          Buy it now
        </button>
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <div className="flex gap-8 border-b border-line">
          {(["details", "description"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`pb-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-[color,border-color] duration-300 ${
                tab === id
                  ? "border-b-2 border-foreground text-foreground"
                  : "border-b-2 border-transparent text-muted motion-safe:hover:text-foreground"
              }`}
            >
              {id === "details" ? "Details" : "Description"}
            </button>
          ))}
        </div>

        <div key={tab} className="animate-pdp-tab-content pt-6">
          {tab === "details" ? (
            <div className="space-y-6 text-sm leading-relaxed text-foreground">
              {detail.detailBlocks.map((block) => (
                <div key={block.heading}>
                  <p className="border-b border-line pb-1 text-xs font-bold uppercase tracking-wide">
                    {block.heading}
                  </p>
                  <ul className="mt-3 space-y-2 text-muted">
                    {block.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-xs text-muted">
                <span className="font-semibold text-foreground">Note: </span>
                Product color may vary slightly due to lighting or screen settings.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-sm leading-[1.7] text-muted">
              {descriptionParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {showGuide ? (
        <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
      ) : null}
    </div>
  );
}
