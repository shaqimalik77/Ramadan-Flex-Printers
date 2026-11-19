"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/site/ProductCard";
import QuoteButton from "@/components/site/QuoteButton";

export interface FinderItem {
  slug: string;
  title: string;
  description: string;
  /** Only set when the product has a photo of its own. */
  image?: string;
  hasDetails: boolean;
  categorySlug: string;
  categoryName: string;
}

/**
 * Searchable, filterable list of every product (/products). Replaces the old
 * header search, which pointed to a page that never existed.
 */
export default function ProductFinder({
  items,
  categories,
}: {
  items: FinderItem[];
  categories: { slug: string; name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((it) => {
      if (category !== "all" && it.categorySlug !== category) return false;
      if (!words.length) return true;
      const hay = `${it.title} ${it.description} ${it.categoryName}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [items, query, category]);

  // Photo cards first, so the grid opens with pictures.
  const sorted = useMemo(
    () => [...results].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image))),
    [results]
  );

  return (
    <div>
      {/* Search box */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, e.g. boxes, stickers, mugs…"
          aria-label="Search products"
          className="h-14 w-full rounded-2xl border border-neutral-300 bg-white pl-12 pr-12 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-900 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
        {[{ slug: "all", name: "All" }, ...categories].map((c) => {
          const selected = category === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(c.slug)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                selected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-neutral-500" aria-live="polite">
        {sorted.length} {sorted.length === 1 ? "product" : "products"}
        {query && <> for &ldquo;{query}&rdquo;</>}
      </p>

      {sorted.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((it, i) => (
            <li key={`${it.categorySlug}-${it.slug}`}>
              <ProductCard
                slug={it.slug}
                title={it.title}
                description={it.description}
                image={it.image}
                hasDetails={it.hasDetails}
                index={i}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl bg-[#FAF8F5] px-6 py-12 text-center">
          <p className="text-lg font-semibold">No products match that search</p>
          <p className="mx-auto mt-2 max-w-md text-neutral-600">
            We print much more than what&apos;s listed. Tell us what you need and we&apos;ll quote it.
          </p>
          <div className="mt-6 flex justify-center">
            <QuoteButton
              label="Ask on WhatsApp"
              message={query ? `Hi, do you print ${query}? I'd like a quote.` : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
