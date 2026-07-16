import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts as blogPostsFromList } from "@/data/Blogposts";
import { blogPosts as blogPostsFromData } from "@/data/blogData";
import { blogDetails, BlogDetail } from "@/data/blogDetails";
import BlogHero from "@/components/BlogHero";
import BlogContent from "@/components/BlogContent";
import RelatedBlogs from "@/components/RelatedBlogs";

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

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogDetailWithFallback(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog | Ramdan Flex Printers`,
    description: post.excerpt,
  };
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

  return (
    <main className="bg-white pb-16">
      <BlogHero post={post} />
      <BlogContent blocks={post.content} />
      <RelatedBlogs posts={relatedPosts} />
    </main>
  );
}
