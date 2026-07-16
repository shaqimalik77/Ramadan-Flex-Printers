import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function AboutCTA() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to get a quote for a printing order."
  )}`;

  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto rounded-2xl bg-gray-50 border border-gray-100 shadow-sm px-6 md:px-14 py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Need Professional Printing?
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Tell us what you need, packaging, stickers, tags, or promotional
          products, and get a fast, no-obligation quote directly on
          WhatsApp.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 ease-in-out hover:brightness-105 hover:shadow-lg active:scale-95"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Get Quote on WhatsApp
        </a>
      </div>
    </section>
  );
}
