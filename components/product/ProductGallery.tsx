"use client";

import { useState } from "react";
import Image from "next/image";
import { INK } from "@/lib/brand";
import CropMarks from "@/components/CropMarks";

/**
 * Product photos: a large framed photo with thumbnails underneath. Switching
 * cross-fades between photos (all are stacked, so no layout jump).
 */
export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  return (
    <div>
      <div className="relative mx-4 my-4 sm:mx-6 sm:my-5">
        <span
          aria-hidden
          className="absolute -right-3 -top-3 h-full w-full rounded-2xl"
          style={{ background: INK.cyan, opacity: 0.16 }}
        />
        <span
          aria-hidden
          className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl"
          style={{ background: INK.magenta, opacity: 0.14 }}
        />
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 shadow-xl">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === active ? `${title}, photo ${i + 1}` : ""}
              aria-hidden={i !== active}
              fill
              preload={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
        </div>
        <CropMarks />
      </div>

      {images.length > 1 && (
        <ul className="mt-6 flex gap-3 px-4 sm:px-6" aria-label="More photos">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={`relative block h-16 w-16 overflow-hidden rounded-xl ring-2 transition sm:h-20 sm:w-20 ${
                  i === active ? "ring-neutral-900" : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
