import detailsJson from "./productDetails.json";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDetail {
  slug: string;
  category: string;
  categoryName: string;
  title: string;
  images: string[];
  shortDescription: string;
  longDescription: string[];
  features: string[];
  specifications: Record<string, string>;
  faq: FaqItem[];
}

export const productDetails: ProductDetail[] = detailsJson as any[];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return productDetails.find((product) => product.slug === slug);
}

export function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 4
): ProductDetail[] {
  return productDetails
    .filter((product) => product.category === category && product.slug !== excludeSlug)
    .slice(0, limit);
}
