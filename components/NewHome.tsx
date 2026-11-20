import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  HeartPulse,
  PartyPopper,
  Shirt,
  UtensilsCrossed,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import {
  categoryProducts,
  getCategoryBySlug,
  getCategoryImage,
} from "@/data/categoryProducts";
import Halftone from "@/components/Halftone";
import Reveal from "@/components/Reveal";
import HeroSlider from "@/components/HeroSlider";
import { clientLogos } from "@/data/clientLogos";
import ClientMarquee from "@/components/ClientMarquee";
import SectionTitle from "@/components/site/SectionTitle";
import Benefits from "@/components/site/Benefits";
import HowToOrder from "@/components/site/HowToOrder";
import ReviewsSection from "@/components/site/ReviewsSection";
import ClosingCta from "@/components/site/ClosingCta";
import neonPhoto from "@/assets/hero/neon-signs.jpg";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
} from "@/data/googleReviews";

/**
 * The homepage.
 *
 * Identity: the four printing inks (CMYK) from the Ramdan logo, crop marks
 * and halftone dots like on printed proofs, a light friendly font and lots of
 * white space. Every claim and number on this page is real (see comments).
 */



const YELLOW_TEXT = "#E0A800"; // yellow ink is too light for icons/text on white


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
      <Benefits />

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
      <ReviewsSection />

      {/* 7. How to order: timeline */}
      <HowToOrder />

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
      <ClosingCta />
    </main>
  );
}
