import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL, jsonLd } from "@/lib/seo";

export interface Crumb {
  label: string;
  /** Path; leave out for the current page (last crumb). */
  href?: string;
}

/** Breadcrumb trail, plus BreadcrumbList structured data for Google. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 text-neutral-400" />}
            {c.href ? (
              <Link href={c.href} className="hover:text-neutral-900">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-neutral-800">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
