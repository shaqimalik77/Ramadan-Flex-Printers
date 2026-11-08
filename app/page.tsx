import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import BestSelling from "@/components/BestSelling";
import PromotionalProducts from "@/components/PromotionalProducts";
import OurClients from "@/components/Ourclients";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/Blogpreview";
import { pageMeta } from "@/lib/seo";

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
  return (
    <>
      <Hero />
      <WhatsAppCTA />
      <section className="mx-auto max-w-4xl px-4 pt-10 text-center sm:pt-12 lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
          Printing &amp; Packaging Company in Lahore
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Custom boxes, stickers, business cards, hang tags, wedding cards, neon signs and flex
          printing, made in Lahore and delivered across Pakistan.
        </p>
      </section>
      <BestSelling />
      <PromotionalProducts />
      <OurClients />
      <Testimonials />
      <BlogPreview />
    </>
  );
}
