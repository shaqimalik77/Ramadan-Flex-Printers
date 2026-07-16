"use client";

import Link from "next/link";
import {
  bestSellingProducts,
  packagingProducts,
  type CategoryItem,
} from "@/data/bestSellingData";
import SmartImage from "./Smartimage";

const categorySlugMap: Record<string, string> = {
  "shirts": "/categories/custom-t-shirts",
  "neon-signs": "/categories/neon-signs",
  "3d-boards": "/categories/3d-boards",
  "flex-designs": "/categories/flex-designs",
  "promotional-products": "/categories/promotional-products",
  "stickers": "/categories/stickers",
  "ribbons": "/categories/ribbons",
  "butter-paper": "/categories/butter-paper",
  "jewellery-cards": "/categories/jewellery-cards",
  "polaroids": "/categories/polaroids",
  "business-cards": "/categories/business-cards",
  "label-and-hang-tags": "/categories/label-hang-tags",
  "thankyou-cards": "/categories/thank-you-cards",
  "fabric-tags": "/categories/fabric-tags",
  "ecommerce-boxes": "/categories/ecommerce-boxes",
  "standup-pouches": "/categories/stand-up-pouches",
  "hard-drawer-boxes": "/categories/hard-drawer-boxes",
  "ziplock-frosted-bags": "/categories/ziplock-frosted-bags",
  "courier-flyer-poly-bags": "/categories/courier-flyer-poly-bags",
  "wedding-cards": "/categories/wedding-cards",
  "mugs": "/categories/mugs",
};

function CategoryCard({ category }: { category: CategoryItem }) {
  const targetHref = categorySlugMap[category.id] || category.href;

  return (
    <li className="list-none">
      <Link
        href={targetHref}
        className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
      >
        <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
          <SmartImage
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        {/* Fixed title strip under the image */}
        <div className="flex h-9 items-center justify-center bg-[#E41F26] px-2 transition-colors duration-300 group-hover:bg-[#b91219] text-center">
          <span className="truncate text-xs font-bold uppercase tracking-wider text-white">
            {category.name}
          </span>
        </div>
      </Link>
    </li>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
      <span aria-hidden className="h-px flex-1 bg-neutral-200" />
      <h2 className="whitespace-nowrap border border-neutral-200 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-neutral-800 sm:text-sm rounded-xl">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

export default function BestSelling() {
  return (
    <>
      <section aria-label="Best Selling Products" className="bg-white py-10 sm:py-12 md:py-14">
        {/* Centered max-w-5xl container */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Best Selling Products" />
          {/* 5 items on a single row on desktop, wrapping to 3/2 on tablets */}
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 p-0 m-0">
            {bestSellingProducts.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Packaging Products" className="bg-white py-10 sm:py-12 md:py-14">
        {/* Centered max-w-5xl container */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Packaging Products" />
          {/* 16 items in a grid with 4 columns */}
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 p-0 m-0">
            {packagingProducts.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
