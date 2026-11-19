import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import { categoryProducts } from "@/data/categoryProducts";
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { whatsappLink } from "@/components/site/QuoteButton";
import ContactWhatsAppForm from "@/components/contact/ContactWhatsAppForm";

const mapQuery = encodeURIComponent(`${siteConfig.address}, Pakistan`);

/** Redesigned contact page: WhatsApp first, then call, email and visit. */
export default function ContactPageView() {
  const methods = [
    {
      icon: MessageCircle,
      color: INK.red,
      title: "WhatsApp",
      value: siteConfig.phoneDisplay,
      note: "Fastest. Send your design and get a quote.",
      href: whatsappLink(),
      external: true,
      primary: true,
    },
    {
      icon: Phone,
      color: INK.cyan,
      title: "Call",
      value: siteConfig.phoneDisplay,
      note: `${siteConfig.hoursDays}, ${siteConfig.hoursTime}`,
      href: `tel:${siteConfig.phoneHref}`,
    },
    {
      icon: Mail,
      color: INK.magenta,
      title: "Email",
      value: siteConfig.email,
      note: "For files and detailed briefs.",
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      color: "#E0A800",
      title: "Visit",
      value: siteConfig.address,
      note: "Please message before visiting.",
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      external: true,
    },
  ];

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* Hero + ways to reach us */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.cyan} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.3} />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-6 sm:pb-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div className="mt-8 max-w-3xl sm:mt-12">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              <InkStripe className="h-1.5 w-10" />
              Contact
            </p>
            <h1 className="mt-5 text-[2.3rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Let&apos;s talk about your printing
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              The quickest way to reach us is WhatsApp. Send your idea, logo or a reference picture and
              we&apos;ll reply with the price and timing.
            </p>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[15px] text-neutral-600 hover:text-neutral-950"
            >
              <span className="text-[#FBBC04]">★★★★★</span>
              <span>
                <span className="font-medium text-neutral-900">{GOOGLE_RATING}</span> · {GOOGLE_REVIEW_COUNT}{" "}
                Google reviews
              </span>
            </a>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((m, i) => (
              <li key={m.title}>
                <Reveal delay={i * 80} className="h-full">
                  <a
                    href={m.href}
                    {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      m.primary ? "text-white" : "bg-white ring-1 ring-black/5"
                    }`}
                    style={m.primary ? { background: INK.red } : undefined}
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: m.primary ? "rgba(255,255,255,0.18)" : `${m.color}14` }}
                    >
                      <m.icon className="h-6 w-6" style={{ color: m.primary ? "#fff" : m.color }} strokeWidth={1.7} />
                    </span>
                    <span className={`mt-5 text-sm ${m.primary ? "text-white/80" : "text-neutral-500"}`}>{m.title}</span>
                    <span className="mt-1 break-words text-lg font-semibold">{m.value}</span>
                    <span className={`mt-2 text-sm ${m.primary ? "text-white/85" : "text-neutral-500"}`}>{m.note}</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form + details */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
            <ContactWhatsAppForm categories={categoryProducts.map((c) => c.name)} />
          </Reveal>
          <Reveal delay={100} className="space-y-4">
            <div className="rounded-2xl bg-[#FAF8F5] p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-semibold">
                <InkStripe className="h-1.5 w-8" /> Opening hours
              </h2>
              <p className="mt-4 flex items-center gap-3 text-neutral-700">
                <Clock className="h-5 w-5 text-neutral-400" />
                {siteConfig.hoursDays}, {siteConfig.hoursTime}
              </p>
              <p className="mt-2 pl-8 text-sm text-neutral-500">Sunday closed. WhatsApp messages are answered in working hours.</p>
            </div>
            <div className="rounded-2xl bg-[#FAF8F5] p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-semibold">
                <InkStripe className="h-1.5 w-8" /> Our office
              </h2>
              <p className="mt-4 flex items-start gap-3 text-neutral-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                {siteConfig.address}
              </p>
              <p className="mt-2 pl-8 text-sm text-neutral-500">
                Most orders are handled online. If you&apos;d like to visit, message us first so we&apos;re there to
                meet you.
              </p>
            </div>
            <div className="rounded-2xl bg-[#FAF8F5] p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-semibold">
                <InkStripe className="h-1.5 w-8" /> Delivery
              </h2>
              <p className="mt-4 text-neutral-700">
                We print in Lahore and deliver by courier to your door anywhere in Pakistan.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
              <iframe
                title={`Map: ${siteConfig.name}, ${siteConfig.address}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[320px] w-full sm:h-[420px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
