import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronDown, FileCheck, Star, Truck } from "lucide-react";
import { brandFont, INK } from "@/lib/brand";
import { relatedCategorySlugs } from "@/lib/navigation";
import { type Category, getCategoryBySlug, getCategoryImage, hasOwnPhoto } from "@/data/categoryProducts";
import { getProductBySlug } from "@/data/productDetails";
import { getCategorySeo } from "@/data/categorySeo";
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import PhotoFrame from "@/components/site/PhotoFrame";
import ProductCard from "@/components/site/ProductCard";
import QuoteButton, { quoteMessage } from "@/components/site/QuoteButton";
import SectionTitle from "@/components/site/SectionTitle";
import Benefits from "@/components/site/Benefits";
import ClientMarquee from "@/components/ClientMarquee";
import { clientLogos } from "@/data/clientLogos";
import ReviewsSection from "@/components/site/ReviewsSection";
import HowToOrder from "@/components/site/HowToOrder";
import ClosingCta from "@/components/site/ClosingCta";
import { TEXT } from "@/lib/typography";

const INK_PAIRS: [string, string][] = [
  [INK.cyan, INK.magenta],
  [INK.magenta, INK.yellow],
  [INK.yellow, INK.cyan],
];

/** Redesigned category page (e.g. /categories/stickers). */
export default function CategoryPageView({ category }: { category: Category }) {
  const seo = getCategorySeo(category.slug, category.name);
  const count = category.products.length;
  const message = quoteMessage(category.name.toLowerCase());
  const inks = INK_PAIRS[category.slug.length % INK_PAIRS.length];
  // "custom stickers", but not "custom custom t-shirts"
  const lower = category.name.toLowerCase();
  const customName = lower.startsWith("custom") ? lower : `custom ${lower}`;
  const [intro, ...more] = category.seoDescription;
  const withPhoto = category.products.filter((p) => hasOwnPhoto(p, category));
  const withoutPhoto = category.products.filter((p) => !hasOwnPhoto(p, category));
  const related = relatedCategorySlugs(category.slug)
    .map((s) => getCategoryBySlug(s))
    .filter((c): c is Category => Boolean(c));

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={inks[0]} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.3} />
        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-6 sm:pb-14 lg:pb-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "All products", href: "/categories" },
              { label: category.name },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 lg:mt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <p className={TEXT.eyebrow}>
                <InkStripe className="h-1.5 w-10" />
                {count} products · Printed in Lahore
              </p>
              <h1 className={`mt-5 ${TEXT.display}`}>
                {seo.title}
              </h1>
              <p className={`mt-5 max-w-xl ${TEXT.lead}`}>
                {seo.description}
              </p>
              <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                <QuoteButton message={message} />
                <a
                  href="#products"
                  className="inline-flex items-center gap-1.5 px-1 py-2 text-base font-medium text-neutral-800 hover:text-neutral-950 sm:py-3"
                >
                  See {count} products <ArrowDown className="h-4 w-4" />
                </a>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-neutral-600">
                <li>
                  <a
                    href={GOOGLE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-neutral-950"
                  >
                    <Star className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                    <span>
                      <span className="font-medium text-neutral-900">{GOOGLE_RATING}</span> ·{" "}
                      {GOOGLE_REVIEW_COUNT} Google reviews
                    </span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-2">
                  <FileCheck className="h-4 w-4" style={{ color: INK.magenta }} /> Free design proof
                </li>
                <li className="inline-flex items-center gap-2">
                  <Truck className="h-4 w-4" style={{ color: INK.cyan }} /> Delivery across Pakistan
                </li>
              </ul>
            </div>
            <PhotoFrame
              src={getCategoryImage(category.slug)}
              alt={`${customName} printed by Ramdan Flex Printers`}
              inks={inks}
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. Products */}
      <section id="products" className="scroll-mt-24 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <SectionTitle
            title={`Our ${category.name.toLowerCase()}`}
            subtitle="Pick a product for the details, or ask for a quote on WhatsApp. We'll reply with the price and timing."
          />
          {/* Products with their own photo first; the rest as text-only option
              cards, so the category photo isn't repeated on every card. */}
          {withPhoto.length > 0 && (
            <ul
              className={`mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 ${
                withPhoto.length === 2 ? "mx-auto max-w-5xl" : "lg:grid-cols-3"
              }`}
            >
              {withPhoto.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 3) * 90} className="h-full">
                    <ProductCard
                      slug={p.slug}
                      title={p.title}
                      description={p.shortDescription}
                      image={p.image}
                      hasDetails={Boolean(getProductBySlug(p.slug))}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
          {withoutPhoto.length > 0 && (
            <>
              {withPhoto.length > 0 && (
                <h3 className="mt-14 text-xl font-semibold">More {category.name.toLowerCase()} options</h3>
              )}
              <ul
                className={`grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 ${
                  withPhoto.length > 0 ? "mt-5" : "mt-10 sm:mt-12"
                }`}
              >
                {withoutPhoto.map((p, i) => (
                  <li key={p.slug}>
                    <Reveal delay={(i % 3) * 90} className="h-full">
                      <ProductCard
                        slug={p.slug}
                        title={p.title}
                        description={p.shortDescription}
                        hasDetails={Boolean(getProductBySlug(p.slug))}
                        index={i}
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Trusted by (real client logos) */}
      <section className="border-t border-neutral-200 py-10 sm:py-14">
        <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Trusted by brands across Lahore
        </p>
        <div className="mt-6">
          <ClientMarquee clients={clientLogos} />
        </div>
      </section>

      {/* 3. Promises */}
      <Benefits headingLevel="h3" />

      {/* 4. About this category (the long SEO text, tidied up) */}
      {intro && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <SectionTitle title={`About ${customName}`} align="left" />
            <Reveal className="text-[17px] leading-8 text-neutral-600">
              <p>{intro}</p>
              {more.length > 0 && (
                <details className="group mt-5">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-medium text-neutral-900 hover:underline hover:underline-offset-4 [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Read more</span>
                    <span className="hidden group-open:inline">Show less</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-5 space-y-5">
                    {more.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </details>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* 5. Real reviews */}
      <div className="border-t border-neutral-200">
        <ReviewsSection />
      </div>

      {/* 6. How to order */}
      <HowToOrder quoteMessage={message} />

      {/* 7. Related categories */}
      {related.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5">
            <SectionTitle title="You may also like" />
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={i * 90}>
                    <Link href={`/categories/${c.slug}`} className="group block">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                        <Image
                          src={getCategoryImage(c.slug)}
                          alt={c.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="mt-3 flex items-center justify-between gap-2 text-base font-medium sm:text-lg">
                        {c.name}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:rotate-45 group-hover:text-neutral-900" />
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 8. Closing call to action */}
      <ClosingCta title={`Ready to order ${category.name.toLowerCase()}?`} message={message} />
    </main>
  );
}
