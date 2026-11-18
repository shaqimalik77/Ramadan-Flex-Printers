import type { Metadata } from "next";
import NewHome from "@/components/NewHome";

// Preview page for the client: the proposed new homepage design.
// Kept out of Google (noindex) and out of the sitemap.
export const metadata: Metadata = {
  title: "New homepage preview",
  robots: { index: false, follow: false },
};

export default function SampleHomePage() {
  return <NewHome />;
}
