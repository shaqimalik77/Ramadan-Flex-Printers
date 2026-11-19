import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ContactPageView from "@/components/contact/ContactPageView";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description:
    "Contact Ramdan Flex Printers in Royal Park, Lahore. Call or WhatsApp 0301 7413377, email us, or visit our shop for printing and packaging quotes.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageView />;
}
