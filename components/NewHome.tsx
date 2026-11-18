import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  BadgeCheck,
  FileCheck,
  Layers,
  MessageCircle,
  Send,
  Star,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import { getCategoryBySlug, getCategoryImage } from "@/data/categoryProducts";
import InkStripe from "@/components/InkStripe";
import ReviewsSlider from "@/components/ReviewsSlider";
import { clientsData } from "@/data/clientsdata";
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  googleReviews,
} from "@/data/googleReviews";

/**
 * SAMPLE redesign of the homepage, shown at PREVIEW_PATH (lib/brand.ts) so the client can
 * compare it with the current homepage. Not live on "/".
 *
 * Identity: the four printing inks (CMYK) from the Ramdan logo, crop marks
 * like on a print proof, a light friendly font and lots of white space.
 */

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappDefaultMessage
)}`;


const benefits = [
  {
    icon: Truck,
    color: INK.cyan,
    title: "Delivery across Pakistan",
    text: "We ship by courier to your door, in Lahore or any other city.",
  },
  {
    icon: MessageCircle,
    color: INK.magenta,
    title: "Free quote on WhatsApp",
    text: "Send us your idea and get the price and timing in a reply.",
  },
  {
    icon: FileCheck,
    color: "#E0A800",
    title: "Design proof first",
    text: "You approve a digital proof before anything goes to print.",
  },
  {
    icon: Layers,
    color: INK.key,
    title: "Small or bulk orders",
    text: "From a first small run to regular bulk orders for your brand.",
  },
];

// The 8 categories shown in the product grid.
const featuredSlugs = [
  "ecommerce-boxes",
  "stickers",
  "business-cards",
  "custom-t-shirts",
  "wedding-cards",
  "neon-signs",
  "hard-drawer-boxes",
  "label-hang-tags",
];

const steps = [
  {
    icon: Send,
    color: INK.cyan,
    title: "Send your idea",
    text: "WhatsApp us your logo, design or a reference picture, with the quantity you need.",
  },
  {
    icon: BadgeCheck,
    color: INK.magenta,
    title: "Approve the proof",
    text: "We reply with the price, timing and a digital proof. Nothing is printed until you say yes.",
  },
  {
    icon: Truck,
    color: "#E0A800",
    title: "Get it delivered",
    text: "We print your order in Lahore and deliver it to your door anywhere in Pakistan.",
  },
];

/** Printer's crop marks around a box (decorative). */
function CropMarks({ color = "#9CA3AF" }: { color?: string }) {
  const arm = "absolute block bg-current";
  const corner = (pos: string, h: string, v: string) => (
    <span className={`absolute ${pos} h-6 w-6`} style={{ color }} aria-hidden>
      <span className={`${arm} ${h} h-px w-5`} />
      <span className={`${arm} ${v} h-5 w-px`} />
    </span>
  );
  return (
    <>
      {corner("-left-7 -top-7", "right-0 bottom-0", "right-0 bottom-0")}
      {corner("-right-7 -top-7", "left-0 bottom-0", "left-0 bottom-0")}
      {corner("-bottom-7 -left-7", "right-0 top-0", "right-0 top-0")}
      {corner("-bottom-7 -right-7", "left-0 top-0", "left-0 top-0")}
    </>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <InkStripe />
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-[2.5rem] sm:leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-lg text-neutral-500">{subtitle}</p>
    </div>
  );
}

function WhatsAppButton({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-medium transition-opacity hover:opacity-90 ${
        light ? "bg-white text-neutral-900" : "text-white"
      }`}
      style={light ? undefined : { background: INK.red }}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}

export default function NewHome() {
  const featured = featuredSlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-10 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
          <div>
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              <InkStripe className="h-1.5 w-10" />
              Printing &amp; packaging · Lahore
            </p>
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Print that makes your brand{" "}
              <span className="relative whitespace-nowrap">
                stand out
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-2 w-full rounded-full opacity-80"
                  style={{ background: INK.yellow }}
                />
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
              Custom boxes, stickers, business cards, tags, wedding cards, neon signs and flex
              printing. Made in Lahore, delivered across Pakistan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <WhatsAppButton label="Get a free quote on WhatsApp" />
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 px-1 py-3 text-base font-medium text-neutral-800 hover:text-neutral-950"
              >
                Browse products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 text-[15px] text-neutral-600 hover:text-neutral-950"
            >
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </span>
              <span>
                <span className="font-medium text-neutral-900">{GOOGLE_RATING}</span> rating ·{" "}
                <span className="underline decoration-neutral-300 underline-offset-4">
                  {GOOGLE_REVIEW_COUNT} Google reviews
                </span>
              </span>
            </a>
          </div>

          {/* Photo framed like a print proof */}
          <div className="relative mx-6 my-6 sm:mx-10">
            <span
              aria-hidden
              className="absolute -right-4 -top-4 h-full w-full rounded-2xl"
              style={{ background: INK.cyan, opacity: 0.18 }}
            />
            <span
              aria-hidden
              className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl"
              style={{ background: INK.magenta, opacity: 0.14 }}
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/categories/promotional-products.png"
                alt="Branded business cards, bags, mugs, stickers and pouches printed by Ramdan Flex Printers"
                fill
                preload
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <CropMarks />
          </div>
        </div>
      </section>

      {/* 2. Benefits */}
      <section className="border-y border-neutral-200 bg-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, color, title, text }, i) => (
            <li
              key={title}
              className={`flex flex-col gap-3 px-5 py-8 sm:px-8 sm:py-10 ${
                i % 2 === 1 ? "border-l border-neutral-200" : ""
              } ${i >= 2 ? "border-t border-neutral-200 lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <Icon className="h-7 w-7" style={{ color }} strokeWidth={1.7} />
              <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-[15px]">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Popular products */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title="Our most popular products"
            subtitle="Printed in Lahore for brands, shops and events."
          />
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-12 sm:gap-6 lg:grid-cols-4">
            {featured.map((cat, i) => (
              <li key={cat.slug}>
                <Link href={`/categories/${cat.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                      src={getCategoryImage(cat.slug)}
                      alt={`Custom ${cat.name.toLowerCase()} printed by Ramdan Flex Printers`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Ink bar slides in on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ background: [INK.cyan, INK.magenta, INK.yellow, INK.key][i % 4] }}
                    />
                  </div>
                  <p className="mt-3 flex items-center justify-between gap-2 text-base font-medium text-neutral-900 sm:text-lg">
                    {cat.name}
                    <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-900" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center sm:mt-12">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Real Google reviews */}
      <section className="border-t border-neutral-200 py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title="What our customers say"
            subtitle="Real reviews from our Google Business Profile."
          />
          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-semibold">{GOOGLE_RATING}</span>
              <span className="flex" aria-label={`${GOOGLE_RATING} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </span>
            </div>
            <p className="text-[15px] text-neutral-500">Based on {GOOGLE_REVIEW_COUNT} reviews on Google</p>
          </div>

          <div className="mt-10">
            <ReviewsSlider reviews={googleReviews} />
          </div>

          <div className="mt-8 text-center sm:mt-12">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              Read all {GOOGLE_REVIEW_COUNT} reviews on Google <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. How to order */}
      <section className="bg-[#FAF8F5] py-12 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle title="How to order" subtitle="Three simple steps, all on WhatsApp." />
          <ol className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, color, title, text }, i) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-col sm:gap-0 sm:p-7"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${color}1F` }}
                >
                  <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.7} />
                </span>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.14em] sm:mt-5"
                    style={{ color }}
                  >
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold sm:text-xl">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-500 sm:mt-2 sm:text-base">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center sm:mt-12">
            <WhatsAppButton label="Start your order on WhatsApp" />
          </div>
        </div>
      </section>

      {/* 6. Client logos */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            title="Brands we've printed for"
            subtitle="A few of the businesses we work with in Lahore."
          />
          <ul className="mt-8 grid grid-cols-3 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-6">
            {clientsData.map((client) => (
              <li
                key={client.id}
                className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white p-3"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={client.image}
                    alt={`${client.name} logo`}
                    fill
                    sizes="(min-width: 1024px) 160px, 30vw"
                    className="object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section className="relative overflow-hidden px-5 py-20 text-center text-white" style={{ background: INK.key }}>
        <InkStripe className="mx-auto h-1 w-16" onDark />
        <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-[2.5rem]">Have something in mind?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-300">
          Send us a message on WhatsApp and get a free quote today.
          <br className="hidden sm:block" /> {siteConfig.hoursDays}, {siteConfig.hoursTime}.
        </p>
        <div className="mt-9 flex justify-center">
          <WhatsAppButton label={`WhatsApp ${siteConfig.phoneDisplay}`} light />
        </div>
      </section>
    </main>
  );
}
