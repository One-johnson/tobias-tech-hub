"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";

export function CtaStrip() {
  const href = whatsappUrl(
    "Hi Tobias Tech Hub, I need help choosing a laptop or accessory.",
  );

  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
        <div className="relative p-8 md:p-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-sm font-medium text-emerald-200/90">Need help choosing?</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Get recommendations in minutes
              </h2>
              <p className="mt-3 max-w-2xl text-white/70">
                Tell us your budget and use-case. We’ll recommend options and help you order fast.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-4 md:justify-self-end">
              <Button asChild>
                <Link href="/contact">
                  Contact us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  WhatsApp chat <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

