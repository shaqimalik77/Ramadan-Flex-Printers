import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { categoryProducts } from "@/data/categoryProducts";
import { productDetails } from "@/data/productDetails";
import { blogDetails } from "@/data/blogDetails";

/**
 * Built from the same data files the pages use, so categories and products
 * added through the admin panel show up here automatically on the next build.
 *
 * Only blog posts with real written content (data/blogDetails.ts) are listed.
 * The placeholder posts in data/Blogposts.ts share the same template text and
 * are marked noindex until real articles are written for them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/categories`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const categories: MetadataRoute.Sitemap = categoryProducts.map((c) => ({
    url: `${SITE_URL}/categories/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = productDetails.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = blogDetails.map((b) => {
    const published = new Date(b.publishDate);
    return {
      url: `${SITE_URL}/blog/${b.slug}`,
      ...(isNaN(published.getTime()) ? {} : { lastModified: published }),
      changeFrequency: "yearly",
      priority: 0.5,
    };
  });

  return [...staticPages, ...categories, ...products, ...posts];
}
