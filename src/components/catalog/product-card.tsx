"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { Product } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/components/state/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <Card className="overflow-hidden noise">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[16/11] w-full bg-black/20">
          <Image
            src={product.images[0]?.src ?? "/products/laptop-1.svg"}
            alt={product.images[0]?.alt ?? product.name}
            fill
            className="object-cover"
          />
          <div className="absolute left-2 top-2 flex items-center gap-1.5">
            <Badge variant="blue" className="px-2 py-0.5 text-[10px]">
              {product.brand}
            </Badge>
            <Badge variant="neutral" className="px-2 py-0.5 text-[10px]">
              {product.category}
            </Badge>
          </div>
          {!product.inStock ? (
            <div className="absolute right-2 top-2">
              <Badge variant="default" className="px-2 py-0.5 text-[10px]">
                Out of stock
              </Badge>
            </div>
          ) : null}
        </div>
      </Link>

      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/products/${product.slug}`} className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-5 text-white">
              {product.name}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/70">
              {product.shortDescription}
            </p>
          </Link>
          <div className="flex shrink-0 items-center gap-1 text-[11px] text-white/70">
            <Star className="h-3.5 w-3.5 text-emerald-300" />
            <span className="font-medium text-white">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-3 text-base font-semibold tracking-tight text-white">
          {formatGHS(product.priceGhs)}
        </p>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild size="sm" variant="secondary" className="flex-1">
          <Link href={`/products/${product.slug}`}>View</Link>
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => add(product, 1)}
          disabled={!product.inStock}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

