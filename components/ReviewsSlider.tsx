"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { GoogleReview } from "@/data/googleReviews";
import { INK } from "@/lib/brand";

const AVATAR_COLORS = [INK.cyan, INK.magenta, "#E0A800", INK.key];

/**
 * One-row slider of real Google reviews. 3 visible on desktop, 2 on tablet,
 * 1 (plus a peek of the next) on mobile. Moves slowly on its own and pauses
 * while the visitor hovers or touches it.
 */
export default function ReviewsSlider({ reviews }: { reviews: GoogleReview[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    };
    update();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", update);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="-ml-4 flex touch-pan-y sm:-ml-6">
          {reviews.map((review, i) => (
            <li
              key={review.name}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 sm:pl-6 lg:basis-1/3"
              aria-roledescription="slide"
            >
              <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="flex" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  {review.photo ? (
                    <Image
                      src={review.photo}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-full text-base font-semibold text-white"
                      style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    >
                      {review.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block font-medium text-neutral-900">{review.name}</span>
                    <span className="block text-sm text-neutral-500">Google review</span>
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls: arrows and position dots */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 transition-colors hover:border-neutral-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === selected}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === selected ? 22 : 8,
                background: i === selected ? INK.key : "#D4D4D4",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 transition-colors hover:border-neutral-900"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
