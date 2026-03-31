"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselContextValue = {
  viewportRef: (node: HTMLDivElement | null) => void;
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  mounted: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function Carousel({
  className,
  options,
  autoplay = true,
  autoplayDelayMs = 4500,
  children,
}: {
  className?: string;
  options?: EmblaOptionsType;
  autoplay?: boolean;
  autoplayDelayMs?: number;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: autoplayDelayMs,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  const [viewportRef, emblaApi] = useEmblaCarousel(
    options,
    autoplay ? [autoplayPlugin.current] : [],
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList().map((_, i) => i));
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <CarouselContext.Provider
      value={{
        viewportRef,
        emblaApi,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        mounted,
        selectedIndex,
        scrollSnaps,
        scrollTo,
      }}
    >
      <div data-slot="carousel" className={cn("relative", className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselDots({ className }: { className?: string }) {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("CarouselDots must be used within Carousel");
  if (!ctx.mounted) return null;

  return (
    <div
      data-slot="carousel-dots"
      className={cn("mt-4 flex items-center justify-center gap-2", className)}
    >
      {ctx.scrollSnaps.map((i) => {
        const active = i === ctx.selectedIndex;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => ctx.scrollTo(i)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              active ? "w-7 bg-emerald-300/90" : "w-2.5 bg-white/20 hover:bg-white/35",
            )}
          />
        );
      })}
    </div>
  );
}

export function CarouselContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("CarouselContent must be used within Carousel");

  return (
    // eslint-disable-next-line react-hooks/refs
    <div ref={ctx.viewportRef} className="overflow-hidden">
      <div
        data-slot="carousel-content"
        className={cn("flex touch-pan-y gap-4", className)}
      >
        {children}
      </div>
    </div>
  );
}

export function CarouselItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div data-slot="carousel-item" className={cn("min-w-0", className)}>
      {children}
    </div>
  );
}

export function CarouselPrevious({ className }: { className?: string }) {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("CarouselPrevious must be used within Carousel");
  if (!ctx.mounted) return null;

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={ctx.scrollPrev}
      disabled={!ctx.canScrollPrev}
      className={cn(
        "absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/40 backdrop-blur",
        className,
      )}
      aria-label="Previous"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}

export function CarouselNext({ className }: { className?: string }) {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("CarouselNext must be used within Carousel");
  if (!ctx.mounted) return null;

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={ctx.scrollNext}
      disabled={!ctx.canScrollNext}
      className={cn(
        "absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/40 backdrop-blur",
        className,
      )}
      aria-label="Next"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  );
}

