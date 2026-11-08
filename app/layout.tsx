import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsapp";
import Preloader from "@/components/Preloader";
import { siteConfig } from "@/lib/siteConfig";
import { SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl, jsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ramdan Flex Printers | Printing & Packaging in Lahore",
    template: "%s | Ramdan Flex Printers",
  },
  description:
    "Custom boxes, stickers, business cards, hang tags, wedding cards and flex printing in Lahore. Delivery across Pakistan. Get a free quote on WhatsApp.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_PK",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console ownership (HTML tag method). Keep it, or the
  // site loses its verified status.
  verification: { google: "F506eFWARFb1G4Vk6kvpVX0R6jNd6F8UcBrojldxbRA" },
  // Favicons come from the file conventions app/icon.svg and app/apple-icon.png.
};

// LocalBusiness structured data, shown on every page.
// TODO: add openingHoursSpecification once the owner confirms the hours
// (header/contact page say 11 AM–7 PM, footer says 9 AM–7 PM), and add the
// Facebook / Instagram / Google Business Profile URLs to sameAs.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: siteConfig.name,
  url: SITE_URL,
  logo: absoluteUrl("/images/logo/logo.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE.url),
  telephone: "+92-301-7413377",
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "A Block, Valencia Town",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  areaServed: { "@type": "Country", name: "Pakistan" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(businessJsonLd) }}
        />
        <Preloader />
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
