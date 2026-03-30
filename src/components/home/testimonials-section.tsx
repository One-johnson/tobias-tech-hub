"use client";

import { testimonials } from "@/lib/content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TestimonialsSection() {
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-emerald-200/90">Testimonials</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Customers love the experience
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Premium support, clear recommendations, and fast delivery in Accra.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Carousel options={{ loop: true, align: "start" }}>
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem
                key={t.name}
                className="flex-[0_0_92%] sm:flex-[0_0_60%] lg:flex-[0_0_40%]"
              >
                <div className="h-full rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-medium text-white/60">{t.purchase}</p>
                    <p className="text-xs font-semibold text-emerald-200/90">
                      {"★".repeat(t.rating)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/80">“{t.quote}”</p>
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
