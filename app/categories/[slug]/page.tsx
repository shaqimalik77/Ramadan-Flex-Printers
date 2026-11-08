import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { categoryProducts, getCategoryBySlug, getCategoryImage } from "@/data/categoryProducts";
import CategoryHero from "@/components/CategoryHero";
import CategoryProducts from "@/components/CategoryProducts";
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
            <Link href="/categories" className="hover:text-neutral-800">
              Categories
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-neutral-800" aria-current="page">
            {category.name}
          </li>
        </ol>
      </nav>

      <CategoryHero category={category} />
      <CategoryProducts products={category.products} />
    </main>
  );
}