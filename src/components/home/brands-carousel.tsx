"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const brandLogos = [
  {
    name: "HP",
    src: "/brands/hp.svg",
  },
  {
    name: "Dell",
    src: "/brands/dell.svg",
  },
  {
    name: "Lenovo",
    src: "/brands/lenovo.svg",
  },
  {
    name: "Apple",
    src: "/brands/apple.svg",
  },
] as const;

export function BrandsCarousel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Trusted brands</p>
          <p className="mt-1 text-sm text-white/70">Official brand marks shown for recognition.</p>
        </div>
      </div>
      <div className="mt-5">
        <Carousel options={{ loop: true, align: "start" }}>
          <CarouselContent className="gap-3">
            {brandLogos.map((b) => (
              <CarouselItem key={b.name} className="flex-[0_0_60%] sm:flex-[0_0_35%] lg:flex-[0_0_25%]">
                <div className="grid place-items-center rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="relative h-10 w-32">
                    <Image
                      src={b.src}
                      alt={`${b.name} logo`}
                      fill
                      className="object-contain invert"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </div>
    </div>
  );
}

