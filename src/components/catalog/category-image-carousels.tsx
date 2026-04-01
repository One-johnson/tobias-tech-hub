import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const categoryCarousels = [
  {
    title: "Laptops",
    subtitle: "Popular picks for work, school, and business.",
    imageClassName: "object-cover",
    images: [
      { src: "/products/laptop-hp-360.png", alt: "HP EliteBook laptop" },
      { src: "/products/laptop-dell-5440.png", alt: "Dell laptop" },
      { src: "/products/laptop-lenovo-t14.png", alt: "Lenovo ThinkPad laptop" },
      { src: "/products/laptop-hp-840.png", alt: "HP EliteBook laptop" },
      { src: "/products/laptop-dell-540.png", alt: "Dell laptop" },
      { src: "/products/laptop-dell-latitude.png", alt: "Dell Latitude laptop" },
      { src: "/products/laptop-lenovo-t460.png", alt: "Lenovo T460s laptop" },
    ],
  },
  {
    title: "Accessories",
    subtitle: "Essentials that complete your setup.",
    imageClassName: "object-contain p-2",
    images: [
      { src: "/products/accessory-usb-c-charger-65w.png", alt: "65W USB-C laptop power adapter" },
      { src: "/products/accessory-gaming-mouse.png", alt: "RGB gaming mouse" },
      { src: "/products/accessory-wireless-earbuds.png", alt: "Wireless earbuds with charging case" },
      { src: "/products/accessory-hp-usb-flash-drive.png", alt: "HP 8GB USB flash drive" },
      {
        src: "/products/accessory-laptop-ac-adapter.png",
        alt: "Laptop AC power adapter with power cord",
      },
      { src: "/products/accessory-samsung-nvme-ssd.png", alt: "Samsung M.2 NVMe solid state drive" },
    ],
  },
] as const;

export function CategoryImageCarousels({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-8", className)}>
      {categoryCarousels.map((c) => (
        <section key={c.title} className="min-w-0">
          <div className="mb-4 flex flex-col gap-1">
            <h2 className="text-base font-semibold tracking-tight text-white">{c.title}</h2>
            <p className="text-sm text-white/60">{c.subtitle}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <Carousel options={{ loop: c.images.length > 2, align: "start" }} className="relative">
              <CarouselContent className="-ml-1 gap-3 px-3 py-3 sm:-ml-2 sm:gap-4 sm:px-4">
                {c.images.map((img, i) => (
                  <CarouselItem
                    key={`${img.src}-${i}`}
                    className="min-w-0 pl-1 max-sm:flex-[0_0_calc((100vw-2.75rem)/2)] sm:pl-2 sm:flex-[0_0_46%] lg:flex-[0_0_32%]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black/30">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 46vw, 32vw"
                        className={c.imageClassName}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      ))}
    </div>
  );
}
