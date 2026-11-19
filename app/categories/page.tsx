import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import CategoriesIndexView from "@/components/catalog/CategoriesIndexView";

export const metadata: Metadata = pageMeta({
  title: "Printing & Packaging Categories",
  description:
    "Browse all printing and packaging categories at Ramdan Flex Printers, Lahore: boxes, pouches, stickers, tags, cards, mugs, signs and more. Get a quote.",
  path: "/categories",
});

export default function CategoriesPage() {
  return <CategoriesIndexView />;
}
