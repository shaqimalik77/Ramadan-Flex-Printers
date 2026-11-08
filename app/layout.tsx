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

// LocalBusiness structured data, shown on every page. Address, phone and
// hours must match the Google Business Profile.
// TODO: add the Facebook / Instagram / Google Business Profile URLs to sameAs.
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
    streetAddress: "Lakshmi Chowk, Royal Park",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    postalCode: "54000",
    addressCountry: "PK",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "23:00",
    },
  ],
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
