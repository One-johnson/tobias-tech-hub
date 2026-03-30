"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { products } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/state/cart";

export default function CartPage() {
  const { items, setQuantity, remove, clear } = useCart();

  const lines = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { product, quantity: i.quantity } : null;
    })
    .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number }>;

  const subtotal = lines.reduce((acc, l) => acc + l.product.priceGhs * l.quantity, 0);

  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-emerald-200/90">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Your Cart
          </h1>
          <p className="mt-3 text-white/70">Review items and adjust quantities.</p>
        </div>
        {lines.length ? (
          <Button variant="outline" onClick={clear}>
            Clear cart
          </Button>
        ) : null}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-white/10 bg-black/20">
            {lines.length ? (
              <div className="divide-y divide-white/10">
                {lines.map(({ product, quantity }) => (
                  <div key={product.id} className="flex flex-col gap-4 p-5 sm:flex-row">
                    <div className="relative h-24 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:w-36">
                      <Image
                        src={product.images[0]?.src ?? "/products/laptop-1.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-sm font-semibold text-white hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-sm text-white/70">
                          {formatGHS(product.priceGhs)} each
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <p className="text-xs font-medium text-white/60">Qty</p>
                          <Input
                            type="number"
                            min={1}
                            max={99}
                            value={quantity}
                            onChange={(e) => setQuantity(product.id, Number(e.target.value))}
                            className="h-9 w-24"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-sm font-semibold text-white">
                          {formatGHS(product.priceGhs * quantity)}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => remove(product.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8">
                <p className="text-white/70">Your cart is empty.</p>
                <Button asChild className="mt-4">
                  <Link href="/products">Browse products</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-semibold text-white">Order summary</p>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Subtotal</span>
              <span className="font-semibold text-white">{formatGHS(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs text-white/50">
              Delivery and final totals can be confirmed via contact/WhatsApp.
            </p>
            <Button asChild className="mt-6 w-full" disabled={!lines.length}>
              <Link href="/contact">Request quote</Link>
            </Button>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

