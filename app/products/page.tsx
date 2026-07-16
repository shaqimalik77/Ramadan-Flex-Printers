"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Grid, ChevronRight } from "lucide-react";
import { categoryProducts } from "@/data/categoryProducts";
import { siteConfig } from "@/lib/siteConfig";

const FALLBACK_LOGO_SRC = "/Images/logo/logo.png";

function buildWhatsAppLink(productName: string): string {
  const message = `Hi, I'm interested in getting a quote for ${productName}. Could you please share pricing and details?`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Flatten all products from all categories and associate category slug/name
  const allProducts = categoryProducts.flatMap((category) =>
    category.products.map((product) => ({
      ...product,
      categoryName: category.name,
      categorySlug: category.slug,
    }))
  );

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.categorySlug === selectedCategory);

  return (
    <main className="bg-neutral-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 text-sm text-neutral-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-[#E41F26] transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Products</span>
          </li>
        </ol>
      </nav>

      {/* Hero Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <span className="inline-block text-xs font-semibold tracking-wider text-[#E41F26] uppercase mb-3">
            Our Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Premium Printing & Packaging Solutions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Browse our complete range of customized boxes, stickers, ribbons, wedding cards, and promotional giveaways. High quality and fast nationwide delivery.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 pb-4 border-b border-neutral-200">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#E41F26] text-white shadow-md shadow-[#E41F26]/20"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            All Products
          </button>
          {categoryProducts.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-[#E41F26] text-white shadow-md shadow-[#E41F26]/20"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const whatsappLink = buildWhatsAppLink(product.title);
            return (
              <div
                key={`${product.categorySlug}-${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {product.categoryName}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-neutral-900 leading-snug group-hover:text-[#E41F26] transition-colors">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 line-clamp-2 leading-relaxed flex-grow">
                    {product.shortDescription}
                  </p>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors duration-200 hover:bg-green-700 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get Quote on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
