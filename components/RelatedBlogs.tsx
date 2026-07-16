import Link from "next/link";
import SmartImage from "./Smartimage";
import { Calendar } from "lucide-react";
import { BlogDetail } from "@/data/blogDetails";

type RelatedBlogsProps = {
  posts: BlogDetail[];
};

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          Related Articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1"
            >
              <div className="relative w-full h-44 overflow-hidden">
                <SmartImage
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-3 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.publishDate}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
