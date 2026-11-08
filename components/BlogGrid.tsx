import { blogPosts, type BlogPost } from "@/data/Blogposts";
import { blogDetails } from "@/data/blogDetails";
import BlogCard from "./BlogCard";

// Full articles (data/blogDetails.ts) first, then the listing-only posts.
const fullArticles: BlogPost[] = blogDetails.map((b) => ({
  id: b.slug,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  category: b.category,
  publishDate: b.publishDate,
  readingTime: b.readingTime,
  image: b.heroImage,
}));

const fullSlugs = new Set(fullArticles.map((p) => p.slug));
const allPosts = [...fullArticles, ...blogPosts.filter((p) => !fullSlugs.has(p.slug))];

export default function BlogGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {allPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
