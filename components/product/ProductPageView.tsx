import Link from "next/link";
import { Check, ChevronDown, Clock, Package, Phone, Star, Truck } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import { type ProductDetail } from "@/data/productDetails";
import { getProductBySlug } from "@/data/productDetails";
import { getCategoryBySlug, hasOwnPhoto } from "@/data/categoryProducts";
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import ProductCard from "@/components/site/ProductCard";
import QuoteButton, { quoteMessage } from "@/components/site/QuoteButton";
import SectionTitle from "@/components/site/SectionTitle";
import ReviewsSection from "@/components/site/ReviewsSection";
import HowToOrder from "@/components/site/HowToOrder";
import ClosingCta from "@/components/site/ClosingCta";
import ProductGallery from "@/components/product/ProductGallery";
import QuoteBuilder from "@/components/product/QuoteBuilder";
import MobileQuoteBar from "@/components/product/MobileQuoteBar";
import { TEXT } from "@/lib/typography";

const CHECK_COLORS = [INK.cyan, INK.magenta, "#E0A800", INK.key];

/** Redesigned product page (e.g. /products/premium-satin-ribbon). */
export default function ProductPageView({ product }: { product: ProductDetail }) {
  const category = getCategoryBySlug(product.category);
  const message = quoteMessage(product.title);
  const specs = Object.entries(product.specifications);
  const minimumOrder = product.specifications["Minimum Order"];
  const turnaround = product.specifications["Turnaround Time"];
  const [intro, second, ...more] = product.longDescription;
  const others = category
    ? category.products
        .filter((p) => p.slug !== product.slug)
        .sort((a, b) => Number(hasOwnPhoto(b, category)) - Number(hasOwnPhoto(a, category)))
    : [];

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* 1. Photos and the essentials */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.cyan} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.3} />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-6 sm:pb-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
              { label: product.title },
            ]}
          />
          <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGallery images={product.images} title={product.title} />
            </div>

            <div className="lg:pt-4">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900"
                >
                  <InkStripe className="h-1.5 w-10" />
                  {category.name}
                </Link>
              )}
              <h1 className={`mt-4 ${TEXT.display}`}>
                {product.title}
              </h1>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[15px] text-neutral-600 hover:text-neutral-950"
              >
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </span>
                <span>
                  <span className="font-medium text-neutral-900">{GOOGLE_RATING}</span> ·{" "}
                  <span className="underline decoration-neutral-300 underline-offset-4">
                    {GOOGLE_REVIEW_COUNT} Google reviews
                  </span>
                </span>
              </a>
              <p className={`mt-5 ${TEXT.lead}`}>{product.shortDescription}</p>

              {/* Key facts from the product's own specifications */}
              {(minimumOrder || turnaround) && (
                <dl className="mt-6 grid grid-cols-2 gap-3">
                  {minimumOrder && (
                    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
                      <dt className="flex items-center gap-2 text-sm text-neutral-500">
                        <Package className="h-4 w-4" style={{ color: INK.cyan }} /> Minimum order
                      </dt>
                      <dd className="mt-1 font-semibold">{minimumOrder}</dd>
                    </div>
                  )}
                  {turnaround && (
                    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
                      <dt className="flex items-center gap-2 text-sm text-neutral-500">
                        <Clock className="h-4 w-4" style={{ color: INK.magenta }} /> Ready in
                      </dt>
                      <dd className="mt-1 font-semibold">{turnaround}</dd>
                    </div>
                  )}
                </dl>
              )}

              {/* Options, quantity and a ready-made WhatsApp message */}
              <div id="quote-builder" className="mt-6 scroll-mt-28">
                <QuoteBuilder title={product.title} specifications={product.specifications} />
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="inline-flex items-center gap-1.5 font-medium text-neutral-800 hover:text-neutral-950"
                >
                  <Phone className="h-4 w-4" /> Prefer to call? {siteConfig.phoneDisplay}
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-4 w-4" /> Delivery across Pakistan
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Details and specifications */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <SectionTitle title={`About ${product.title}`} align="left" />
            {/* Highlights */}
            <Reveal className="mt-8">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((f, i) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-xl bg-[#FAF8F5] p-4 text-[15px] leading-relaxed text-neutral-700"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${CHECK_COLORS[i % CHECK_COLORS.length]}1F` }}
                    >
                      <Check
                        className="h-3.5 w-3.5"
                        style={{ color: CHECK_COLORS[i % CHECK_COLORS.length] }}
                        strokeWidth={2.5}
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="mt-6 space-y-5 text-[17px] leading-8 text-neutral-600">
              {intro && <p>{intro}</p>}
              {second && <p>{second}</p>}
              {more.length > 0 && (
                <details className="group">
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

          {specs.length > 0 && (
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-[#FAF8F5] p-6 sm:p-8">
                <h2 className="flex items-center gap-3 text-xl font-semibold">
                  <InkStripe className="h-1.5 w-8" /> Specifications
                </h2>
                <dl className="mt-5 divide-y divide-neutral-200">
                  {specs.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[42%_1fr] gap-4 py-3 text-[15px]">
                      <dt className="text-neutral-500">{key}</dt>
                      <dd className="font-medium text-neutral-900">{value}</dd>
                    </div>
                  ))}
                </dl>
                <QuoteButton message={message} className="mt-6 w-full" />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 3. Questions */}
      {product.faq.length > 0 && (
        <section className="bg-[#FAF8F5] py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <SectionTitle title="Common questions" subtitle={`About ordering ${product.title.toLowerCase()}.`} />
            <div className="mt-10 space-y-3">
              {product.faq.map((item, i) => (
                <Reveal key={item.question} delay={i * 60}>
                  <details className="group rounded-2xl bg-white px-6 py-5 ring-1 ring-black/5 open:shadow-md" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold sm:text-lg [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ChevronDown className="h-5 w-5 shrink-0 text-neutral-400 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-neutral-600">{item.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. More from this category */}
      {category && others.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5">
            <SectionTitle
              title={`More ${category.name.toLowerCase()}`}
              subtitle="Other options in the same range."
            />
            <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {others.slice(0, 4).map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={i * 90} className="h-full">
                    <ProductCard
                      slug={p.slug}
                      title={p.title}
                      description={p.shortDescription}
                      image={hasOwnPhoto(p, category) ? p.image : undefined}
                      hasDetails={Boolean(getProductBySlug(p.slug))}
                      index={i}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:border-neutral-900"
              >
                See all {category.name.toLowerCase()}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. Real reviews, how to order, closing */}
      <div className="border-t border-neutral-200">
        <ReviewsSection />
      </div>
      <HowToOrder quoteMessage={message} />
      <ClosingCta title={`Want ${product.title.toLowerCase()} with your logo?`} message={message} />
      <MobileQuoteBar title={product.title} />
    </main>
  );
}
