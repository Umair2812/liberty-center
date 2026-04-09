"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProductAddonDef } from "@/data/productAddons";
import { PRODUCT_ADDONS, addonUnitLabel, getAddonById } from "@/data/productAddons";
import { formatPkr } from "@/lib/format";

type AddonSelection = {
  addonId: string;
  amount: number;
};

type ProductAddonsSectionProps = {
  productSlug: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
};

const DRAFT_PREFIX = "lc-pdp-addon-draft";

function draftKey(slug: string) {
  return `${DRAFT_PREFIX}:${slug}`;
}

const ADDON_IMG_MIN_ZOOM = 1;
const ADDON_IMG_MAX_ZOOM = 4;

export function ProductAddonsSection({
  productSlug,
  productTitle,
  productPrice,
  productImage,
}: ProductAddonsSectionProps) {
  const [selections, setSelections] = useState<AddonSelection[]>([]);
  const [configureId, setConfigureId] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const addonsScrollerRef = useRef<HTMLDivElement>(null);
  const [addonScroll, setAddonScroll] = useState({ canLeft: false, canRight: false });

  const updateAddonScrollState = useCallback(() => {
    const el = addonsScrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setAddonScroll({
      canLeft: scrollLeft > 4,
      canRight: scrollLeft < max - 4,
    });
  }, []);

  useEffect(() => {
    updateAddonScrollState();
    const el = addonsScrollerRef.current;
    if (!el) return;
    const ul = el.querySelector("ul");
    el.addEventListener("scroll", updateAddonScrollState, { passive: true });
    const ro = new ResizeObserver(updateAddonScrollState);
    ro.observe(el);
    if (ul) ro.observe(ul);
    return () => {
      el.removeEventListener("scroll", updateAddonScrollState);
      ro.disconnect();
    };
  }, [updateAddonScrollState]);

  const scrollAddons = useCallback((dir: -1 | 1) => {
    const el = addonsScrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector("li");
    const ul = el.querySelector("ul");
    const gapParsed = ul ? parseFloat(getComputedStyle(ul).columnGap || getComputedStyle(ul).gap) : NaN;
    const gap = Number.isFinite(gapParsed) ? gapParsed : 12;
    const step = firstCard ? (firstCard as HTMLElement).offsetWidth + gap : Math.max(160, el.clientWidth * 0.65);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const locked = Boolean(configureId) || summaryOpen;
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [configureId, summaryOpen]);

  const openConfigure = useCallback((id: string) => {
    setSummaryOpen(false);
    setConfigureId(id);
  }, []);

  const closeConfigure = useCallback(() => setConfigureId(null), []);

  const upsertSelection = useCallback((addonId: string, amount: number) => {
    setSelections((prev) => {
      const rest = prev.filter((s) => s.addonId !== addonId);
      return [...rest, { addonId, amount }];
    });
  }, []);

  const handleConfigureConfirm = useCallback(
    (addonId: string, amount: number) => {
      upsertSelection(addonId, amount);
      closeConfigure();
      setSummaryOpen(true);
    },
    [upsertSelection, closeConfigure],
  );

  const closeSummary = useCallback(() => setSummaryOpen(false), []);

  const saveDraft = useCallback(() => {
    try {
      const payload = {
        productSlug,
        productTitle,
        productPrice,
        selections,
        savedAt: Date.now(),
      };
      localStorage.setItem(draftKey(productSlug), JSON.stringify(payload));
      setToast("Saved as draft.");
      setTimeout(() => setToast(null), 3200);
    } catch {
      setToast("Could not save draft.");
      setTimeout(() => setToast(null), 3200);
    }
  }, [productSlug, productTitle, productPrice, selections]);

  const addBundleToCart = useCallback(() => {
    setToast("Bundle added to cart (demo).");
    setTimeout(() => setToast(null), 3200);
    setSummaryOpen(false);
  }, []);

  return (
    <section
      className="relative z-10 border-t border-line pt-8 motion-safe:animate-[pdp-tab-content_0.45s_ease-out_both] sm:pt-10"
      aria-labelledby="addons-section-title"
    >
      <h2
        id="addons-section-title"
        className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground sm:text-xs"
      >
        Recommended Addons and Matchings
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Tap an item to choose meters or quantity, then review your bundle. Our hand-picked recommendations ensure the perfect match and premium quality..
      </p>

      <div className="relative isolate mt-6 flex items-stretch gap-1.5 sm:gap-2">
        <button
          type="button"
          suppressHydrationWarning
          aria-label="Scroll addons left"
          disabled={!addonScroll.canLeft}
          onClick={() => scrollAddons(-1)}
          className="flex w-9 shrink-0 touch-manipulation items-center justify-center self-center rounded-full border border-line bg-white text-foreground shadow-sm transition-all duration-200 hover:border-foreground/20 hover:bg-cream disabled:pointer-events-none disabled:opacity-30 sm:w-10"
        >
          <ChevronLeftThin className="h-5 w-5" />
        </button>

        <div
          ref={addonsScrollerRef}
          className="addon-scroller min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max items-stretch gap-3 sm:gap-4">
            {PRODUCT_ADDONS.map((addon) => {
              const active = selections.some((s) => s.addonId === addon.id);
              const unit = addonUnitLabel(addon.input);
              return (
                <li
                  key={addon.id}
                  className="flex w-[10.75rem] shrink-0 sm:w-[12.25rem]"
                >
                  {/* role="button" instead of <button>: native buttons inside overflow-x scrollers often miss taps (esp. mobile). */}
                  <div
                    role="button"
                    tabIndex={0}
                    suppressHydrationWarning
                    aria-haspopup="dialog"
                    aria-expanded={configureId === addon.id}
                    onClick={() => openConfigure(addon.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openConfigure(addon.id);
                      }
                    }}
                    className={`group/addon relative z-[1] flex h-full min-h-[17.5rem] w-full cursor-pointer touch-manipulation select-none flex-col overflow-hidden rounded-xl border bg-white text-left shadow-[0_2px_16px_rgba(44,40,37,0.06)] ring-1 ring-line/60 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_32px_rgba(44,40,37,0.1)] motion-safe:hover:ring-gold/25 sm:min-h-[19rem] ${
                      active ? "border-foreground ring-foreground/30" : "border-line/80"
                    }`}
                  >
                    <div className="pointer-events-none relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-cream">
                      <Image
                        src={addon.image}
                        alt={addon.label}
                        fill
                        sizes="196px"
                        className="pointer-events-none object-cover transition-transform duration-500 ease-out motion-safe:group-hover/addon:scale-[1.06]"
                        style={{ pointerEvents: "none" }}
                      />
                      {active ? (
                        <span className="absolute right-2 top-2 rounded bg-foreground px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-background">
                          Added
                        </span>
                      ) : null}
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col justify-between gap-2 px-2.5 py-2.5 sm:px-3.5 sm:py-3.5">
                      <span
                        className="line-clamp-3 font-semibold uppercase leading-[1.25] tracking-[0.06em] text-foreground sm:line-clamp-2 md:leading-snug"
                        style={{
                          fontSize: "clamp(0.625rem, 0.28rem + 1.85vw, 0.8125rem)",
                        }}
                      >
                        {addon.label}
                      </span>
                      <span className="shrink-0 text-[clamp(0.8125rem,0.72rem+0.45vw,0.9375rem)] font-semibold tabular-nums leading-none text-foreground">
                        {formatPkr(addon.pricePerUnit)}
                        <span
                          className="font-medium normal-case tracking-normal text-muted"
                          style={{ fontSize: "clamp(0.5625rem, 0.5rem + 0.35vw, 0.6875rem)" }}
                        >
                          {" "}
                          / {unit}
                        </span>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          suppressHydrationWarning
          aria-label="Scroll addons right"
          disabled={!addonScroll.canRight}
          onClick={() => scrollAddons(1)}
          className="flex w-9 shrink-0 touch-manipulation items-center justify-center self-center rounded-full border border-line bg-white text-foreground shadow-sm transition-all duration-200 hover:border-foreground/20 hover:bg-cream disabled:pointer-events-none disabled:opacity-30 sm:w-10"
        >
          <ChevronRightThin className="h-5 w-5" />
        </button>
      </div>

      {selections.length > 0 ? (
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setSummaryOpen(true)}
          className="mt-4 text-[11px] font-medium uppercase tracking-wider text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/30"
        >
          View bundle summary ({selections.length} addon{selections.length === 1 ? "" : "s"})
        </button>
      ) : null}

      <AddonConfigureModal
        addonId={configureId}
        onClose={closeConfigure}
        onConfirm={handleConfigureConfirm}
        existingAmount={selections.find((s) => s.addonId === configureId)?.amount}
      />

      <AddonSummaryModal
        open={summaryOpen}
        onClose={closeSummary}
        productTitle={productTitle}
        productPrice={productPrice}
        productImage={productImage}
        selections={selections}
        onSaveDraft={saveDraft}
        onAddToCart={addBundleToCart}
      />

      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-[220] max-w-[min(90vw,24rem)] -translate-x-1/2 rounded-md border border-line bg-background px-4 py-3 text-center text-sm text-foreground shadow-lg transition-all duration-300"
          role="status"
        >
          {toast}
        </div>
      ) : null}
    </section>
  );
}

function AddonConfigureModal({
  addonId,
  onClose,
  onConfirm,
  existingAmount,
}: {
  addonId: string | null;
  onClose: () => void;
  onConfirm: (addonId: string, amount: number) => void;
  existingAmount?: number;
}) {
  const open = Boolean(addonId);
  const addon = addonId ? getAddonById(addonId) : undefined;
  const titleId = useId();
  const inputId = useId();
  const [entered, setEntered] = useState(false);
  const [raw, setRaw] = useState("");
  const [imgScale, setImgScale] = useState(1);
  const [imgPan, setImgPan] = useState({ x: 0, y: 0 });
  const [imgDragging, setImgDragging] = useState(false);
  const addonImgStageRef = useRef<HTMLDivElement>(null);
  const imgDragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointerId: null as number | null,
  });

  const resetAddonImageView = useCallback(() => {
    setImgScale(1);
    setImgPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!open || !addon) return;
    const initial =
      existingAmount ??
      (addon.input === "meters" ? "1.5" : "1");
    setRaw(String(initial));
    resetAddonImageView();
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, [open, addon, existingAmount, resetAddonImageView]);

  useEffect(() => {
    if (!open) setEntered(false);
  }, [open]);

  useEffect(() => {
    const stage = addonImgStageRef.current;
    if (!open || !stage) return;

    function onWheel(e: WheelEvent) {
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      setImgScale((s) => {
        const next = Math.min(ADDON_IMG_MAX_ZOOM, Math.max(ADDON_IMG_MIN_ZOOM, s + delta));
        if (next === 1) setImgPan({ x: 0, y: 0 });
        return next;
      });
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, addon?.id]);

  function onAddonImgPointerDown(e: React.PointerEvent) {
    if (imgScale <= 1) return;
    const d = imgDragRef.current;
    d.active = true;
    d.pointerId = e.pointerId;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.originX = imgPan.x;
    d.originY = imgPan.y;
    setImgDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onAddonImgPointerMove(e: React.PointerEvent) {
    const d = imgDragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    setImgPan({
      x: d.originX + (e.clientX - d.startX),
      y: d.originY + (e.clientY - d.startY),
    });
  }

  function endAddonImgDrag(e: React.PointerEvent) {
    const d = imgDragRef.current;
    if (e.pointerId !== d.pointerId) return;
    const captureId = e.pointerId;
    d.active = false;
    d.pointerId = null;
    setImgDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(captureId);
    } catch {
      /* ignore */
    }
  }

  function onAddonImgDoubleClick() {
    setImgScale((s) => {
      const next = s > 1 ? 1 : 2;
      if (next === 1) setImgPan({ x: 0, y: 0 });
      return next;
    });
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const parsed = useMemo(() => {
    if (!addon) return NaN;
    if (addon.input === "quantity") {
      const n = parseInt(raw.trim(), 10);
      return Number.isFinite(n) ? n : NaN;
    }
    const n = parseFloat(raw.trim());
    return Number.isFinite(n) ? n : NaN;
  }, [raw, addon]);

  const valid =
    addon &&
    Number.isFinite(parsed) &&
    parsed > 0 &&
    (addon.input === "quantity" ? Number.isInteger(parsed) && parsed <= 999 : parsed <= 50);

  function submit() {
    if (!addon || !valid) return;
    onConfirm(addon.id, parsed);
  }

  if (!open || !addon) return null;

  const label =
    addon.input === "meters"
      ? "Meters"
      : "Quantity";

  return createPortal(
    <div className="fixed inset-0 z-[216] flex items-center justify-center overflow-y-auto overscroll-contain px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <button
        type="button"
        className={`absolute inset-0 bg-[#2c2825]/50 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${entered ? "opacity-100" : "opacity-0"}`}
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 max-h-[calc(100dvh-5rem)] w-full max-w-[min(100%,42rem)] overflow-y-auto border border-[#e8e4df] bg-white shadow-[0_24px_80px_rgba(44,40,37,0.18)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-[calc(100dvh-7.5rem)] md:max-h-[calc(100dvh-9rem)] sm:rounded-sm ${entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"}`}
      >
        <div className="relative border-b border-[#e8e4df] bg-[#faf8f5]">
          <div className="flex justify-end px-3 pt-3 sm:px-5 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/80 bg-white text-foreground/70 shadow-sm transition-colors hover:bg-cream hover:text-foreground"
              aria-label="Close"
            >
              <CloseGlyph />
            </button>
          </div>
          <div
            ref={addonImgStageRef}
            className="relative mx-auto w-full max-w-2xl touch-none px-3 pb-1 sm:px-6"
          >
            <div
              className={`relative mx-auto aspect-[5/4] w-full max-h-[min(52vh,520px)] overflow-hidden sm:aspect-[16/10] ${
                imgScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              }`}
              onPointerDown={onAddonImgPointerDown}
              onPointerMove={onAddonImgPointerMove}
              onPointerUp={endAddonImgDrag}
              onPointerCancel={endAddonImgDrag}
              onDoubleClick={onAddonImgDoubleClick}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `translate(${imgPan.x}px, ${imgPan.y}px) scale(${imgScale})`,
                  transformOrigin: "center center",
                  transition: imgDragging ? "none" : "transform 0.12s ease-out",
                }}
              >
                <Image
                  src={addon.image}
                  alt={addon.label}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, 672px"
                  priority
                  draggable={false}
                />
              </div>
            </div>
            <p className="pb-3 pt-1 text-center text-[10px] text-muted sm:text-[11px]">
              Scroll to zoom{imgScale > 1 ? " · drag to pan" : ""}
              {imgScale > 1 ? " · double-click to reset" : " · double-click to zoom in"}
            </p>
          </div>
        </div>

        <div className="border-b border-[#e8e4df] px-5 py-4 sm:px-8 sm:py-5">
          <h2
            id={titleId}
            className="text-[clamp(0.8125rem,0.65rem+0.75vw,1rem)] font-semibold uppercase leading-snug tracking-[0.16em] text-foreground sm:tracking-[0.18em]"
          >
            {addon.label}
          </h2>
          <p className="mt-2 text-[clamp(0.875rem,0.8rem+0.4vw,1.0625rem)] tabular-nums text-foreground">
            {formatPkr(addon.pricePerUnit)}
            <span className="text-[0.8125rem] font-normal text-muted sm:text-sm">
              {addon.input === "meters" ? " / meter" : " / unit"}
            </span>
          </p>
          <p className="mt-4 max-w-prose text-[13px] leading-[1.65] text-muted sm:text-sm sm:leading-relaxed">
            {addon.description}
          </p>
        </div>

        <div className="space-y-4 px-5 py-6 sm:px-8 sm:py-8">
          <label htmlFor={inputId} className="block text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </label>
          <input
            id={inputId}
            type="number"
            min={addon.input === "quantity" ? 1 : 0.25}
            max={addon.input === "quantity" ? 999 : 50}
            step={addon.input === "quantity" ? 1 : 0.25}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="h-12 w-full max-w-xs border border-line bg-white px-4 text-foreground tabular-nums outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-gold/50 focus-visible:ring-2 focus-visible:ring-gold/20"
          />
          <p className="text-xs text-muted">
            {addon.input === "meters"
              ? "Enter length in meters (0.25–50)."
              : "Enter a whole number of units (1–999)."}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-3 border-t border-[#e8e4df] px-5 py-4 sm:px-6">
          <button
            type="button"
            suppressHydrationWarning
            onClick={onClose}
            className="min-h-11 border border-line bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground transition-colors duration-200 hover:bg-cream"
          >
            Cancel
          </button>
          <button
            type="button"
            suppressHydrationWarning
            disabled={!valid}
            onClick={submit}
            className="min-h-11 border border-foreground bg-foreground px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-background transition-opacity duration-200 hover:opacity-90 disabled:pointer-events-none disabled:opacity-35"
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function AddonSummaryModal({
  open,
  onClose,
  productTitle,
  productPrice,
  productImage,
  selections,
  onSaveDraft,
  onAddToCart,
}: {
  open: boolean;
  onClose: () => void;
  productTitle: string;
  productPrice: number;
  productImage: string;
  selections: AddonSelection[];
  onSaveDraft: () => void;
  onAddToCart: () => void;
}) {
  const titleId = useId();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const lines = useMemo(() => {
    return selections
      .map((s) => {
        const def = getAddonById(s.addonId);
        if (!def) return null;
        const sub = s.amount * def.pricePerUnit;
        return { def, amount: s.amount, sub };
      })
      .filter(Boolean) as { def: ProductAddonDef; amount: number; sub: number }[];
  }, [selections]);

  const addonsTotal = lines.reduce((acc, l) => acc + l.sub, 0);
  const grandTotal = productPrice + addonsTotal;

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[215] flex items-center justify-center overflow-y-auto p-4 py-10 sm:p-6 sm:py-12">
      <button
        type="button"
        className={`fixed inset-0 bg-[#2c2825]/50 backdrop-blur-[2px] transition-opacity duration-300 ${entered ? "opacity-100" : "opacity-0"}`}
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 my-auto w-full max-w-[min(100%,40rem)] border border-[#e8e4df] bg-white shadow-[0_24px_80px_rgba(44,40,37,0.18)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-sm ${entered ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"}`}
      >
        <div className="flex items-start justify-between border-b border-[#e8e4df] px-5 py-4 sm:px-6">
          <h2 id={titleId} className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            Your bundle
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-foreground/60 hover:bg-[#f5f0e8]"
            aria-label="Close"
          >
            <CloseGlyph />
          </button>
        </div>

        <div className="max-h-[min(70vh,560px)] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex gap-4 border-b border-line pb-6">
            <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-cream sm:h-36 sm:w-28">
              {productImage ? (
                <Image
                  src={productImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Main dress</p>
              <p className="mt-1 font-display text-lg font-medium leading-snug text-foreground sm:text-xl">
                {productTitle}
              </p>
              <p className="mt-2 text-base font-medium tabular-nums text-foreground">
                {formatPkr(productPrice)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Addons</p>
            {lines.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No addons selected yet.</p>
            ) : (
              <ul className="mt-3 space-y-1">
                {lines.map(({ def, amount, sub }) => (
                  <li
                    key={def.id}
                    className="flex gap-3 border-b border-line/80 py-3 text-sm last:border-0"
                  >
                    <div className="relative h-[4.5rem] w-[3.25rem] shrink-0 overflow-hidden rounded-md bg-cream sm:h-24 sm:w-[4.5rem]">
                      <Image
                        src={def.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 56px, 72px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="font-medium leading-snug text-foreground">{def.label}</span>
                      <span className="shrink-0 tabular-nums text-muted">
                        {amount}{" "}
                        {def.input === "meters"
                          ? amount === 1
                            ? "meter"
                            : "meters"
                          : amount === 1
                            ? "unit"
                            : "units"}{" "}
                        · {formatPkr(sub)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 border-t border-foreground/15 pt-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Total</span>
              <span className="text-lg font-semibold tabular-nums text-foreground sm:text-xl">
                {formatPkr(grandTotal)}
              </span>
            </div>
            <p className="mt-1 text-right text-[11px] text-muted">Includes dress and all addons</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#e8e4df] px-5 py-4 sm:flex-row sm:flex-wrap sm:justify-end sm:px-6">
          <button
            type="button"
            suppressHydrationWarning
            onClick={onSaveDraft}
            className="min-h-11 w-full border border-line bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground transition-colors duration-200 hover:bg-cream sm:w-auto"
          >
            Save as Draft
          </button>
          <button
            type="button"
            suppressHydrationWarning
            onClick={onAddToCart}
            className="min-h-11 w-full border border-foreground bg-foreground px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-background transition-opacity duration-200 hover:opacity-90 sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ChevronLeftThin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden width="24" height="24">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightThin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden width="24" height="24">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
