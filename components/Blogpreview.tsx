import SmartImage from "./Smartimage";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/data/blogData";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 flex flex-col">
      <div className="relative w-full h-56 overflow-hidden">
        <SmartImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-gray-400 tracking-wide mb-2">{post.date}</p>

        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-block w-fit text-sm font-semibold tracking-wide text-gray-900 border-b-2 border-gray-900 pb-1 transition-colors duration-300 hover:text-red-600 hover:border-red-600"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default function BlogPreview() {
  return (
    <section className="w-full py-10 sm:py-12 md:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden sm:block h-px w-24 bg-neutral-200" />
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-neutral-800 border border-neutral-200 px-5 py-2.5 rounded-xl uppercase">
            LATEST BLOGS
          </h2>
          <span className="hidden sm:block h-px w-24 bg-neutral-200" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}