import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { productDetails, getProductBySlug } from "@/data/productDetails";

import ProductPageView from "@/components/product/ProductPageView";
import { pageMeta } from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render every known product at build time. New products added to
// data/productDetails.ts are automatically picked up here.
export function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

// Unknown slugs return a real HTTP 404 instead of a streamed 200 (soft 404).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  // Keep descriptions under ~155 characters.
  const short = product.shortDescription.trim();
  const description =
    short.length < 110
      ? `${short} Made in Lahore, delivered across Pakistan.`
      : `${short} Delivery across Pakistan.`;

  return pageMeta({
    title: `${product.title} in Lahore`,
    description,
    path: `/products/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageView product={product} />;
}
