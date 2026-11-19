import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { categoryProducts, getCategoryBySlug, getCategoryImage } from "@/data/categoryProducts";
import CategoryPageView from "@/components/category/CategoryPageView";
import { getCategorySeo } from "@/data/categorySeo";
import { pageMeta } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render every known category at build time. New categories added to
// data/categoryProducts.ts are automatically picked up here.
export function generateStaticParams() {
  return categoryProducts.map((category) => ({ slug: category.slug }));
}

// Unknown slugs get a real HTTP 404. Without this, the root loading.tsx makes
// the response stream with status 200 before notFound() runs (a "soft 404").
// Category data is read at build time anyway, so a category added in the
// admin panel only appears after the next build, with or without this.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  const seo = getCategorySeo(category.slug, category.name);

  return pageMeta({
    title: seo.title,
    description: seo.description,
    path: `/categories/${category.slug}`,
    image: getCategoryImage(category.slug),
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryPageView category={category} />;
}
