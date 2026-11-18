import { INK_ORDER } from "@/lib/brand";

/** A four-colour CMYK bar, like the colour strip on a printed proof. */
export default function InkStripe({
  className = "h-1 w-16",
  rounded = true,
  onDark = false,
}: {
  className?: string;
  rounded?: boolean;
  /** On a dark background the black (K) segment would vanish, so draw it white. */
  onDark?: boolean;
}) {
  return (
    <span aria-hidden className={`flex overflow-hidden ${rounded ? "rounded-full" : ""} ${className}`}>
      {INK_ORDER.map((color, i) => (
        <span
          key={color}
          className="h-full flex-1"
          style={{ background: onDark && i === 3 ? "#FFFFFF" : color }}
        />
      ))}
    </span>
  );
}
