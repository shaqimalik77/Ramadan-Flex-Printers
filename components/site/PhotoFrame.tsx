import Image, { type StaticImageData } from "next/image";
import { INK } from "@/lib/brand";
import CropMarks from "@/components/CropMarks";

/** A photo framed like a print proof: two ink blocks behind it and crop marks. */
export default function PhotoFrame({
  src,
  alt,
  inks = [INK.cyan, INK.magenta],
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspect = "aspect-[4/3]",
}: {
  src: string | StaticImageData;
  alt: string;
  inks?: [string, string];
  priority?: boolean;
  sizes?: string;
  aspect?: string;
}) {
  return (
    <div className="relative mx-5 my-5 sm:mx-10 sm:my-6">
      <span
        aria-hidden
        className="absolute -right-4 -top-4 h-full w-full rounded-2xl"
        style={{ background: inks[0], opacity: 0.18 }}
      />
      <span
        aria-hidden
        className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl"
        style={{ background: inks[1], opacity: 0.16 }}
      />
      <div className={`relative ${aspect} overflow-hidden rounded-2xl bg-neutral-200 shadow-xl`}>
        <Image
          src={src}
          alt={alt}
          fill
          preload={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <CropMarks />
    </div>
  );
}
