import categoriesJson from "./categoryProducts.json";

export interface Product {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  seoDescription: string[];
  products: Product[];
}

export const categoryProducts: Category[] = categoriesJson as Category[];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoryProducts.find((category) => category.slug === slug);
}

// A few category images in /public/images/categories don't match the slug.
const categoryImageOverrides: Record<string, string> = {
  "label-hang-tags": "label-and-hang-tags.png",
  "custom-t-shirts": "custom-tshirts.png",
  "stand-up-pouches": "standup-pouches.png",
  "thank-you-cards": "thankyou-cards.png",
  // TEMPORARY: these categories have no photos of their own yet, so they
  // borrow the closest existing image. Replace them with real photos.
  "cosmetic-boxes": "hard-drawer-boxes.png",
  "gift-bags": "ziplock-frosted-bags.png",
  "shopping-bags": "ziplock-frosted-bags.png",
};

/** Cover image for a category card. */
export function getCategoryImage(slug: string): string {
  return `/images/categories/${categoryImageOverrides[slug] ?? `${slug}.png`}`;
}
