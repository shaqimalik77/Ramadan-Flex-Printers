/**
 * Decorative halftone dots, the way printed images are made of ink dots.
 * Fades out towards its edges. Position it with `className` (absolute).
 */
export default function Halftone({
  color,
  className = "",
  spacing = 14,
  dot = 1.6,
  opacity = 0.5,
}: {
  color: string;
  className?: string;
  /** Distance between dots in px. */
  spacing?: number;
  /** Dot radius in px. */
  dot?: number;
  opacity?: number;
}) {
  const fade = "radial-gradient(closest-side, black 30%, transparent)";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} ${dot}px, transparent ${dot + 0.7}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        maskImage: fade,
        WebkitMaskImage: fade,
        opacity,
      }}
    />
  );
}
