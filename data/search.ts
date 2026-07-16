import { categoryProducts, Category, Product } from "@/data/categoryProducts";
import { blogDetails, BlogDetail } from "@/data/blogDetails";
import { bestSellingProducts, CategoryItem } from "@/data/bestSellingData";
import { promotionalProducts, PromotionalProduct } from "@/data/promotionalProductsData";
import { productDetails } from "@/data/productDetails";

// Detailed product slugs that have a dedicated page at /products/[slug]
const DETAILED_PRODUCT_SLUGS = new Set(productDetails.map((p) => p.slug));

function getProductHref(categorySlug: string, productSlug: string): string {
  if (DETAILED_PRODUCT_SLUGS.has(productSlug)) {
    return `/products/${productSlug}`;
  }
  return `/categories/${categorySlug}`;
}

export type SearchResultType = "product" | "category" | "blog";

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  image: string;
  href: string;
  badge: string;
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function mapCategoryProducts(): SearchResultItem[] {
  return categoryProducts.flatMap((category: Category) =>
    category.products.map((product: Product) => ({
      id: `category-product-${product.slug}`,
      type: "product" as const,
      title: product.title,
      description: product.shortDescription,
      image: product.image,
      href: getProductHref(category.slug, product.slug),
      badge: "Product",
    }))
  );
}

function mapBestSellingProducts(): SearchResultItem[] {
  return bestSellingProducts.map((item: CategoryItem) => ({
    id: `best-selling-${item.id}`,
    type: "product" as const,
    title: item.name,
    description: `Shop our custom printed ${item.name} products.`,
    image: item.image,
    href: item.href,
    badge: "Product",
  }));
}

function mapPromotionalProducts(): SearchResultItem[] {
  return promotionalProducts.map((item: PromotionalProduct) => ({
    id: `promotional-${item.id}`,
    type: "product" as const,
    title: item.name,
    description: item.description,
    image: item.image,
    href: `/products?category=promotional-products`,
    badge: "Product",
  }));
}

function mapCategories(): SearchResultItem[] {
  return categoryProducts.map((category: Category) => ({
    id: `category-${category.slug}`,
    type: "category" as const,
    title: category.name,
    description: category.seoDescription[0] ?? "",
    image: category.products[0]?.image ?? "",
    href: `/categories/${category.slug}`,
    badge: "Category",
  }));
}

function mapBlogs(): SearchResultItem[] {
  return blogDetails.map((post: BlogDetail) => ({
    id: `blog-${post.slug}`,
    type: "blog" as const,
    title: post.title,
    description: post.excerpt,
    image: post.heroImage,
    href: `/blog/${post.slug}`,
    badge: "Blog",
  }));
}

const SEARCH_INDEX: SearchResultItem[] = [
  ...mapCategoryProducts(),
  ...mapBestSellingProducts(),
  ...mapPromotionalProducts(),
  ...mapCategories(),
  ...mapBlogs(),
];

export interface GroupedSearchResults {
  products: SearchResultItem[];
  categories: SearchResultItem[];
  blogs: SearchResultItem[];
  total: number;
}

export function searchSite(rawQuery: string): GroupedSearchResults {
  const query = normalizeText(rawQuery ?? "");

  if (!query) {
    return { products: [], categories: [], blogs: [], total: 0 };
  }

  const matches = SEARCH_INDEX.filter((item) => {
    const haystack = `${item.title} ${item.description}`.toLowerCase();
    return haystack.includes(query);
  });

  const products = matches.filter((item) => item.type === "product");
  const categoriesResult = matches.filter((item) => item.type === "category");
  const blogs = matches.filter((item) => item.type === "blog");

  return {
    products,
    categories: categoriesResult,
    blogs,
    total: matches.length,
  };
}
