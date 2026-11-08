import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutTeam from "@/components/AboutTeam";
import OurProcess from "@/components/OurProcess";
import AboutStats from "@/components/AboutStats";
import AboutCTA from "@/components/AboutCTA";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "Ramdan Flex Printers is a printing and packaging company in Valencia Town, Lahore, serving businesses across Pakistan with quality work and fast turnaround.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      <AboutHero />
      <AboutStory />
      <WhyChooseUs />
      <AboutTeam />
      <OurProcess />
      <AboutStats />
      <AboutCTA />
    </main>
  );
}
