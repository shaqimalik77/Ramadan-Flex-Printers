import type { Metadata } from "next";
import ProductsCatalog from "@/components/ProductsCatalog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "All Printing & Packaging Products",
  description:
    "Browse custom boxes, stickers, tags, cards, mugs, shirts and promotional products from Ramdan Flex Printers. Printed in Lahore, delivered across Pakistan.",
  path: "/products",
});

export default function ProductsPage() {
  return <ProductsCatalog />;
}
