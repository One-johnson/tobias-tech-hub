import type { Product } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";

/** Business WhatsApp in E.164 form (include country code, with leading +). */
export const WHATSAPP_PHONE_E164 = "+233553301044" as const;

export function whatsappUrl(message: string) {
  const digits = WHATSAPP_PHONE_E164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function productPageLink(product: Product) {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (base) return `${base}/products/${product.slug}`;
  return `/products/${product.slug}`;
}

export function buildProductOrderMessage(product: Product) {
  return [
    "Hi Tobias Tech Hub, I'd like to place an order:",
    "",
    `Product: ${product.name}`,
    `Reference: ${product.slug}`,
    `Brand: ${product.brand} · Category: ${product.category}`,
    `Listed price: ${formatGHS(product.priceGhs)}`,
    `Availability: ${product.inStock ? "In stock (as shown on site)" : "Listed as out of stock — please confirm"}`,
    "",
    `Product link: ${productPageLink(product)}`,
    "",
    "Please confirm availability, payment options, and delivery or pickup in Accra. Thank you.",
  ].join("\n");
}

export function productOrderWhatsAppUrl(product: Product) {
  return whatsappUrl(buildProductOrderMessage(product));
}
