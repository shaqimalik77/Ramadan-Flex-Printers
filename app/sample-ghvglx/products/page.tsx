import type { Metadata } from "next";
import Link from "next/link";
import { brandFont, INK } from "@/lib/brand";
import { categoryProducts, hasOwnPhoto } from "@/data/categoryProducts";
import { getProductBySlug } from "@/data/productDetails";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import HowToOrder from "@/components/site/HowToOrder";
import ClosingCta from "@/components/site/ClosingCta";
import ProductFinder, { type FinderItem } from "@/components/catalog/ProductFinder";

// Client preview of the new products page. Kept out of Google.
export const metadata: Metadata = {
  title: "Products preview",
  robots: { index: false, follow: false },
};

/** Every product, searchable and filterable by category. */
export default function PreviewProductsPage() {
  const items: FinderItem[] = categoryProducts.flatMap((c) =>
    c.products.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.shortDescription,
      image: hasOwnPhoto(p, c) ? p.image : undefined,
      hasDetails: Boolean(getProductBySlug(p.slug)),
      categorySlug: c.slug,
      categoryName: c.name,
    }))
  );

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.magenta} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.25} />
        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-6 sm:pb-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <div className="mt-8 max-w-3xl sm:mt-12">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              <InkStripe className="h-1.5 w-10" />
              {items.length} products
            </p>
            <h1 className="mt-5 text-[2.3rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Find your product
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Search everything we print, or{" "}
              <Link href="/categories" className="font-medium text-neutral-900 underline underline-offset-4">
                browse by category
              </Link>
              . Every product can carry your logo; ask for a quote on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5">
          <ProductFinder items={items} categories={categoryProducts.map((c) => ({ slug: c.slug, name: c.name }))} />
        </div>
      </section>

      <HowToOrder />
      <ClosingCta title="Can't find what you need?" />
    </main>
  );
}
