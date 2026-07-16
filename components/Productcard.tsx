"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import SmartImage from "./Smartimage";
import { siteConfig } from "@/lib/siteConfig";
import { getProductBySlug } from "@/data/productDetails";

type FeaturedProduct = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

// Map featured homepage product slugs to their correct category pages
const slugCategoryMap: Record<string, string> = {
  "custom-stickers": "/categories/stickers",
  "business-cards": "/categories/business-cards",
  "wedding-cards": "/categories/wedding-cards",
  "hang-tags": "/categories/label-hang-tags",
  "custom-boxes": "/categories/ecommerce-boxes",
  "paper-bags": "/categories/ecommerce-boxes",
  "mugs": "/categories/mugs",
  "ribbons": "/categories/ribbons",
};

function whatsappHrefFor(productName: string) {
  const message = `Hi, I'd like a quote for ${productName}.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product }: { product: FeaturedProduct }) {
  const hasDetails = !!getProductBySlug(product.slug);
  const targetHref = hasDetails 
    ? `/products/${product.slug}` 
    : (slugCategoryMap[product.slug] || `/categories/${product.slug}`);

  return (
    <li className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image + name + description navigate to the product or category page */}
      <Link href={targetHref} className="group flex flex-1 flex-col">
        <div className="relative aspect-[10/9] w-full overflow-hidden bg-gray-50">
          <SmartImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-sm font-semibold text-gray-900 sm:text-base">{product.name}</h3>
          <p className="line-clamp-3 text-xs text-gray-500 sm:text-sm">{product.description}</p>
        </div>
      </Link>

      {/* Separate control (not nested inside the Link above) */}
      <div className="px-4 pb-4">
        <a
          href={whatsappHrefFor(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#E41F26] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b91219] sm:text-sm"
        >
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Get Quote on WhatsApp
        </a>
      </div>
    </li>
  );
}