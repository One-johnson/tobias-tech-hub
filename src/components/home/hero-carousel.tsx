"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

const slides = [
  {
    eyebrow: "Premium tech retail in Accra, Ghana",
    headline: "Powering Your Digital World",
    description:
      "Shop curated laptops, accessories, and storage from trusted brands—built for performance, reliability, and modern work.",
    imageSrc: "/products/p1-1.jpg",
    imageAlt: "Premium laptops and accessories",
    ctaPrimary: { label: "Shop Now", href: "/products" },
    ctaSecondary: { label: "Contact Us", href: "/contact" },
    rightTitle: "Browse best-sellers",
    rightBody:
      "Explore premium laptops, accessories, and monitors in one place.",
    rightPrimary: { label: "Open catalog", href: "/products" },
    rightSecondary: { label: "Talk to an expert", href: "/contact" },
  },
  {
    eyebrow: "Laptops for work and school",
    headline: "Performance that keeps up",
    description:
      "From business laptops to everyday productivity machines—get the right specs with expert guidance and transparent pricing.",
    imageSrc: "/products/p2-1.jpg",
    imageAlt: "Laptop on a desk",
    ctaPrimary: { label: "Browse Laptops", href: "/products?category=Laptops" },
    ctaSecondary: { label: "Ask for a Quote", href: "/contact" },
    rightTitle: "Laptop buying guide",
    rightBody:
      "Choose the right CPU, RAM, and storage for school, business, and creative work.",
    rightPrimary: { label: "Shop laptops", href: "/products?category=Laptops" },
    rightSecondary: { label: "Request a quote", href: "/contact" },
  },
  {
    eyebrow: "Accessories that complete your setup",
    headline: "Upgrade your workspace",
    description:
      "Mice, keyboards, storage, and more—premium accessories that improve comfort, speed, and reliability.",
    imageSrc: "/products/p7-1.jpg",
    imageAlt: "Computer accessories on a desk",
    ctaPrimary: { label: "Shop Accessories", href: "/products?category=Accessories" },
    ctaSecondary: { label: "Talk to Us", href: "/contact" },
    rightTitle: "Accessory bundles",
    rightBody:
      "Complete your setup with a mouse, storage, and essentials for productivity.",
    rightPrimary: { label: "Shop accessories", href: "/products?category=Accessories" },
    rightSecondary: { label: "Chat on WhatsApp", href: "/contact" },
  },
] as const;

export function HeroCarousel() {
  return (
    <div className="relative">
      <Carousel options={{ loop: true, align: "start" }} autoplayDelayMs={6500}>
        <CarouselContent className="gap-0">
          {slides.map((s) => (
            <CarouselItem key={s.headline} className="flex-[0_0_100%] pr-0">
              <div className="grid items-center gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={s.imageSrc}
                        alt={s.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 58vw"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                      <div className="absolute inset-0 grid content-end p-5 sm:p-6">
                        <div className="max-w-xl">
                          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                            {s.eyebrow}
                          </p>
                          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                            {s.headline}
                          </h1>
                          <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
                            {s.description}
                          </p>

                          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <Link
                              href={s.ctaPrimary.href}
                              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
                            >
                              {s.ctaPrimary.label} <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                              href={s.ctaSecondary.href}
                              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/15"
                            >
                              {s.ctaSecondary.label}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <Zap className="h-5 w-5 text-sky-300" />
                      <p className="mt-3 text-sm font-semibold text-white">High performance</p>
                      <p className="mt-1 text-sm text-white/70">Modern specs for real work.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <ShieldCheck className="h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-sm font-semibold text-white">Trusted quality</p>
                      <p className="mt-1 text-sm text-white/70">Verified devices and support.</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <Truck className="h-5 w-5 text-white/80" />
                      <p className="mt-3 text-sm font-semibold text-white">Fast delivery</p>
                      <p className="mt-1 text-sm text-white/70">Convenient Accra delivery.</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Link
                        href="/products?category=Laptops"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75 hover:bg-white/10"
                      >
                        Laptops
                      </Link>
                      <Link
                        href="/products?category=Accessories"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75 hover:bg-white/10"
                      >
                        Accessories
                      </Link>
                      <Link
                        href="/products"
                        className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 font-semibold text-emerald-100 hover:bg-emerald-300/15"
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="absolute inset-0">
                      <Image
                        src={s.imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 42vw"
                        className="object-cover opacity-30"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
                    </div>
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                    <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
                    <div className="relative grid gap-4">
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                        <p className="text-xs font-medium text-white/60">Quick start</p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {s.rightTitle}
                        </p>
                        <p className="mt-2 text-sm text-white/70">
                          {s.rightBody}
                        </p>
                        <Link
                          href={s.rightPrimary.href}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100"
                        >
                          {s.rightPrimary.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                        <p className="text-xs font-medium text-white/60">Need recommendations?</p>
                        <p className="mt-2 text-sm text-white/70">
                          Tell us your budget and use-case—our team will recommend the best options.
                        </p>
                        <Link
                          href={s.rightSecondary.href}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100"
                        >
                          {s.rightSecondary.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  );
}

