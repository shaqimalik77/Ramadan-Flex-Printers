import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutTeam from "@/components/AboutTeam";
import OurProcess from "@/components/OurProcess";
import AboutStats from "@/components/AboutStats";
import AboutCTA from "@/components/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Ramdan Flex Printers",
  description:
    "Learn about Ramdan Flex Printers, a trusted printing and packaging partner serving businesses across Pakistan with premium quality, fast turnaround, and nationwide delivery.",
};

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
