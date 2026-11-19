import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import BlogIndexView from "@/components/blog/BlogIndexView";

// Header and Footer come from the root layout — not repeated here.
export const metadata: Metadata = pageMeta({
  title: "Printing & Packaging Blog",
  description:
    "Guides and tips on custom packaging, business cards, stickers, corporate gifts, wedding cards and more from Ramdan Flex Printers, Lahore.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogIndexView />;
}
