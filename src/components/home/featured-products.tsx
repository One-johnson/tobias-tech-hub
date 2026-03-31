"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Tab = "Best sellers" | "New arrivals" | "Deals";

function byCategoryMix(products: Product[]) {
  const laptops = products.filter((p) => p.category === "Laptops");
  const accessories = products.filter((p) => p.category === "Accessories");
  const networking = products.filter((p) => p.category === "Networking");
  return [...laptops.slice(0, 2), ...accessories.slice(0, 2), ...networking.slice(0, 2)].filter(Boolean);
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [tab, setTab] = React.useState<Tab>("Best sellers");

  const selection = React.useMemo(() => {
    if (tab === "Best sellers") return byCategoryMix(products);
    if (tab === "New arrivals") return [...products].slice(0, 6);
    return [...products].slice(0, 6).reverse();
  }, [products, tab]);

  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-200/90">Featured</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Featured products
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Curated picks across laptops, accessories, and networking.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex w-full rounded-xl border border-white/10 bg-black/20 p-1 sm:w-auto">
            {(["Best sellers", "New arrivals", "Deals"] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={tab === t ? "secondary" : "ghost"}
                className="flex-1 sm:flex-none"
                onClick={() => setTab(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center text-sm font-semibold text-emerald-200 hover:text-emerald-100"
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <Carousel options={{ loop: selection.length > 3, align: "start" }}>
          <CarouselContent className="-ml-1 gap-3 px-3 sm:ml-0 sm:gap-4 sm:px-0">
            {selection.map((p) => (
              <CarouselItem
                key={p.id}
                className="min-w-0 pl-1 max-sm:flex-[0_0_calc((100vw-2.75rem)/2)] sm:pl-2 sm:flex-[0_0_55%] lg:flex-[0_0_33%]"
              >
                <ProductCard product={p} className="h-full w-full max-w-none mx-0" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

