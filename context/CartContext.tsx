"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AddonInputKind } from "@/data/productAddons";
import { getAddonById } from "@/data/productAddons";

export const FREE_SHIPPING_THRESHOLD_PKR = 8000;

export type ProductCartLine = {
  kind: "product";
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

export type AddonCartLine = {
  kind: "addon";
  id: string;
  title: string;
  image: string;
  inStock: boolean;
  addonId: string;
  productSlug: string;
  unitPrice: number;
  amount: number;
  input: AddonInputKind;
};

export type CartLine = ProductCartLine | AddonCartLine;

export function isAddonCartLine(line: CartLine): line is AddonCartLine {
  return line.kind === "addon";
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  addItem: (item: {
    id: string;
    title: string;
    price: number;
    image: string;
    inStock?: boolean;
    quantity?: number;
  }) => void;
  addBundleWithAddons: (bundle: {
    productSlug: string;
    productTitle: string;
    productPrice: number;
    productImage: string;
    selections: { addonId: string; amount: number }[];
  }) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeLine: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Demo line so the bag matches your design out of the box; clear by removing items. */
const SEED_LINES: CartLine[] = [
  {
    kind: "product",
    id: "seed-lawn-suit",
    title: "3 PIECE - EMBROIDERED LAWN SUIT",
    price: 6590,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop",
    inStock: true,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(SEED_LINES);
  const [bagOpen, setBagOpen] = useState(false);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        if (l.kind === "addon") return sum + l.unitPrice * l.amount;
        return sum + l.price * l.quantity;
      }, 0),
    [lines],
  );

  const itemCount = useMemo(
    () =>
      lines.reduce((sum, l) => {
        if (l.kind === "addon") {
          return (
            sum + (l.input === "quantity" ? Math.max(1, Math.round(l.amount)) : 1)
          );
        }
        return sum + l.quantity;
      }, 0),
    [lines],
  );

  const addItem = useCallback(
    (item: {
      id: string;
      title: string;
      price: number;
      image: string;
      inStock?: boolean;
      quantity?: number;
    }) => {
      const q = item.quantity ?? 1;
      setLines((prev) => {
        const i = prev.findIndex(
          (l) => l.kind === "product" && l.id === item.id,
        );
        if (i >= 0) {
          const next = [...prev];
          const cur = next[i];
          if (cur.kind === "addon") return prev;
          next[i] = { ...cur, quantity: cur.quantity + q };
          return next;
        }
        return [
          ...prev,
          {
            kind: "product",
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            inStock: item.inStock ?? true,
            quantity: q,
          },
        ];
      });
      setBagOpen(true);
    },
    [],
  );

  const addBundleWithAddons = useCallback(
    (bundle: {
      productSlug: string;
      productTitle: string;
      productPrice: number;
      productImage: string;
      selections: { addonId: string; amount: number }[];
    }) => {
      setLines((prev) => {
        let next = [...prev];
        const pid = bundle.productSlug;
        const pi = next.findIndex((l) => l.kind === "product" && l.id === pid);
        if (pi >= 0) {
          const cur = next[pi];
          if (cur.kind === "product") {
            next[pi] = { ...cur, quantity: cur.quantity + 1 };
          }
        } else {
          next.push({
            kind: "product",
            id: pid,
            title: bundle.productTitle,
            price: bundle.productPrice,
            image: bundle.productImage,
            inStock: true,
            quantity: 1,
          });
        }

        for (const sel of bundle.selections) {
          const def = getAddonById(sel.addonId);
          if (!def) continue;
          const aid = `addon:${bundle.productSlug}:${sel.addonId}`;
          const ai = next.findIndex((l) => l.kind === "addon" && l.id === aid);
          if (ai >= 0) {
            const cur = next[ai];
            if (cur.kind === "addon") {
              next[ai] = {
                ...cur,
                amount: cur.amount + sel.amount,
              };
            }
          } else {
            next.push({
              kind: "addon",
              id: aid,
              title: def.label,
              image: def.image,
              inStock: true,
              addonId: sel.addonId,
              productSlug: bundle.productSlug,
              unitPrice: def.pricePerUnit,
              amount: sel.amount,
              input: def.input,
            });
          }
        }
        return next;
      });
      setBagOpen(true);
    },
    [],
  );

  const increment = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        if (l.kind === "addon") {
          if (l.input === "meters") {
            const nextAmt = Math.min(
              50,
              Math.round((l.amount + 0.25) * 100) / 100,
            );
            return { ...l, amount: nextAmt };
          }
          return { ...l, amount: Math.min(999, l.amount + 1) };
        }
        return { ...l, quantity: l.quantity + 1 };
      }),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((l) => {
        if (l.id !== id) return [l];
        if (l.kind === "addon") {
          if (l.input === "meters") {
            const next = Math.round((l.amount - 0.25) * 100) / 100;
            if (next < 0.25) return [];
            return [{ ...l, amount: next }];
          }
          if (l.amount <= 1) return [];
          return [{ ...l, amount: l.amount - 1 }];
        }
        if (l.quantity <= 1) return [];
        return [{ ...l, quantity: l.quantity - 1 }];
      }),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      bagOpen,
      setBagOpen,
      addItem,
      addBundleWithAddons,
      increment,
      decrement,
      removeLine,
    }),
    [
      lines,
      itemCount,
      subtotal,
      bagOpen,
      addItem,
      addBundleWithAddons,
      increment,
      decrement,
      removeLine,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
