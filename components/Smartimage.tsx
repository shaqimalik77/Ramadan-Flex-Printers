"use client";

import { useEffect, useState } from "react";

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

export default function SmartImage({
  src,
  alt,
  className,
  fill,
  priority,
  unoptimized,
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Synchronize state when the src prop updates dynamically
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  // Fallback: small centered logo, never stretches
  if (hasError || !src) {
    return (
      <div
        style={fill ? { position: "absolute", inset: 0 } : undefined}
        className="flex items-center justify-center bg-gray-50 w-full h-full"
      >
        <img
          src="/images/logo/logo.png"
          alt="Ramdan Flex Printers"
          style={{ width: "60px", height: "auto", objectFit: "contain", opacity: 0.5 }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt || "Ramdan Flex Printers"}
      onError={handleImageError}
      className={`${className ?? ""} ${
        fill ? "absolute inset-0 w-full h-full" : ""
      }`}
      loading={priority ? "eager" : "lazy"}
    />
  );
}