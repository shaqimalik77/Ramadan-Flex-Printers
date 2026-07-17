import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

// Same wa.me pattern used in Hero.tsx
const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}${
  siteConfig.whatsappDefaultMessage
    ? `?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`
    : ""
}`;

export default function WhatsAppCTA() {
  return (
    <section className="relative overflow-hidden bg-[#E41F26] py-3.5 sm:py-4">
      {/* Decorative watermark — subtle, doesn't compete with the button */}
      <MessageCircle
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 text-white/10 sm:h-32 sm:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left lg:px-8">
        <div className="flex flex-col gap-0.5 max-w-2xl">
          <h2 className="text-base font-bold tracking-tight text-white sm:text-lg md:text-xl">
            Get a Free Quote
          </h2>
          <p className="text-[10px] text-white/85 sm:text-xs md:text-sm leading-relaxed">
            Tell us what you need printed — we&apos;ll reply on WhatsApp with pricing and turnaround time.
          </p>
        </div>

        <div className="relative shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-white/40"
          />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] sm:text-xs md:text-sm font-bold text-[#E41F26] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
