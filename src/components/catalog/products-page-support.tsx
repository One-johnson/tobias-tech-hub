import Link from "next/link";
import { ArrowRight, Building2, MessageCircle, PackageSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";

const whatsappHref = whatsappUrl(
  "Hi Tobias Tech Hub, I’m browsing your catalog and need help choosing / sourcing an item.",
);

export function ProductsPageSupport() {
  return (
    <section className="mt-12 border-t border-white/5 pt-12 md:mt-14 md:pt-16">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
        <div className="relative p-6 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-emerald-200/90">While you browse</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                Don&apos;t see the exact spec you need?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                We can help source models, compare options, and quote{" "}
                <span className="text-white/85">bulk or business orders</span>. Delivery is
                available within Accra, with clear communication from checkout to handoff.
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                <li className="flex gap-3 text-sm text-white/75">
                  <PackageSearch className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200/80" />
                  <span>Sourcing help for laptops, accessories, monitors, and storage</span>
                </li>
                <li className="flex gap-3 text-sm text-white/75">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200/80" />
                  <span>Procurement quotes for teams, schools, and offices</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  Request a recommendation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-center text-xs text-white/50 lg:text-right">
                Prefer reading first?{" "}
                <Link href="/#faq" className="text-emerald-200/90 underline-offset-4 hover:underline">
                  Jump to FAQs on the homepage
                </Link>
                {" · "}
                <Link href="/about" className="text-emerald-200/90 underline-offset-4 hover:underline">
                  About us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
