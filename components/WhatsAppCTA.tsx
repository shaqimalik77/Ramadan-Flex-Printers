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
    <section className="relative overflow-hidden bg-[#E41F26] py-10 sm:py-12 md:py-14">
      {/* Decorative watermark — subtle, doesn't compete with the button */}
      <MessageCircle
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-white/10 sm:h-48 sm:w-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
          Get a Free Quote
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-xs text-white/85 sm:text-sm leading-relaxed">
          Tell us what you need printed — we&apos;ll reply on WhatsApp with pricing and turnaround time.
        </p>

        <div className="relative mt-6 inline-block">
          {/* Pulsing halo behind the button */}
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-white/40"
          />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-[#E41F26] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:px-8 cursor-pointer"
          >
            <MessageCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
