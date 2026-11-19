import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import AboutPageView from "@/components/about/AboutPageView";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "Ramdan Flex Printers is a printing and packaging company in Royal Park, Lahore, serving businesses across Pakistan with quality work and fast turnaround.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageView />;
}
