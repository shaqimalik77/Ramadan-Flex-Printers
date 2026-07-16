import Hero from "@/components/Hero";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import BestSelling from "@/components/BestSelling";
import PromotionalProducts from "@/components/PromotionalProducts";
import OurClients from "@/components/Ourclients";
import Testimonials from "@/components/testimonials";
import BlogPreview from "@/components/Blogpreview";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatsAppCTA />
      <BestSelling />
      <PromotionalProducts />
      <OurClients />
      <Testimonials />
      <BlogPreview />
    </>
  );
}