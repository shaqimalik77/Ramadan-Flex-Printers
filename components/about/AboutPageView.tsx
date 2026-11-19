import Link from "next/link";
import { MapPin, MessageCircle, Truck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import { NAV } from "@/lib/navigation";
import { categoryProducts } from "@/data/categoryProducts";
import { clientLogos } from "@/data/clientLogos";
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import ClientMarquee from "@/components/ClientMarquee";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import PhotoFrame from "@/components/site/PhotoFrame";
import QuoteButton from "@/components/site/QuoteButton";
import SectionTitle from "@/components/site/SectionTitle";
import NumbersBand from "@/components/site/NumbersBand";
import HowToOrder from "@/components/site/HowToOrder";
import ReviewsSection from "@/components/site/ReviewsSection";
import ClosingCta from "@/components/site/ClosingCta";

const GROUP_INKS = [INK.cyan, INK.magenta, "#E0A800", INK.key];

/**
 * About page. Only facts we know are true: the office, how ordering works,
 * the catalogue, the Google rating and the client list. (The old page had a
 * team of stock photos with invented names and unverified numbers.)
 */
export default function AboutPageView() {
  const facts = [
    {
      icon: MapPin,
      color: INK.cyan,
      title: "Based in Lahore",
      text: `Our office is at ${siteConfig.address}. Every order is printed in Lahore.`,
    },
    {
      icon: MessageCircle,
      color: INK.magenta,
      title: "Ordered on WhatsApp",
      text: "Send a logo, a design or just an idea. We reply with the price, the timing and a digital proof.",
    },
    {
      icon: Truck,
      color: "#E0A800",
      title: "Delivered across Pakistan",
      text: "Orders go by courier to your door, in Lahore or any other city.",
    },
  ];
  // Menu groups, with Stickers (a top-level menu link) added to cards & tags.
  const groups = NAV.filter((g) => g.items?.length).map((g) =>
    g.label === "Cards & Tags"
      ? {
          ...g,
          label: "Cards, tags & stickers",
          items: [...(g.items ?? []), { label: "Stickers", href: "/categories/stickers" }],
        }
      : g
  );

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.magenta} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.25} />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-6 sm:pb-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
          <div className="mt-6 grid items-center gap-8 lg:mt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                <InkStripe className="h-1.5 w-10" />
                About us
              </p>
              <h1 className="mt-5 text-[2.3rem] font-semibold leading-[1.08] tracking-tight sm:text-[3.4rem]">
                Printing and packaging, made in Lahore
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
                {siteConfig.name} prints for shops, online brands, schools, clinics, events and families:
                boxes and bags, cards and tags, stickers, apparel, gifts, signs and flex banners.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <QuoteButton />
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-1 py-2 text-[15px] text-neutral-600 hover:text-neutral-950"
                >
                  <span className="text-[#FBBC04]">★★★★★</span>
                  <span>
                    <span className="font-medium text-neutral-900">{GOOGLE_RATING}</span> · {GOOGLE_REVIEW_COUNT}{" "}
                    Google reviews
                  </span>
                </a>
              </div>
            </div>
            <PhotoFrame
              src="/images/categories/promotional-products.png"
              alt="Business cards, bags, mugs, stickers and pouches printed by Ramdan Flex Printers"
              priority
            />
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title="How we work"
            subtitle="A Lahore print shop that works mostly online, so ordering is quick wherever you are."
          />
          <ul className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
            {facts.map(({ icon: Icon, color, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full rounded-2xl bg-[#FAF8F5] p-7">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}1A` }}
                    >
                      <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-neutral-600">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NumbersBand />

      {/* What we print */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title="What we print"
            subtitle={`${categoryProducts.length} categories, and we're happy to quote anything else you need.`}
          />
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g, i) => (
              <Reveal key={g.label} delay={i * 90} className="h-full">
                <div className="h-full rounded-2xl border border-neutral-200 p-6">
                  <h3 className="flex items-center gap-3 text-lg font-semibold">
                    <span className="h-2 w-8 rounded-full" style={{ background: GROUP_INKS[i % GROUP_INKS.length] }} />
                    {g.label}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items?.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="inline-block rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600 hover:border-neutral-900 hover:text-neutral-950"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-t border-neutral-200 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle title="Brands we've printed for" subtitle="A few of the businesses we work with in Lahore." />
        </div>
        <Reveal className="mt-8">
          <ClientMarquee clients={clientLogos} />
        </Reveal>
      </section>

      <div className="border-t border-neutral-200">
        <ReviewsSection />
      </div>
      <HowToOrder />
      <ClosingCta />
    </main>
  );
}
