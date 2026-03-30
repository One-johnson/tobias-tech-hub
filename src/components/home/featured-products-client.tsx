"use client";

import dynamic from "next/dynamic";

import type { Product } from "@/lib/catalog";

const FeaturedProducts = dynamic(
  () => import("@/components/home/featured-products").then((m) => m.FeaturedProducts),
  { ssr: false },
);

export function FeaturedProductsClient({ products }: { products: Product[] }) {
  return <FeaturedProducts products={products} />;
}

