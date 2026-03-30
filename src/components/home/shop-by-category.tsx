"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Laptops",
    href: "/products?category=Laptops",
    image: "/products/p2-1.jpg",
    description: "Business, student, and premium performance laptops.",
  },
  {
    title: "Accessories",
    href: "/products?category=Accessories",
    image: "/products/p7-1.jpg",
    description: "Mice, storage, and essentials to complete your setup.",
  },
  {
    title: "Networking",
    href: "/products?category=Networking",
    image: "/products/router-1.svg",
    description: "Routers and switching for stable connectivity and coverage.",
  },
] as const;

export function ShopByCategory() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-emerald-200/90">Explore</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Shop by category
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Find what you need faster—browse by category and get curated options.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:bg-white/5"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image src={c.image} alt={c.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <p className="mt-2 text-sm text-white/70">{c.description}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 group-hover:text-emerald-100">
                Browse <ArrowRight className="h-4 w-4" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

