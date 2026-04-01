"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
        <div className="relative p-8 md:p-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-sm font-medium text-emerald-200/90">About Tobias Tech Hub</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Premium tech retail, backed by real support
              </h2>
              <p className="mt-3 max-w-3xl text-white/70">
                Based in Accra, Ghana, we curate laptops, accessories, monitors, and storage for
                professionals, students, and businesses—with guidance that makes buying tech easy.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

