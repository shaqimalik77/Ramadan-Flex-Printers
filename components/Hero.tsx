"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { siteConfig } from "@/lib/siteConfig";

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}${
  siteConfig.whatsappDefaultMessage
    ? `?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`
    : ""
}`;

const slideLinks: Record<string, string> = {
  "custom-tshirts": "/categories/custom-t-shirts",
  "neon-signs": "/categories/neon-signs",
  "3d-boards-signs": "/categories/3d-boards",
  "flex-printing": "/categories/flex-designs",
  "offset-printing": "/categories/business-cards",
};

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "clamp(280px, 50vw, 580px)" }}
      aria-roledescription="carousel"
      aria-label="Featured products and services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroSlides.map((slide, index) => {
          const targetHref = slideLinks[slide.id] || "/products";
          return (
            <Link
              key={slide.id}
              href={targetHref}
              className="relative h-full w-full flex-shrink-0"
              style={{ minWidth: "100%" }}
              tabIndex={index === current ? 0 : -1}
              aria-hidden={index !== current}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </Link>
          );
        })}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); prev(); }}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-3 md:left-5 top-1/2 z-30 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#E31E24] p-2.5 md:p-3 cursor-pointer border border-white/20 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); next(); }}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-3 md:right-5 top-1/2 z-30 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#E31E24] p-2.5 md:p-3 cursor-pointer border border-white/20 shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bottom overlay — CTAs + dots */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 via-black/25 to-transparent pb-4 pt-14 sm:pb-5 sm:pt-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3.5 px-4">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#E31E24] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-black/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C81920] hover:shadow-lg active:translate-y-0 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Get Quote on WhatsApp
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#E31E24] active:translate-y-0 cursor-pointer"
            >
              View Products
            </Link>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Select slide">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === current}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === current
                    ? "w-6 bg-[#E31E24]"
                    : "w-1.5 bg-neutral-300/80 hover:bg-neutral-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}