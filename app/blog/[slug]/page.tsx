import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts as blogPostsFromList } from "@/data/Blogposts";
import { blogPosts as blogPostsFromData } from "@/data/blogData";
import { blogDetails, BlogDetail } from "@/data/blogDetails";
import BlogHero from "@/components/BlogHero";
import BlogContent from "@/components/BlogContent";
import RelatedBlogs from "@/components/RelatedBlogs";
import { pageMeta, jsonLd, absoluteUrl, SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

function getBlogDetailWithFallback(slug: string): BlogDetail | undefined {
  // 1. Try real detailed blog
  const realBlog = blogDetails.find((b) => b.slug === slug);
  if (realBlog) return realBlog;

  // 2. Try Blogposts.ts
  const postList = blogPostsFromList.find((p) => p.slug === slug);
  if (postList) {
    return generateFallbackBlogDetail(
      postList.slug,
      postList.title,
      postList.excerpt,
      postList.category,
      postList.publishDate,
      postList.readingTime,
      postList.image
    );
  }

  // 3. Try blogData.ts
  const postData = blogPostsFromData.find((p) => p.slug === slug);
  if (postData) {
    return generateFallbackBlogDetail(
      postData.slug,
      postData.title,
      postData.excerpt,
      "Printing",
      postData.date,
      "5 min read",
      postData.image
    );
  }

  return undefined;
}

function generateFallbackBlogDetail(
  slug: string,
  title: string,
  excerpt: string,
  category: string,
  publishDate: string,
  readingTime: string,
  image: string
): BlogDetail {
  return {
    slug,
    title,
    excerpt,
    category,
    author: "Mian Mateen",
    publishDate,
    readingTime,
    heroImage: image,
    content: [
      {
        type: "paragraph",
        text: excerpt,
      },
      {
        type: "paragraph",
        text: `In today's highly competitive market, the presentation and quality of your materials can make or break customer perception. Whether you are running a boutique shop, a corporate enterprise, or an online storefront, every detail counts. This article explores how adopting a strategic approach to ${title.toLowerCase()} can elevate your business operations and brand presence.`,
      },
      {
        type: "heading",
        text: `Why ${title} Matters`,
      },
      {
        type: "paragraph",
        text: `When it comes to ${category.toLowerCase()} services, consistency, durability, and vibrant print reproduction are the key elements. Customers subconsciously link the visual aesthetics of your branding materials, packaging, and stationery to the quality of your underlying product. Making a deliberate choice to print with high-grade inks, solid paper stocks, and exact color matching builds instant credibility.`,
      },
      {
        type: "heading",
        text: "Key Considerations for Your Next Project",
      },
      {
        type: "list",
        items: [
          "Choose materials that align with your brand values (e.g. eco-friendly cardstock, waterproof labels).",
          "Ensure your design files are exported in high resolution (300 DPI) to prevent blurry printing.",
          "Select custom colors and finishes like metallic gold foils or matte laminations to stand out.",
          "Keep layouts clean, functional, and aligned with your core brand guidelines.",
          "Work with a reliable local partner like Ramdan Flex Printers to handle bulk orders with fast turnaround.",
        ],
      },
      {
        type: "paragraph",
        text: `If you are looking to get started on a project related to ${title.toLowerCase()}, or want to request custom pricing and samples, reach out to our team at Ramdan Flex Printers. We coordinate design, production, and nationwide delivery to ensure you get professional-grade results every single time.`,
      },
    ],
  };
}

export async function generateStaticParams() {
  const slugs = new Set<string>();
  blogDetails.forEach((b) => slugs.add(b.slug));
  blogPostsFromList.forEach((b) => slugs.add(b.slug));
  blogPostsFromData.forEach((b) => slugs.add(b.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

// Unknown slugs return a real HTTP 404 instead of a streamed 200 (soft 404).
export const dynamicParams = false;

/**
 * Posts in data/Blogposts.ts and data/blogData.ts without an entry in
 * data/blogDetails.ts are rendered from one shared template, so their text is
 * almost identical. Keep them out of Google until real articles are written:
 * move a post into blogDetails.ts and it becomes indexable automatically.
 */
function hasRealContent(slug: string): boolean {
  return blogDetails.some((b) => b.slug === slug);
}

function toIsoDate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogDetailWithFallback(slug);

  if (!post) {
    return {};
  }

  const meta = pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.heroImage,
    type: "article",
  });

  return hasRealContent(post.slug)
    ? meta
    : { ...meta, robots: { index: false, follow: true } };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogDetailWithFallback(slug);

  if (!post) {
    notFound();
  }

  // Get other blog posts to show as related articles
  // Exclude the current one, and show up to 3 articles
  const allSlugs = new Set<string>();
  const allBlogDetails: BlogDetail[] = [];

  const addDetail = (detail: BlogDetail) => {
    if (!allSlugs.has(detail.slug)) {
      allSlugs.add(detail.slug);
      allBlogDetails.push(detail);
    }
  };

  // Get real detailed blogs first
  blogDetails.forEach(addDetail);

  // Then add fallback details for listed posts
  blogPostsFromList.forEach((p) => {
    addDetail(
      generateFallbackBlogDetail(
        p.slug,
        p.title,
        p.excerpt,
        p.category,
        p.publishDate,
        p.readingTime,
        p.image
      )
    );
  });

  // Filter out current post
  const relatedPosts = allBlogDetails
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.heroImage),
    datePublished: toIsoDate(post.publishDate),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${SITE_URL}/#business`, "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <main className="bg-white pb-16">
      {hasRealContent(post.slug) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }}
        />
      )}
      <BlogHero post={post} />
      <BlogContent blocks={post.content} />
      <RelatedBlogs posts={relatedPosts} />
    </main>
  );
}
