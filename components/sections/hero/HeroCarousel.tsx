"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3000;

export function HeroCarousel() {
  const { slides } = heroContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      const total = slides.length;
      setActiveIndex((index + total) % total);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <>
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0" aria-live="polite" aria-atomic="true">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isFirst = index === 0;

          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "z-[1] opacity-100" : "z-0 opacity-0",
              )}
              aria-hidden={!isActive}
            >
              <div className="absolute inset-0 lg:hidden">
                <Image
                  src={slide.mobileSrc}
                  alt=""
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="100vw"
                  className={cn("object-cover", isFirst ? "object-[center_52%]" : "object-[78%_center]")}
                />
              </div>
              <div className="absolute inset-0 hidden lg:block">
                <Image
                  src={slide.src}
                  alt={isActive ? slide.alt : ""}
                  fill
                  priority={index === 0}
                  unoptimized
                  sizes="100vw"
                  className={cn("object-cover", isFirst ? "object-[100%_55%]" : "object-[70%_center]")}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white/95 from-0% via-white/88 via-[22%] to-transparent to-[48%] lg:hidden max-sm:block sm:hidden" />
      <div className="absolute inset-0 z-[2] hidden bg-gradient-to-b from-[#0A1B33]/35 from-0% via-white/78 via-[28%] to-white/10 to-[55%] sm:block lg:hidden" />
      <div className="absolute inset-0 z-[2] hidden bg-gradient-to-r from-white/88 from-0% via-white/65 via-[32%] to-transparent to-[42%] lg:block" />
    </div>

      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-5 z-[2] flex items-center justify-center gap-3 lg:bottom-8 lg:justify-end lg:pr-10">
          <button
            type="button"
            aria-label="Imagem anterior"
            className="inline-flex size-9 items-center justify-center rounded-full border border-brand-navy/15 bg-white/90 text-brand-navy shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            onClick={() => goTo(activeIndex - 1)}
          >
            <ChevronIcon className="size-4 rotate-180" />
          </button>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Imagens da hero">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Ir para a imagem ${index + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
                  index === activeIndex ? "w-6 bg-brand-orange" : "w-2.5 bg-white/80 hover:bg-white lg:bg-brand-navy/25 lg:hover:bg-brand-navy/40",
                )}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Próxima imagem"
            className="inline-flex size-9 items-center justify-center rounded-full border border-brand-navy/15 bg-white/90 text-brand-navy shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            onClick={() => goTo(activeIndex + 1)}
          >
            <ChevronIcon className="size-4" />
          </button>
        </div>
      ) : null}
    </>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
