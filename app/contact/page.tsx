import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";

import ContactHero from "@/components/ContactHero";
import ContactInfo, { ContactCards } from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/GoogleMap";

export const metadata: Metadata = {
  title: "Contact Us | Ramdan Flex Printers",
  description:
    "Get in touch with Ramdan Flex Printers for all your printing and branding requirements. Visit our Lahore DHA branch, call, email, or message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />

      <ContactCards />

      {/* Form + Business Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16 lg:pb-20">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            Find Us
          </h2>
          <p className="text-neutral-600">
            Visit our Lahore DHA branch for walk-in consultations and orders.
          </p>
        </div>
        <GoogleMap />
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-[#E31E24] px-6 sm:px-10 lg:px-16 py-12 sm:py-14 lg:py-16 text-center shadow-lg">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)",
            }}
          />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Need Custom Printing?
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Reach out now and get a fast, no-obligation quote for your next
              printing or branding project.
            </p>
            <a
              href="https://wa.me/923311146549"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-neutral-100 text-[#E31E24] font-semibold text-base sm:text-lg py-4 px-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Get Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
