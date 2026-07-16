"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { promotionalProducts, type PromotionalProduct } from "@/data/promotionalProductsData";
import { siteConfig } from "@/lib/siteConfig";
import SmartImage from "./Smartimage";

// Map promotional products to their respective category pages
const promoCategoryMap: Record<string, string> = {
  "promotional-mugs": "/categories/mugs",
  "corporate-diaries": "/categories/promotional-products",
  "custom-pens": "/categories/promotional-products",
  "keychains": "/categories/promotional-products",
  "tote-bags": "/categories/promotional-products",
  "mouse-pads": "/categories/promotional-products",
  "lanyards": "/categories/promotional-products",
  "water-bottles": "/categories/promotional-products",
};

function whatsappHrefFor(productName: string) {
  const message = `Hi, I'd like a quote for ${productName}.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function ProductCard({ product }: { product: PromotionalProduct }) {
  const targetHref = promoCategoryMap[product.id] || "/categories/promotional-products";

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
      <Link href={targetHref} className="group flex flex-1 flex-col">
        {/* Aspect-square ensures consistent image ratios across all products */}
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
          <SmartImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-4 text-center">
          <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-neutral-500 leading-relaxed min-h-[32px]">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <a
          href={whatsappHrefFor(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#E41F26] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91219] sm:text-sm cursor-pointer shadow-sm"
        >
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Get Quote
        </a>
      </div>
    </li>
  );
}

export default function PromotionalProducts() {
  return (
    <section aria-label="Promotional Products" className="bg-white py-10 sm:py-12 md:py-14">
      {/* Centered inside a max-w-5xl container for elegant spacing */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
          <span aria-hidden className="h-px flex-1 bg-neutral-200" />
          <h2 className="whitespace-nowrap border border-neutral-200 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-neutral-800 sm:text-sm rounded-xl">
            Promotional Products
          </h2>
          <span aria-hidden className="h-px flex-1 bg-neutral-200" />
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promotionalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}