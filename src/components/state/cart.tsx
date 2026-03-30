"use client";

import * as React from "react";

import type { Product } from "@/lib/catalog";
import { safeJsonParse } from "@/lib/storage";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tth.cart.v1";

function clampQty(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.min(99, Math.floor(qty)));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({ items: [] });

  React.useEffect(() => {
    const parsed = safeJsonParse<CartState>(localStorage.getItem(STORAGE_KEY));
    if (parsed?.items) setState({ items: parsed.items });
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = React.useMemo<CartContextValue>(() => {
    const count = state.items.reduce((acc, i) => acc + i.quantity, 0);
    return {
      items: state.items,
      count,
      add: (product, quantity = 1) => {
        setState((prev) => {
          const qty = clampQty(quantity);
          const existing = prev.items.find((i) => i.productId === product.id);
          if (!existing) return { items: [...prev.items, { productId: product.id, quantity: qty }] };
          return {
            items: prev.items.map((i) =>
              i.productId === product.id ? { ...i, quantity: clampQty(i.quantity + qty) } : i,
            ),
          };
        });
      },
      remove: (productId) => {
        setState((prev) => ({ items: prev.items.filter((i) => i.productId !== productId) }));
      },
      setQuantity: (productId, quantity) => {
        setState((prev) => ({
          items: prev.items.map((i) =>
            i.productId === productId ? { ...i, quantity: clampQty(quantity) } : i,
          ),
        }));
      },
      clear: () => setState({ items: [] }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

