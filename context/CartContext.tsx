"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const FREE_SHIPPING_THRESHOLD_PKR = 8000;

export type CartLine = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (item: {
    id: string;
    title: string;
    price: number;
    image: string;
    inStock?: boolean;
    quantity?: number;
  }) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeLine: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Demo line so the bag matches your design out of the box; clear by removing items. */
const SEED_LINES: CartLine[] = [
  {
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

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
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
        const i = prev.findIndex((l) => l.id === item.id);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], quantity: next[i].quantity + q };
          return next;
        }
        return [
          ...prev,
          {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            inStock: item.inStock ?? true,
            quantity: q,
          },
        ];
      });
    },
    [],
  );

  const increment = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, quantity: l.quantity + 1 } : l,
      ),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((l) => {
        if (l.id !== id) return [l];
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
      addItem,
      increment,
      decrement,
      removeLine,
    }),
    [lines, itemCount, subtotal, addItem, increment, decrement, removeLine],
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
