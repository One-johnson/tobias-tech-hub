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
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  /** e.g. carousel: fill slide (`max-w-none w-full`) on small screens */
  className?: string;
}) {
  const { add } = useCart();
  return (
    <Card
      className={cn(
        "mx-auto w-full max-w-[280px] overflow-hidden noise sm:mx-0 sm:max-w-none",
        className,
      )}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full bg-black/20 sm:aspect-[16/11]">
          <Image
            src={product.images[0]?.src ?? "/products/laptop-1.svg"}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 55vw, 380px"
            className="object-cover"
          />
          <div className="absolute left-1.5 top-1.5 flex flex-wrap items-center gap-1 sm:left-2 sm:top-2 sm:gap-1.5">
            <Badge variant="blue" className="px-1.5 py-0 text-[9px] sm:px-2 sm:py-0.5 sm:text-[10px]">
              {product.brand}
            </Badge>
            <Badge variant="neutral" className="px-1.5 py-0 text-[9px] sm:px-2 sm:py-0.5 sm:text-[10px]">
              {product.category}
            </Badge>
          </div>
          {!product.inStock ? (
            <div className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2">
              <Badge variant="default" className="px-1.5 py-0 text-[9px] sm:px-2 sm:py-0.5 sm:text-[10px]">
                Out of stock
              </Badge>
            </div>
          ) : null}
        </div>
      </Link>

      <CardContent className="px-4 pb-3 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <Link href={`/products/${product.slug}`} className="min-w-0">
            <p className="line-clamp-2 text-xs font-semibold leading-snug text-white sm:text-sm sm:leading-5">
              {product.name}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/70 sm:text-xs sm:leading-5">
              {product.shortDescription}
            </p>
          </Link>
          <div className="flex shrink-0 items-center gap-0.5 text-[10px] text-white/70 sm:gap-1 sm:text-[11px]">
            <Star className="h-3 w-3 text-emerald-300 sm:h-3.5 sm:w-3.5" />
            <span className="font-medium text-white">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold tracking-tight text-white sm:mt-3 sm:text-base">
          {formatGHS(product.priceGhs)}
        </p>
      </CardContent>

      <CardFooter className="gap-2 p-4 pt-0 sm:p-6 sm:pt-0">
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

