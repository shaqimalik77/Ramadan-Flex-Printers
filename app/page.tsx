import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import NewHome from "@/components/NewHome";

const meta = pageMeta({
  title: "Ramdan Flex Printers | Printing & Packaging in Lahore",
  description:
    "Custom boxes, stickers, business cards, hang tags, wedding cards and flex printing in Lahore. Delivery across Pakistan. Get a free quote on WhatsApp.",
  path: "/",
});

export const metadata: Metadata = {
  ...meta,
  // The homepage title already contains the brand, so skip the layout's suffix.
  title: { absolute: "Ramdan Flex Printers | Printing & Packaging in Lahore" },
};

export default function Home() {
  return <NewHome />;
}
