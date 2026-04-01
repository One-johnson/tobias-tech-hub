import type { Metadata } from "next";
import { products } from "@/lib/catalog";
import { BrandsCarousel } from "@/components/home/brands-carousel";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { FeaturedProductsClient } from "@/components/home/featured-products-client";
import { ServicesSection } from "@/components/home/services";
import { ShopByCategory } from "@/components/home/shop-by-category";
import { AboutTeaser } from "@/components/home/about-teaser";
import { FaqSection } from "@/components/home/faq";
import { CtaStrip } from "@/components/home/cta-strip";
import { ReasonsSection } from "@/components/home/reasons-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export const metadata: Metadata = {
  title: "Powering your digital world",
  description:
    "Tobias Tech Hub—premium laptops, accessories, and storage in Accra, Ghana. Shop trusted brands with local support.",
};

export default function Home() {
  return (
    <div className="noise">
      <section className="container-page py-16 md:py-24">
        <HeroCarousel />
      </section>

      <FeaturedProductsClient products={products} />

      <ShopByCategory />

      <ReasonsSection />

      <ServicesSection />

      <section className="container-page pb-16 md:pb-24">
        <BrandsCarousel />
      </section>

      <AboutTeaser />

      <TestimonialsSection />

      <FaqSection />
      <CtaStrip />
    </div>
  );
}
