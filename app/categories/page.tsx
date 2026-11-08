import type { Metadata } from "next";
import Link from "next/link";
import { categoryProducts, getCategoryImage } from "@/data/categoryProducts";
import SmartImage from "@/components/Smartimage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Printing & Packaging Categories",
  description:
    "Browse all printing and packaging categories at Ramdan Flex Printers, Lahore: boxes, pouches, stickers, tags, cards, mugs, signs and more. Get a quote.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <main className="bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight text-center mb-10">
          Our Printing & Packaging Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group block bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                <SmartImage
                  src={getCategoryImage(category.slug)}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5 text-center">
                <h2 className="text-lg font-bold text-neutral-900 group-hover:text-[var(--hero-primary,_#E31E24)] transition-colors">
                  {category.name}
                </h2>
                <p className="mt-2 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  {category.seoDescription[0] || "Premium custom printing services."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
