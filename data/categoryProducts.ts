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
};

/** Cover image for a category card. */
export function getCategoryImage(slug: string): string {
  return `/images/categories/${categoryImageOverrides[slug] ?? `${slug}.png`}`;
}
