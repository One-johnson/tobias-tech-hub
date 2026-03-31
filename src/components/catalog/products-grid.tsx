"use client";

import * as React from "react";
import { LayoutGrid, Rows3, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import type { Product, ProductCategory } from "@/lib/catalog";
import { brands, categories } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/catalog/product-card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CategoryFilter = ProductCategory | "All";
type SortKey = "featured" | "price_asc" | "price_desc" | "rating_desc";
type ViewMode = "carousel" | "grid";

function sortLabel(sort: SortKey) {
  if (sort === "featured") return "Featured";
  if (sort === "price_asc") return "Price ↑";
  if (sort === "price_desc") return "Price ↓";
  return "Top rated";
}

function clampPrice(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(999999, Math.floor(n)));
}

/** True when every key/value matches (order-independent). */
function searchStringsEqual(a: string, b: string) {
  const pa = new URLSearchParams(a);
  const pb = new URLSearchParams(b);
  const keys = new Set<string>([...pa.keys(), ...pb.keys()]);
  for (const key of keys) {
    if (pa.get(key) !== pb.get(key)) return false;
  }
  return true;
}

export function ProductsGrid({
  products,
  initialCategory = "All",
  initialQuery = "",
  initialBrands = [],
  initialInStockOnly = false,
  initialSort = "featured",
  initialMinPrice,
  initialMaxPrice,
  initialView = "carousel",
}: {
  products: Product[];
  initialCategory?: CategoryFilter;
  initialQuery?: string;
  initialBrands?: string[];
  initialInStockOnly?: boolean;
  initialSort?: SortKey;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  initialView?: ViewMode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from server URL props so the first client render matches SSR (avoids hydration mismatch).
  const [query, setQuery] = React.useState(initialQuery ?? "");
  const [category, setCategory] = React.useState<CategoryFilter>(initialCategory ?? "All");
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(initialBrands ?? []);
  const [inStockOnly, setInStockOnly] = React.useState(initialInStockOnly ?? false);
  const [sort, setSort] = React.useState<SortKey>(initialSort ?? "featured");
  const [minPrice, setMinPrice] = React.useState<number | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>(initialMaxPrice);
  const [view, setView] = React.useState<ViewMode>(initialView ?? "carousel");
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const serverBrandsKey = JSON.stringify(initialBrands ?? []);

  React.useEffect(() => {
    const nextBrands = JSON.parse(serverBrandsKey) as string[];

    setQuery((q) => (q === initialQuery ? q : initialQuery));
    setCategory((c) => (c === initialCategory ? c : initialCategory));
    setSelectedBrands((prev) => {
      if (prev.length === nextBrands.length && prev.every((b, i) => b === nextBrands[i]))
        return prev;
      return nextBrands;
    });
    setInStockOnly((v) => (v === initialInStockOnly ? v : initialInStockOnly));
    setSort((s) => (s === initialSort ? s : initialSort));
    setMinPrice((m) => (m === initialMinPrice ? m : initialMinPrice));
    setMaxPrice((m) => (m === initialMaxPrice ? m : initialMaxPrice));
    setView((vw) => (vw === initialView ? vw : initialView));
  }, [
    serverBrandsKey,
    initialCategory,
    initialInStockOnly,
    initialMaxPrice,
    initialMinPrice,
    initialQuery,
    initialSort,
    initialView,
  ]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = typeof minPrice === "number" ? clampPrice(minPrice) : undefined;
    const max = typeof maxPrice === "number" ? clampPrice(maxPrice) : undefined;

    const base = products.filter((p) => {
      const matchesCategory = category === "All" ? true : p.category === category;
      const matchesQuery = !q
        ? true
        : `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q);
      const matchesBrand = selectedBrands.length ? selectedBrands.includes(p.brand) : true;
      const matchesStock = inStockOnly ? p.inStock : true;
      const matchesMin = typeof min === "number" ? p.priceGhs >= min : true;
      const matchesMax = typeof max === "number" ? p.priceGhs <= max : true;

      return (
        matchesCategory &&
        matchesQuery &&
        matchesBrand &&
        matchesStock &&
        matchesMin &&
        matchesMax
      );
    });

    const sorted = [...base];
    sorted.sort((a, b) => {
      if (sort === "price_asc") return a.priceGhs - b.priceGhs;
      if (sort === "price_desc") return b.priceGhs - a.priceGhs;
      if (sort === "rating_desc") return b.rating - a.rating;
      return 0;
    });

    return sorted;
  }, [products, query, category, selectedBrands, inStockOnly, sort, minPrice, maxPrice]);

  // Sync UI state -> URL for shareable links. Debounced to avoid hammering the dev server /
  // RSC refetch. Skip replace when the query is already equivalent to avoid replace loops.
  const didHydrateFromUrl = React.useRef(false);
  const urlSyncTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (!didHydrateFromUrl.current) {
      didHydrateFromUrl.current = true;
    }

    if (urlSyncTimer.current) clearTimeout(urlSyncTimer.current);

    urlSyncTimer.current = setTimeout(() => {
      urlSyncTimer.current = null;

      const params = new URLSearchParams(window.location.search);

      if (category === "All") params.delete("category");
      else params.set("category", category);

      const q = query.trim();
      if (!q) params.delete("q");
      else params.set("q", q);

      if (!selectedBrands.length) params.delete("brand");
      else params.set("brand", selectedBrands.join(","));

      if (!inStockOnly) params.delete("stock");
      else params.set("stock", "1");

      if (sort === "featured") params.delete("sort");
      else params.set("sort", sort);

      if (typeof minPrice === "number" && minPrice > 0)
        params.set("min", String(clampPrice(minPrice)));
      else params.delete("min");

      if (typeof maxPrice === "number" && maxPrice > 0)
        params.set("max", String(clampPrice(maxPrice)));
      else params.delete("max");

      if (view === "carousel") params.delete("view");
      else params.set("view", view);

      const next = params.toString();
      const current = window.location.search.startsWith("?")
        ? window.location.search.slice(1)
        : window.location.search;

      if (searchStringsEqual(next, current) && window.location.pathname === pathname) {
        return;
      }

      router.replace(next ? `${pathname}?${next}` : pathname);
    }, 320);

    return () => {
      if (urlSyncTimer.current) clearTimeout(urlSyncTimer.current);
    };
  }, [category, query, selectedBrands, inStockOnly, sort, minPrice, maxPrice, view, pathname, router]);

  const brandOptions = React.useMemo(() => {
    const present = new Set(products.map((p) => p.brand));
    return brands.filter((b) => present.has(b));
  }, [products]);

  return (
    <div className="grid min-w-0 gap-8">
      <div className="grid min-w-0 max-w-full gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search laptops, accessories, networking…"
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:col-span-5 md:justify-end">
          <Button
            size="sm"
            variant={category === "All" ? "secondary" : "outline"}
            onClick={() => setCategory("All")}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "secondary" : "outline"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
          <Button
            size="sm"
            variant={showAdvanced ? "secondary" : "outline"}
            onClick={() => setShowAdvanced((v) => !v)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
        {showAdvanced ? (
          <div className="grid gap-3 md:col-span-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="mb-2 text-xs font-semibold text-white/60">Brand</p>
              <div className="flex flex-wrap gap-2">
                {brandOptions.map((b) => {
                  const active = selectedBrands.includes(b);
                  return (
                    <Button
                      key={b}
                      size="sm"
                      variant={active ? "secondary" : "outline"}
                      onClick={() => {
                        setSelectedBrands((prev) =>
                          prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
                        );
                      }}
                    >
                      {b}
                    </Button>
                  );
                })}
                {selectedBrands.length ? (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedBrands([])}>
                    Clear
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="grid min-w-0 gap-2 md:col-span-3">
              <p className="text-xs font-semibold text-white/60">Price (GHS)</p>
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  inputMode="numeric"
                  placeholder="Min"
                  className="min-w-0 flex-1"
                  value={typeof minPrice === "number" ? String(minPrice) : ""}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                />
                <Input
                  inputMode="numeric"
                  placeholder="Max"
                  className="min-w-0 flex-1"
                  value={typeof maxPrice === "number" ? String(maxPrice) : ""}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
            <div className="grid gap-2 md:col-span-3">
              <p className="text-xs font-semibold text-white/60">Options</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant={inStockOnly ? "secondary" : "outline"}
                  onClick={() => setInStockOnly((v) => !v)}
                >
                  In stock only
                </Button>
                <Button
                  size="sm"
                  variant={view === "carousel" ? "secondary" : "outline"}
                  onClick={() => setView("carousel")}
                >
                  <Rows3 className="h-4 w-4" />
                  Carousel
                </Button>
                <Button
                  size="sm"
                  variant={view === "grid" ? "secondary" : "outline"}
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Grid
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="min-w-0 md:col-span-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
            <p className="shrink-0 text-sm text-white/70">
              Showing <span className="font-semibold text-white">{filtered.length}</span>{" "}
              items
            </p>
            <div className="flex min-w-0 w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
              <Badge
                variant="neutral"
                title={query ? `Query: ${query}` : undefined}
                className={cn(
                  "max-w-[min(100%,16rem)] min-w-0 justify-start truncate",
                  !query && "opacity-60",
                )}
              >
                Query: {query || "—"}
              </Badge>
              <Badge variant="neutral" className="shrink-0">
                Category: {category}
              </Badge>
              <Badge variant="neutral" className="shrink-0">
                Sort: {sortLabel(sort)}
              </Badge>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center min-[480px]:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["featured", "price_asc", "price_desc", "rating_desc"] as const).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={sort === s ? "secondary" : "outline"}
                  onClick={() => setSort(s)}
                >
                  {s === "featured"
                    ? "Featured"
                    : s === "price_asc"
                      ? "Price ↑"
                      : s === "price_desc"
                        ? "Price ↓"
                        : "Top rated"}
                </Button>
              ))}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="shrink-0 self-start min-[480px]:self-auto"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSelectedBrands([]);
                setInStockOnly(false);
                setSort("featured");
                setMinPrice(undefined);
                setMaxPrice(undefined);
                setView("carousel");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {filtered.length ? (
        view === "grid" ? (
          <div className="mx-auto grid w-full max-w-[1100px] justify-items-center gap-6 max-sm:gap-5 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <Carousel
            className="mx-auto w-full max-w-[1100px]"
            options={{
              loop: filtered.length > 3,
              align: "start",
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="-ml-1 gap-3 px-3 sm:-ml-2 sm:gap-4 sm:px-2">
              {filtered.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="min-w-0 pl-1 max-sm:flex-[0_0_calc((100vw-2.75rem)/2)] sm:pl-2 sm:flex-[0_0_46%] lg:flex-[0_0_28%]"
                >
                  <ProductCard product={p} className="h-full w-full max-w-none mx-0" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-8">
          <p className="text-sm font-semibold text-white">No results</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
            Try clearing filters or searching a different term. If you’re looking for a specific
            device, contact us and we can help source it.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSelectedBrands([]);
                setInStockOnly(false);
                setSort("featured");
                setMinPrice(undefined);
                setMaxPrice(undefined);
              }}
            >
              Clear filters
            </Button>
            <Button asChild variant="outline">
              <a href="/contact">Contact us</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

