import type { Metadata } from "next";
import { products, brands, categories } from "@/lib/catalog";
import { CategoryImageCarousels } from "@/components/catalog/category-image-carousels";
import { ProductsGrid } from "@/components/catalog/products-grid";
import { ProductsPageSupport } from "@/components/catalog/products-page-support";

type ProductsSearchParams = {
  category?: string;
  q?: string;
  brand?: string;
  stock?: string;
  sort?: string;
  min?: string;
  max?: string;
  view?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: ProductsSearchParams | Promise<ProductsSearchParams>;
}): Promise<Metadata> {
  const sp = searchParams ? await Promise.resolve(searchParams) : undefined;
  const initialCategory =
    sp?.category && (categories as readonly string[]).includes(sp.category)
      ? (sp.category as (typeof categories)[number])
      : "All";

  const title =
    initialCategory === "All" ? "Products catalog" : `${initialCategory} · Catalog`;
  const description =
    initialCategory === "All"
      ? "Browse laptops, accessories, monitors, and storage in Accra. Filter, sort, and order via WhatsApp."
      : `Shop ${initialCategory.toLowerCase()} from Tobias Tech Hub in Accra. Compare brands, prices, and stock—confirm on WhatsApp.`;

  return { title, description };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: ProductsSearchParams | Promise<ProductsSearchParams>;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams) : undefined;

  const initialCategory =
    sp?.category && (categories as readonly string[]).includes(sp.category)
      ? (sp.category as (typeof categories)[number])
      : "All";
  const initialQuery = sp?.q ?? "";
  const initialBrands =
    sp?.brand
      ? sp.brand
          .split(",")
          .map((s) => s.trim())
          .filter((b) => (brands as readonly string[]).includes(b))
      : [];
  const initialInStockOnly = sp?.stock === "1";
  const initialSort =
    sp?.sort === "price_asc" || sp?.sort === "price_desc" || sp?.sort === "rating_desc"
      ? (sp.sort as "price_asc" | "price_desc" | "rating_desc")
      : "featured";
  const initialMinPrice = sp?.min ? Number(sp.min) : undefined;
  const initialMaxPrice = sp?.max ? Number(sp.max) : undefined;
  const initialView = sp?.view === "grid" ? "grid" : "carousel";

  const categoryTitle =
    initialCategory === "All" ? "Products" : `${initialCategory}`;
  const categoryCopy =
    initialCategory === "Laptops"
      ? "Choose the right performance tier for school, work, and business."
      : initialCategory === "Accessories"
        ? "Complete your setup with reliable essentials and productivity upgrades."
        : initialCategory === "All"
            ? "Explore premium laptops, accessories, monitors, and storage—curated for performance, reliability, and value."
            : "Explore curated options with premium quality and support.";

  return (
    <div className="container-page min-w-0 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-200/90">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {categoryTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-white/70">{categoryCopy}</p>
      </div>

      <CategoryImageCarousels className="mb-10" />

      <ProductsGrid
        products={products}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
        initialBrands={initialBrands}
        initialInStockOnly={initialInStockOnly}
        initialSort={initialSort}
        initialMinPrice={initialMinPrice}
        initialMaxPrice={initialMaxPrice}
        initialView={initialView}
      />

      <ProductsPageSupport />
    </div>
  );
}

