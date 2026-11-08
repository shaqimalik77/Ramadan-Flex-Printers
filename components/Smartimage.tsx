"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SmartImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  /** Fill the nearest positioned parent (parent needs `relative`). */
  fill?: boolean;
  /** Width/height are only needed when `fill` is not used. */
  width?: number;
  height?: number;
  /** Tells the browser which size to download; always pass this with `fill`. */
  sizes?: string;
  /** Load first and preload (use only for the main above-the-fold image). */
  priority?: boolean;
  unoptimized?: boolean;
};

/**
 * next/image with a logo fallback when the file is missing or fails to load.
 *
 * Going through next/image means the browser gets a resized WebP/AVIF of the
 * right width instead of the original multi-megabyte PNG.
 */
export default function SmartImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
  unoptimized,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset the error state when the image source changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasError(false);
  }, [src]);

  // Fallback: small centered logo, never stretches
  if (hasError || !src) {
    return (
      <div
        style={fill ? { position: "absolute", inset: 0 } : undefined}
        className="flex items-center justify-center bg-gray-50 w-full h-full"
      >
        <Image
          src="/images/logo/logo.png"
          alt="Ramdan Flex Printers"
          width={60}
          height={35}
          style={{ width: "60px", height: "auto", objectFit: "contain", opacity: 0.5 }}
        />
      </div>
    );
  }

  const sizing = fill
    ? { fill: true as const, sizes: sizes ?? "100vw" }
    : { width: width ?? 800, height: height ?? 600, sizes };

  return (
    <Image
      {...sizing}
      src={src}
      alt={alt || "Ramdan Flex Printers"}
      onError={() => setHasError(true)}
      className={className}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized={unoptimized}
    />
  );
}
