import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { INK } from "@/lib/brand";

/** wa.me link with a pre-filled message. */
export function whatsappLink(message: string = siteConfig.whatsappDefaultMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled message asking for a quote for a product or category. */
export function quoteMessage(thing: string): string {
  return `Hi, I'd like a quote for ${thing}.`;
}

/** The main call to action: open WhatsApp with a pre-filled message. */
export default function QuoteButton({
  label = "Get a free quote on WhatsApp",
  message,
  variant = "primary",
  size = "md",
  className = "",
}: {
  label?: string;
  message?: string;
  /** primary: brand red. light: white (for dark backgrounds). outline: bordered. */
  variant?: "primary" | "light" | "outline";
  size?: "md" | "sm";
  className?: string;
}) {
  const sizing = size === "sm" ? "gap-1.5 rounded-lg px-4 py-2.5 text-sm" : "gap-2 rounded-xl px-6 py-3.5 text-base";
  const look =
    variant === "primary"
      ? "text-white hover:-translate-y-0.5 hover:shadow-lg"
      : variant === "light"
        ? "bg-white text-neutral-900 hover:-translate-y-0.5 hover:shadow-lg"
        : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900";
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-medium transition ${sizing} ${look} ${className}`}
      style={variant === "primary" ? { background: INK.red } : undefined}
    >
      <MessageCircle className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      {label}
    </a>
  );
}
