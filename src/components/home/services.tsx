"use client";

import { Wrench, Package, Router, BadgeCheck } from "lucide-react";

import { services } from "@/lib/content";

const icons = [BadgeCheck, Wrench, Router, Package] as const;

export function ServicesSection() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-sm font-medium text-emerald-200/90">Services</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            More than a store
          </h2>
          <p className="mt-3 text-white/70">
            We help you buy, set up, and upgrade with confidence—backed by after-sales support.
          </p>
        </div>
        <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
          {services.map((s, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <Icon className="h-5 w-5 text-emerald-200/90" />
                <p className="mt-4 text-sm font-semibold text-white">{s.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/70">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

