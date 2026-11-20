import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { brandFont, INK } from "@/lib/brand";
import { getCategoryBySlug } from "@/data/categoryProducts";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import QuoteButton from "@/components/site/QuoteButton";
import { TEXT } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const popular = ["ecommerce-boxes", "business-cards", "stickers", "custom-t-shirts", "wedding-cards", "neon-signs"];

/** Branded 404 page with a way forward. */
export default function NotFound() {
  const cats = popular.map((s) => getCategoryBySlug(s)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  return (
    <main className={`${brandFont.className} relative flex min-h-[75vh] items-center overflow-hidden bg-[#FAF8F5] text-neutral-900`}>
      <Halftone color={INK.magenta} className="-right-24 -top-24 h-96 w-96" opacity={0.25} />
      <Halftone color={INK.cyan} className="-bottom-32 -left-24 h-96 w-96" opacity={0.25} />
      <div className="relative mx-auto w-full max-w-3xl px-5 py-20 text-center sm:py-28">
        <InkStripe className="mx-auto h-1.5 w-16" />
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Error 404</p>
        <h1 className={`mt-3 ${TEXT.display}`}>This page didn&apos;t print</h1>
        <p className={`mx-auto mt-5 max-w-xl ${TEXT.lead}`}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead, or ask us
          on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-base font-medium text-white hover:bg-neutral-700"
          >
            <Search className="h-5 w-5" /> Find a product
          </Link>
          <QuoteButton label="Ask on WhatsApp" />
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:border-neutral-900 hover:text-neutral-950"
              >
                {c.name} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
