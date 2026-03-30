"use client";

import * as React from "react";

import type { Product } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/state/cart";

export function AddToCartPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1">
        <p className="text-xs font-medium text-white/60">Qty</p>
        <Input
          type="number"
          min={1}
          max={99}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-20"
        />
      </div>
      <Button
        onClick={() => {
          add(product, qty);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 900);
        }}
        disabled={!product.inStock}
      >
        {added ? "Added" : "Add to cart"}
      </Button>
    </div>
  );
}

