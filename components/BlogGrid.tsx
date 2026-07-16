import { blogPosts } from "@/data/Blogposts";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
