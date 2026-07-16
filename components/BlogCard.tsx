"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/Blogposts";
import SmartImage from "./Smartimage";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
        <SmartImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#E41F26] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{post.publishDate}</span>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-[#E41F26] sm:text-lg">
          {post.title}
        </h3>

        <p className="line-clamp-3 text-sm text-gray-500">{post.excerpt}</p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[#E41F26]">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
