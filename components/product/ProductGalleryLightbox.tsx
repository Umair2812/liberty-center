"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProductGalleryLightboxProps = {
  open: boolean;
  onClose: () => void;
  images: string[];
  productTitle: string;
  initialIndex: number;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function ProductGalleryLightbox({
  open,
  onClose,
  images,
  productTitle,
  initialIndex,
}: ProductGalleryLightboxProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    pointerId: number | null;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointerId: null,
  });
  const stageRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const canNavigate = count > 1;
  const src = images[index] ?? "";

  const resetView = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setIndex(Math.min(Math.max(0, initialIndex), Math.max(0, count - 1)));
    resetView();
  }, [open, initialIndex, count, resetView]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canNavigate) {
        e.preventDefault();
        setIndex((i) => (i - 1 + count) % count);
        resetView();
      }
      if (e.key === "ArrowRight" && canNavigate) {
        e.preventDefault();
        setIndex((i) => (i + 1) % count);
        resetView();
      }
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, canNavigate, count, resetView]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!open || !stage) return;

    function onWheel(e: WheelEvent) {
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      setScale((s) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta));
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, index]);

  function goPrev() {
    if (!canNavigate) return;
    setIndex((i) => (i - 1 + count) % count);
    resetView();
  }

  function goNext() {
    if (!canNavigate) return;
    setIndex((i) => (i + 1) % count);
    resetView();
  }

  function onPointerDown(e: React.PointerEvent) {
    if (scale <= 1) return;
    const d = dragRef.current;
    d.active = true;
    d.pointerId = e.pointerId;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.originX = pan.x;
    d.originY = pan.y;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    setPan({
      x: d.originX + (e.clientX - d.startX),
      y: d.originY + (e.clientY - d.startY),
    });
  }

  function endDrag(e: React.PointerEvent) {
    const d = dragRef.current;
    if (e.pointerId !== d.pointerId) return;
    d.active = false;
    d.pointerId = null;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    endDrag(e);
  }

  function onPointerCancel(e: React.PointerEvent) {
    endDrag(e);
  }

  function onDoubleClick() {
    setScale((s) => {
      const next = s > 1 ? 1 : 2;
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }

  if (!open || !mounted || count === 0 || !src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[210] flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="sr-only">
        {productTitle} — enlarged gallery, image {index + 1} of {count}
      </h2>

      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-1 touch-none items-center justify-center px-4 py-6 md:px-16 md:py-10"
      >
        <div
          className={`relative h-[min(78dvh,880px)] w-full max-w-[min(100%,920px)] ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onDoubleClick={onDoubleClick}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.12s ease-out",
            }}
          >
            <Image
              src={src}
              alt={`${productTitle} — view ${index + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>

      <p className="px-4 pb-2 text-center text-[11px] text-muted">
        Scroll to zoom{scale > 1 ? " · drag to move" : ""}
        {scale > 1 ? " · double-click to reset zoom" : " · double-click to zoom in"}
      </p>

      <div className="flex shrink-0 items-center justify-center gap-5 pb-8 pt-2 md:gap-8 md:pb-10">
        <IconCircleButton
          label="Previous image"
          onClick={goPrev}
          disabled={!canNavigate}
        >
          <ChevronLeftIcon />
        </IconCircleButton>
        <IconCircleButton label="Close gallery" onClick={onClose}>
          <CloseIcon />
        </IconCircleButton>
        <IconCircleButton
          label="Next image"
          onClick={goNext}
          disabled={!canNavigate}
        >
          <ChevronRightIcon />
        </IconCircleButton>
      </div>
    </div>,
    document.body,
  );
}

function IconCircleButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-foreground shadow-[0_2px_12px_rgba(44,40,37,0.08)] transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_6px_24px_rgba(44,40,37,0.12)] disabled:pointer-events-none disabled:opacity-35 md:h-14 md:w-14"
    >
      {children}
    </button>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function ChevronRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
