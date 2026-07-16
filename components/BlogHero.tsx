import Link from "next/link";
import SmartImage from "./Smartimage";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { BlogDetail } from "@/data/blogDetails";

type BlogHeroProps = {
  post: BlogDetail;
};

export default function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-red-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-red-600 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-800 font-medium truncate max-w-[220px] sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Title + meta */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-8">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full mb-4">
          {post.category}
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-5">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-gray-400" aria-hidden="true" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
            {post.publishDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
            {post.readingTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-gray-400" aria-hidden="true" />
            {post.category}
          </span>
        </div>
      </div>

      {/* Hero image */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-md">
          <SmartImage
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
