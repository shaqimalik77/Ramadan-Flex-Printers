import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ExternalLink,
  FileCheck,
  GraduationCap,
  HeartPulse,
  Layers,
  MessageCircle,
  PartyPopper,
  Send,
  Shirt,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import {
  categoryProducts,
  getCategoryBySlug,
  getCategoryImage,
} from "@/data/categoryProducts";
import InkStripe from "@/components/InkStripe";
import Halftone from "@/components/Halftone";
import Reveal from "@/components/Reveal";
import ReviewsSlider from "@/components/ReviewsSlider";
import HeroSlider from "@/components/HeroSlider";
import { clientLogos } from "@/data/clientLogos";
import ClientMarquee from "@/components/ClientMarquee";
import neonPhoto from "@/assets/hero/neon-signs.jpg";
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  googleReviews,
} from "@/data/googleReviews";

/**
 * SAMPLE redesign of the homepage, shown at PREVIEW_PATH (lib/brand.ts) so the
 * client can compare it with the current homepage. Not live on "/".
 *
 * Identity: the four printing inks (CMYK) from the Ramdan logo, crop marks
 * and halftone dots like on printed proofs, a light friendly font and lots of
 * white space. Every claim and number on this page is real (see comments).
 */

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappDefaultMessage,
)}`;

const YELLOW_TEXT = "#E0A800"; // yellow ink is too light for icons/text on white

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
    color: YELLOW_TEXT,
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

/**
 * Bento grid of popular products. Taglines only list product types that
 * exist in data/categoryProducts.json for that category.
 * Layout (desktop, 4 columns): 1 big tile (2x2), 4 small, 1 wide (2x1), 2 small.
 * Big: ecommerce boxes. Wide: T-shirts.
 */
const featured: {
  slug: string;
  tagline: string;
  size: "big" | "wide" | "small";
  /** Optional photo instead of the category image (e.g. a better crop). */
  image?: StaticImageData;
  /** Optional CSS object-position for the photo. */
  position?: string;
}[] = [
  {
    slug: "ecommerce-boxes",
    tagline: "Mailer, kraft and rigid boxes with your logo",
    size: "big",
  },
  {
    slug: "stickers",
    tagline: "Vinyl, die-cut, holographic and waterproof",
    size: "small",
  },
  {
    slug: "business-cards",
    tagline: "Matte, gold foil, spot UV and embossed",
    size: "small",
  },
  {
    slug: "neon-signs",
    tagline: "Custom LED neon in any text, logo or colour",
    size: "small",
    // The colourful neon wall from the old banner (the category image is
    // just our own logo in neon).
    image: neonPhoto,
  },
  {
    slug: "wedding-cards",
    tagline: "Foil, laser-cut, acrylic and boxed sets",
    size: "small",
  },
  {
    slug: "custom-t-shirts",
    tagline: "Printed, DTF and embroidered shirts",
    size: "wide",
    // Wide crop across the chest, so the printed logo sits in the middle and
    // the label in the corner doesn't cover it.
    position: "center 56%",
  },
  {
    slug: "hard-drawer-boxes",
    tagline: "Rigid drawer boxes for gifts and jewellery",
    size: "small",
  },
  {
    slug: "label-hang-tags",
    tagline: "Kraft, woven and printed tags for clothing",
    size: "small",
  },
];

const tileSpan = {
  big: "col-span-2 row-span-2",
  wide: "col-span-2",
  small: "",
};

/**
 * Who we print for. Backed by the client list (restaurants, colleges,
 * clinics and health brands) and the product catalogue.
 */
const industries = [
  {
    icon: UtensilsCrossed,
    color: INK.cyan,
    title: "Restaurants & cafés",
    slugs: ["butter-paper", "stickers", "flex-designs", "neon-signs", "mugs"],
  },
  {
    icon: Shirt,
    color: INK.magenta,
    title: "Clothing brands",
    slugs: [
      "label-hang-tags",
      "fabric-tags",
      "ziplock-frosted-bags",
      "shopping-bags",
      "courier-flyer-poly-bags",
    ],
  },
  {
    icon: GraduationCap,
    color: YELLOW_TEXT,
    title: "Schools & offices",
    slugs: [
      "business-cards",
      "flex-designs",
      "3d-boards",
      "promotional-products",
      "custom-t-shirts",
    ],
  },
  {
    icon: HeartPulse,
    color: INK.key,
    title: "Clinics & health brands",
    slugs: ["cosmetic-boxes", "stand-up-pouches", "stickers", "business-cards"],
  },
  {
    icon: PartyPopper,
    color: INK.red,
    title: "Weddings & events",
    slugs: [
      "wedding-cards",
      "thank-you-cards",
      "neon-signs",
      "polaroids",
      "gift-bags",
    ],
  },
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
    color: YELLOW_TEXT,
    title: "Get it delivered",
    text: "We print your order in Lahore and deliver it to your door anywhere in Pakistan.",
  },
];

function SectionTitle({
  title,
  subtitle,
  onDark = false,
}: {
  title: string;
  subtitle: string;
  onDark?: boolean;
}) {
  return (
    <Reveal className="flex flex-col items-center text-center">
      <InkStripe onDark={onDark} />
      <h2
        className={`mt-5 text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight ${
          onDark ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 text-lg ${onDark ? "text-neutral-300" : "text-neutral-500"}`}
      >
        {subtitle}
      </p>
    </Reveal>
  );
}

function WhatsAppButton({
  label,
  light = false,
}: {
  label: string;
  light?: boolean;
}) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-medium transition hover:-translate-y-0.5 hover:shadow-lg ${
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
  // Real numbers only.
  const stats = [
    {
      value: String(categoryProducts.length),
      label: "Product categories",
      color: INK.cyan,
    },
    { value: `${GOOGLE_RATING}★`, label: "Google rating", color: INK.yellow },
    {
      value: String(GOOGLE_REVIEW_COUNT),
      label: "Google reviews",
      color: INK.magenta,
    },
    {
      value: "6 days",
      label: `a week, ${siteConfig.hoursTime.replace(/:00/g, "")}`,
      color: "#FFFFFF",
    },
  ];

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* 1. Hero: service banners slider */}
      <HeroSlider />

      {/* 2. Benefits */}
      <section className="border-y border-neutral-200 bg-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, color, title, text }, i) => (
            <li
              key={title}
              className={`group px-5 py-8 sm:px-8 sm:py-10 ${
                i % 2 === 1 ? "border-l border-neutral-200" : ""
              } ${i >= 2 ? "border-t border-neutral-200 lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <Reveal delay={i * 90} className="flex flex-col gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ background: `${color}14` }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color }}
                    strokeWidth={1.7}
                  />
                </span>
                <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
                <p className="text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
                  {text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Popular products: bento grid */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title="Our most popular products"
            subtitle="Printed in Lahore for brands, shops and events."
          />
          <ul className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 sm:mt-14 sm:auto-rows-[230px] sm:gap-5 lg:grid-cols-4">
            {featured.map(({ slug, tagline, size, image, position }, i) => {
              const cat = getCategoryBySlug(slug);
              if (!cat) return null;
              const big = size === "big";
              return (
                <li key={slug} className={tileSpan[size]}>
                  <Reveal delay={(i % 4) * 80} className="h-full">
                    <Link
                      href={`/categories/${slug}`}
                      className="group relative block h-full overflow-hidden rounded-2xl bg-neutral-100"
                    >
                      <Image
                        src={image ?? getCategoryImage(slug)}
                        alt={`Custom ${cat.name.toLowerCase()} printed by Ramdan Flex Printers`}
                        fill
                        sizes={
                          big
                            ? "(min-width: 1024px) 50vw, 100vw"
                            : size === "wide"
                              ? "(min-width: 1024px) 50vw, 100vw"
                              : "(min-width: 1024px) 25vw, 50vw"
                        }
                        style={position ? { objectPosition: position } : undefined}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                        <span>
                          <span
                            className={`block font-semibold text-white ${
                              big
                                ? "text-2xl sm:text-3xl"
                                : "text-base sm:text-lg"
                            }`}
                          >
                            {cat.name}
                          </span>
                          <span
                            className={`mt-1 block text-sm leading-snug text-white/80 transition-all duration-300 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${
                              big ? "sm:text-base" : "hidden sm:block"
                            }`}
                          >
                            {tagline}
                          </span>
                        </span>
                        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-300 group-hover:rotate-45 sm:flex">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </span>
                      {/* Ink bar slides in on hover */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                        style={{
                          background: [
                            INK.cyan,
                            INK.magenta,
                            INK.yellow,
                            INK.red,
                          ][i % 4],
                        }}
                      />
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <Reveal className="mt-10 text-center sm:mt-12">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              View all {categoryProducts.length} categories{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. Industries we serve */}
      <section className="relative overflow-hidden bg-[#FAF8F5] py-14 sm:py-24">
        <Halftone
          color={INK.cyan}
          className="-left-24 -top-24 h-80 w-80"
          opacity={0.35}
        />
        <Halftone
          color={INK.magenta}
          className="-bottom-28 -right-20 h-96 w-96"
          opacity={0.25}
        />
        <div className="relative mx-auto max-w-7xl px-5">
          <SectionTitle
            title="Printing for every kind of business"
            subtitle="Whatever you run, we print what your customers see and hold."
          />
          <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {industries.map(({ icon: Icon, color, title, slugs }, i) => (
              <li key={title}>
                <Reveal delay={i * 90} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}14` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color }}
                        strokeWidth={1.7}
                      />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {slugs.map((slug) => {
                        const cat = getCategoryBySlug(slug);
                        if (!cat) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/categories/${slug}`}
                              className="inline-block rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-950"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Numbers (all real) */}
      <section
        className="relative overflow-hidden py-14 text-white sm:py-16"
        style={{ background: INK.key }}
      >
        <Halftone
          color={INK.yellow}
          className="-right-10 -top-16 h-72 w-72"
          opacity={0.25}
          spacing={12}
        />
        <Halftone
          color={INK.cyan}
          className="-bottom-20 -left-10 h-72 w-72"
          opacity={0.25}
          spacing={12}
        />
        <ul className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 lg:grid-cols-4">
          {stats.map(({ value, label, color }, i) => (
            <li
              key={label}
              className={`text-center ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <Reveal delay={i * 90}>
                <p
                  className="text-4xl font-semibold tracking-tight sm:text-5xl"
                  style={{ color }}
                >
                  {value}
                </p>
                <p className="mt-2 text-sm text-neutral-300 sm:text-base">
                  {label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Real Google reviews */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title="What our customers say"
            subtitle={`Real reviews from our Google Business Profile, rated ${GOOGLE_RATING} by ${GOOGLE_REVIEW_COUNT} customers.`}
          />
          <Reveal className="mt-10 sm:mt-12">
            <ReviewsSlider reviews={googleReviews} />
          </Reveal>
          <div className="mt-8 text-center sm:mt-10">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              Read all {GOOGLE_REVIEW_COUNT} reviews on Google{" "}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. How to order: timeline */}
      <section className="relative overflow-hidden bg-[#FAF8F5] py-14 sm:py-24">
        <Halftone
          color={INK.yellow}
          className="-right-24 top-10 h-80 w-80"
          opacity={0.4}
        />
        <div className="relative mx-auto max-w-6xl px-5">
          <SectionTitle
            title="How to order"
            subtitle="Three simple steps, all on WhatsApp."
          />
          <div className="relative mt-12 md:mt-16">
            {/* Dashed line joining the steps */}
            <span
              aria-hidden
              className="absolute left-[16.7%] right-[16.7%] top-8 hidden border-t-2 border-dashed border-neutral-300 md:block"
            />
            <span
              aria-hidden
              className="absolute bottom-10 left-8 top-8 border-l-2 border-dashed border-neutral-300 md:hidden"
            />
            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map(({ icon: Icon, color, title, text }, i) => (
                <li key={title} className="relative">
                  <Reveal
                    delay={i * 150}
                    className="flex gap-5 md:flex-col md:items-center md:text-center"
                  >
                    <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-8 ring-[#FAF8F5]">
                      <Icon
                        className="h-7 w-7"
                        style={{ color }}
                        strokeWidth={1.7}
                      />
                      <span
                        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </span>
                    </span>
                    <div className="md:mt-6">
                      <p
                        className="text-xs font-semibold uppercase tracking-[0.14em]"
                        style={{ color }}
                      >
                        Step {i + 1}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                      <p className="mt-2 max-w-xs leading-relaxed text-neutral-500 md:mx-auto">
                        {text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="mt-12 text-center">
            <WhatsAppButton label="Start your order on WhatsApp" />
          </Reveal>
        </div>
      </section>

      {/* 8. Client logos */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            title="Brands we've printed for"
            subtitle="A few of the businesses we work with in Lahore."
          />
        </div>
        <Reveal className="mt-8 sm:mt-10">
          <ClientMarquee clients={clientLogos} />
        </Reveal>
      </section>

      {/* 9. Closing call to action */}
      <section
        className="relative overflow-hidden px-5 py-20 text-center text-white sm:py-24"
        style={{ background: INK.key }}
      >
        <Halftone
          color={INK.magenta}
          className="-left-16 -top-20 h-80 w-80"
          opacity={0.3}
          spacing={12}
        />
        <Halftone
          color={INK.cyan}
          className="-bottom-24 -right-16 h-96 w-96"
          opacity={0.25}
          spacing={12}
        />
        <div className="relative">
          <SectionTitle
            title="Have something in mind?"
            subtitle={`Send us a message on WhatsApp and get a free quote today. ${siteConfig.hoursDays}, ${siteConfig.hoursTime}.`}
            onDark
          />
          <Reveal className="mt-9 flex justify-center">
            <WhatsAppButton
              label={`WhatsApp ${siteConfig.phoneDisplay}`}
              light
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
