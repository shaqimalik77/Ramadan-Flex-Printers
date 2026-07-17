import { MapPin, Phone, Mail, Clock, Truck, Building2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const contactCards = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Lahore Valencia Town Branch"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: [siteConfig.phoneDisplay],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [siteConfig.email],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat", "11:00 AM – 7:00 PM"],
  },
];

export function ContactCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E31E24]/10 flex items-center justify-center mb-4 group-hover:bg-[#E31E24] transition-colors duration-300">
                <Icon className="w-6 h-6 text-[#E31E24] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                {card.title}
              </h3>
              {card.lines.map((line) => (
                <p
                  key={line}
                  className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug"
                >
                  {line}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 sm:p-8 lg:p-9">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">
        Business Information
      </h2>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-[#E31E24]/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#E31E24]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-900 mb-1">
              Business Hours
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Monday – Saturday: 11:00 AM – 7:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-[#E31E24]/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#E31E24]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-900 mb-1">
              Delivery Areas
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We deliver across all Pakistan and also offer international
              shipping via trusted courier partners.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-[#E31E24]/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#E31E24]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-900 mb-1">
              Corporate Orders
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Bulk and corporate printing orders welcome — get in touch for
              custom pricing.
            </p>
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold py-3.5 px-6 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
      >
        <MessageCircle className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
