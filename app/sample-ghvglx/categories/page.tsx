import type { Metadata } from "next";
import CategoriesIndexView from "@/components/catalog/CategoriesIndexView";

// Client preview of the new "All products" page. Kept out of Google.
export const metadata: Metadata = {
  title: "All products preview",
  robots: { index: false, follow: false },
};

export default function PreviewCategoriesPage() {
  return <CategoriesIndexView />;
}
