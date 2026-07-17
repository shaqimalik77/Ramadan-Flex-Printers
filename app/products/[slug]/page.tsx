import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  productDetails,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/productDetails";

import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductSpecs from "@/components/ProductSpecs";
import ProductFAQ from "@/components/ProductFAQ";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render every known product at build time. New products added to
// data/productDetails.ts are automatically picked up here.
export function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const title = `${product.title} | Custom Printing & Packaging in Pakistan`;
  const description = product.shortDescription;
  const image = product.images[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.category, product.slug, 4);

  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-5xl px-4 pt-4 text-sm text-neutral-500 sm:px-6 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-neutral-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categories/${product.category}`}
              className="hover:text-neutral-800"
            >
              {product.categoryName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-neutral-800" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>

        <ProductSpecs specifications={product.specifications} />

        <section className="border-t border-neutral-200 py-8 sm:py-10">
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
            About {product.title}
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-neutral-700 sm:text-base">
            {product.longDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <ProductFAQ faq={product.faq} />

        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
