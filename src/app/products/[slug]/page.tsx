import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Star, Truck } from "lucide-react";

import { getProductBySlug } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";
import { productOrderWhatsAppUrl, WHATSAPP_PHONE_E164 } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddToCartPanel } from "@/components/catalog/add-to-cart-panel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const whatsappOrderHref = productOrderWhatsAppUrl(product);
  const gallery =
    product.images.length > 0
      ? product.images
      : [{ src: "/products/laptop-1.svg", alt: product.name }];

  return (
    <div className="container-page py-10 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
        <Link className="transition hover:text-white" href="/products">
          Products
        </Link>
        <span aria-hidden>/</span>
        <Link className="transition hover:text-white" href={`/products?category=${product.category}`}>
          {product.category}
        </Link>
        <span aria-hidden>/</span>
        <span className="max-w-[min(100%,42rem)] truncate text-white/85">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <Carousel options={{ loop: gallery.length > 1, align: "start" }} className="relative">
              <CarouselContent className="gap-0">
                {gallery.map((img) => (
                  <CarouselItem key={img.src} className="flex-[0_0_100%] p-0">
                    <div className="relative aspect-[4/3] w-full bg-black/40">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {gallery.length > 1 ? (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              ) : null}
            </Carousel>
          </div>
          <p className="mt-3 text-center text-xs text-white/45 lg:text-left">
            Swipe or use arrows to view all photos. Actual finish may vary by batch.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] md:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="blue">{product.brand}</Badge>
                <Badge variant="neutral">{product.category}</Badge>
                {product.inStock ? (
                  <Badge variant="green">In stock</Badge>
                ) : (
                  <Badge>Out of stock</Badge>
                )}
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {product.name}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <span className="inline-flex items-center gap-0.5 text-amber-200/95">
                  <Star className="h-4 w-4 fill-amber-200/90 text-amber-200/90" aria-hidden />
                  <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">Rated by buyers</span>
              </p>

              <p className="mt-4 text-sm leading-7 text-white/75">{product.shortDescription}</p>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-white/50">Price</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-white">
                  {formatGHS(product.priceGhs)}
                </p>
                <p className="mt-2 flex items-center gap-2 text-xs text-white/55">
                  <Truck className="h-3.5 w-3.5 text-emerald-200/80" aria-hidden />
                  Delivery &amp; pickup available in Accra — confirm on WhatsApp.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  asChild
                  className="h-11 w-full gap-2 bg-emerald-400 text-black hover:bg-emerald-300"
                >
                  <a href={whatsappOrderHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Order on WhatsApp
                  </a>
                </Button>
                <p className="text-center text-xs text-white/45">
                  Opens chat with{" "}
                  <span className="text-white/65">{formatWhatsAppDisplay()}</span> — we&apos;ll confirm
                  your order and arrange payment.
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs font-medium text-white/55">Or add to cart</p>
                    <p className="mt-1 text-xs text-white/45">Checkout flow demo on this site.</p>
                  </div>
                  <AddToCartPanel product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
        <Card className="border-white/10 bg-black/25 lg:col-span-5">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>What you get and who it&apos;s for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-white/75">
            <p>{product.description}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Key highlights
              </p>
              <ul className="mt-3 grid gap-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/90" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-black/25 lg:col-span-7">
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Technical details — ask on WhatsApp if you need clarification</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Separator className="mb-0 bg-white/10" />
            <dl>
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={[
                    "grid grid-cols-1 gap-1 px-6 py-3 sm:grid-cols-[minmax(0,40%)_1fr] sm:gap-8",
                    i % 2 === 0 ? "bg-white/[0.03]" : "",
                  ].join(" ")}
                >
                  <dt className="text-sm font-medium text-white/55">{s.label}</dt>
                  <dd className="text-sm text-white/90">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-white/10 px-6 py-4">
              <Button asChild variant="outline" className="w-full gap-2 sm:w-auto">
                <a href={whatsappOrderHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Ask about this product on WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3 border-t border-white/10 pt-10 md:justify-start">
        <Button asChild variant="outline">
          <Link href="/products">← Back to catalog</Link>
        </Button>
        <Button asChild variant="secondary">
          <a href={whatsappOrderHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
            Order on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

function formatWhatsAppDisplay() {
  const n = WHATSAPP_PHONE_E164;
  return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`;
}
