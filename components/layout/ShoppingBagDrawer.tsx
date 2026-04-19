"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, type ReactNode } from "react";
import {
  FREE_SHIPPING_THRESHOLD_PKR,
  isAddonCartLine,
  useCart,
} from "@/context/CartContext";
import type { AddonInputKind } from "@/data/productAddons";
import { formatRs } from "@/lib/format";
import emptyShoppingCart from "@/components/icons/emptyShoppingCart.png";

function addonAmountLabel(amount: number, input: AddonInputKind): string {
  if (input === "quantity") return String(Math.max(1, Math.round(amount)));
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/\.?0+$/, "");
}

type ShoppingBagDrawerProps = {
  open: boolean;
  onClose: () => void;
  panelId: string;
};

export function ShoppingBagDrawer({
  open,
  onClose,
  panelId,
}: ShoppingBagDrawerProps) {
  const titleId = useId();
  const { lines, subtotal, increment, decrement, removeLine } = useCart();

  const hasItems = lines.length > 0;
  const freeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD_PKR;
  const amountLeft = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - subtotal);
  const progressPct = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD_PKR) * 100,
  );

  return (
    <div
      className={`fixed inset-0 z-[100] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-[2px] transition-[opacity] duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="Close shopping bag"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-y-0 right-0 flex h-full w-[min(100%,35rem)] flex-col bg-white shadow-2xl motion-reduce:transition-none ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)]`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5 sm:h-16 sm:px-6">
          <h2
            id={titleId}
            className="text-sm font-semibold uppercase tracking-[0.12em] text-[#000000]"
          >
            Shopping Bag
          </h2>
          <button
            type="button"
            className="flex h-10 w-10 -mr-2 items-center justify-center text-[#000000] transition-colors hover:bg-black/5"
            aria-label="Close shopping bag"
            onClick={onClose}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {!hasItems ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-6 text-center [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
            <Image
              src={emptyShoppingCart}
              alt=""
              width={emptyShoppingCart.width}
              height={emptyShoppingCart.height}
              className="mb-4 h-auto w-[min(100%,7.5rem)] shrink-0 object-contain [transform:translateZ(0)]"
              sizes="120px"
            />
            <p className="mb-5 text-base font-normal text-[#000000]">
              Your Bag is Empty
            </p>
            <Link
              href="/shop"
              onClick={onClose}
              className="inline-flex min-w-[11rem] items-center justify-center bg-[#000000] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <section className="border-b border-line px-5 py-4 sm:px-6">
                {freeShippingUnlocked ? (
                  <p className="text-center text-[11px] font-bold uppercase leading-snug tracking-wide text-green-700">
                    Congrats 🎉! You have earned free shipping
                  </p>
                ) : (
                  <>
                    <p className="text-center text-[11px] font-bold uppercase tracking-wide text-[#000000]">
                      Free shipping over {formatRs(FREE_SHIPPING_THRESHOLD_PKR)}
                    </p>
                    <p className="mt-1.5 text-center text-xs text-[#555555]">
                      Amount left for free shipping: {formatRs(amountLeft)}
                    </p>
                  </>
                )}
                <div className="mt-3 flex justify-between text-[10px] font-medium tabular-nums text-[#000000]">
                  <span>{formatRs(0)}</span>
                  <span>{formatRs(FREE_SHIPPING_THRESHOLD_PKR)}</span>
                </div>
                <div
                  className="mt-1.5 h-2.5 w-full overflow-hidden bg-[#e5e5e5]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={FREE_SHIPPING_THRESHOLD_PKR}
                  aria-valuenow={Math.round(
                    Math.min(subtotal, FREE_SHIPPING_THRESHOLD_PKR),
                  )}
                  aria-label="Progress toward free shipping"
                >
                  <div
                    className="h-full transition-[width,background-color] duration-300 ease-out"
                    style={{
                      width: `${progressPct}%`,
                      backgroundColor: freeShippingUnlocked ? "#16a34a" : "#ea580c",
                    }}
                  />
                </div>
              </section>

              <ul className="divide-y divide-line">
                {lines.map((line) => {
                  const addon = isAddonCartLine(line);
                  const lineTotal = addon
                    ? line.unitPrice * line.amount
                    : line.price * line.quantity;
                  const unitOrQtyLabel = addon
                    ? addonAmountLabel(line.amount, line.input)
                    : String(line.quantity);

                  return (
                    <li
                      key={line.id}
                      className="flex gap-3 px-5 py-4 sm:px-6"
                    >
                      <div className="relative h-[5.5rem] w-[4.5rem] shrink-0 bg-[#f5f5f5]">
                        <Image
                          src={line.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="90px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        {addon ? (
                          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#888888]">
                            Add-on
                          </p>
                        ) : null}
                        <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#000000] sm:text-[11px]">
                          {line.title}
                        </p>
                        <p className="mt-1 text-xs tabular-nums text-[#888888]">
                          {addon ? (
                            <>
                              {formatRs(lineTotal)}
                              <span className="ml-1.5 font-normal">
                                ({formatRs(line.unitPrice)}/
                                {line.input === "meters" ? "m" : "pc"})
                              </span>
                            </>
                          ) : (
                            formatRs(line.price)
                          )}
                        </p>
                        {line.inStock ? (
                          <p className="mt-0.5 text-[11px] font-medium text-green-600">
                            In Stock
                          </p>
                        ) : null}
                        <div className="mt-2.5">
                          <div className="flex items-center gap-2">
                            <QtyCircleButton
                              label={
                                addon
                                  ? "Decrease amount"
                                  : "Decrease quantity"
                              }
                              onClick={() => decrement(line.id)}
                            >
                              <MinusGlyph />
                            </QtyCircleButton>
                            <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-[#000000]">
                              {unitOrQtyLabel}
                            </span>
                            <QtyCircleButton
                              label={
                                addon
                                  ? "Increase amount"
                                  : "Increase quantity"
                              }
                              onClick={() => increment(line.id)}
                            >
                              <PlusGlyph />
                            </QtyCircleButton>
                          </div>
                          <button
                            type="button"
                            className="mt-2 flex h-8 w-8 items-center justify-center text-[#000000] transition-colors hover:bg-black/5"
                            aria-label={`Remove ${line.title} from bag`}
                            onClick={() => removeLine(line.id)}
                          >
                            <TrashGlyph />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <footer className="shrink-0 border-t border-line bg-white px-5 py-4 sm:px-6">
              <div className="flex items-baseline justify-between gap-4 text-sm font-bold uppercase tracking-wide text-[#000000]">
                <span>Subtotal:</span>
                <span className="tabular-nums">{formatRs(subtotal)}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center bg-[#000000] py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[11px]"
                >
                  View Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center bg-[#000000] py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[11px]"
                >
                  Checkout
                </Link>
              </div>
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-1 block w-full bg-[#000000] py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[11px]"
              >
                Continue Shopping
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

function QtyCircleButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#000000] text-white transition-opacity hover:opacity-85"
    >
      {children}
    </button>
  );
}

function MinusGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6h18M8 6V4h8v2m-9 0v14a1 1 0 001 1h10a1 1 0 001-1V6M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
