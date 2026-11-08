import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
// Imported (not placed in /public) so the build copies it to
// /_next/static/media/. On Hostinger, files newly added to /public return
// 404 on the live site, while /_next/static files are always served.
import ogImage from "@/assets/og-image.jpg";

/** The one canonical origin for the site (www, https). */
export const SITE_URL = "https://www.ramdanflexprinters.com";

export const DEFAULT_OG_IMAGE = {
  url: ogImage.src,
  width: 1200,
  height: 630,
  alt: "Ramdan Flex Printers: printing and packaging in Lahore",
};

interface PageMetaInput {
  /** Page title without the brand suffix; the root layout template adds it. */
  title: string;
  description: string;
  /** Path of the page, e.g. "/categories/stickers". Used for the canonical URL. */
  path: string;
  /** Optional page-specific share image (path under /public or absolute URL). */
  image?: string;
  type?: "website" | "article";
}

/**
 * Full metadata for one page: title, description, canonical URL,
 * Open Graph and Twitter card.
 *
 * Next.js merges metadata shallowly, so a page that sets `openGraph`
 * replaces the layout's whole `openGraph` object. Building every page's
 * metadata through this helper keeps siteName, locale and the fallback
 * image on every page.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const images = image ? [{ url: image, alt: title }] : [DEFAULT_OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: siteConfig.name,
      locale: "en_PK",
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Serialise JSON-LD safely for a <script> tag (escapes "<", per Next.js docs). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Turn a site path like "/images/x.png" into an absolute URL. */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
