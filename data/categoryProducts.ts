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