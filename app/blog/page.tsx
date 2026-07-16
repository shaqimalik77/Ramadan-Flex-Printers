import type { Metadata } from "next";
import Link from "next/link";
import BlogGrid from "@/components/BlogGrid";

// Header and Footer come from the root layout — not repeated here.
export const metadata: Metadata = {
  title: "Printing & Packaging Blog | Ramdan Flex Printers",
  description:
    "Guides and tips on custom packaging, business cards, stickers, corporate gifts, wedding cards and more from Ramdan Flex Printers, Lahore.",
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-[#E41F26]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-900">Blog</li>
          </ol>
        </nav>

        {/* Page heading */}
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Printing &amp; Packaging Blog
        </h1>

        {/* SEO introduction */}
        <p className="mt-4 max-w-3xl text-sm text-gray-600 sm:text-base">
          Practical guides and industry insights on custom printing, packaging and branding —
          helping you make smarter decisions, from your first box of business cards to
          full-scale corporate branding and packaging.
        </p>

        {/* Blog grid */}
        <div className="mt-10">
          <BlogGrid />
        </div>
      </div>
    </main>
  );
}
