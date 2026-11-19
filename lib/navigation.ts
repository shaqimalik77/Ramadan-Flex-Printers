/**
 * Site navigation for the redesign: used by the new header menu and to find
 * related categories (categories in the same group) on category pages.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href?: string; items?: NavLink[] };

const cat = (label: string, slug: string): NavLink => ({ label, href: `/categories/${slug}` });

export const NAV: NavGroup[] = [
  {
    label: "Packaging",
    items: [
      cat("Ecommerce Boxes", "ecommerce-boxes"),
      cat("Hard Drawer Boxes", "hard-drawer-boxes"),
      cat("Cosmetic Boxes", "cosmetic-boxes"),
      cat("Stand Up Pouches", "stand-up-pouches"),
      cat("Ziplock Frosted Bags", "ziplock-frosted-bags"),
      cat("Gift Bags", "gift-bags"),
      cat("Shopping Bags", "shopping-bags"),
      cat("Courier Flyer Bags", "courier-flyer-poly-bags"),
      cat("Butter Paper", "butter-paper"),
      cat("Ribbons", "ribbons"),
    ],
  },
  {
    label: "Cards & Tags",
    items: [
      cat("Business Cards", "business-cards"),
      cat("Wedding Cards", "wedding-cards"),
      cat("Thank You Cards", "thank-you-cards"),
      cat("Jewellery Cards", "jewellery-cards"),
      cat("Label & Hang Tags", "label-hang-tags"),
      cat("Fabric Tags", "fabric-tags"),
    ],
  },
  { label: "Stickers", href: "/categories/stickers" },
  {
    label: "Apparel & Gifts",
    items: [
      cat("Custom T-Shirts", "custom-t-shirts"),
      cat("Mugs", "mugs"),
      cat("Promotional Products", "promotional-products"),
      cat("Polaroids", "polaroids"),
    ],
  },
  {
    label: "Signs & Flex",
    items: [
      cat("Neon Signs", "neon-signs"),
      cat("3D Boards", "3d-boards"),
      cat("Flex Printing", "flex-designs"),
    ],
  },
  { label: "All Products", href: "/categories" },
  { label: "Blog", href: "/blog" },
];

const slugOf = (href: string) => href.replace("/categories/", "");

/**
 * Up to `limit` category slugs related to `slug`: first the others in the
 * same menu group, then popular ones as filler.
 */
export function relatedCategorySlugs(slug: string, limit = 4): string[] {
  const group = NAV.find((g) => g.items?.some((i) => slugOf(i.href) === slug));
  const sameGroup = (group?.items ?? []).map((i) => slugOf(i.href)).filter((s) => s !== slug);
  const popular = ["ecommerce-boxes", "stickers", "business-cards", "custom-t-shirts", "neon-signs", "wedding-cards"];
  return [...new Set([...sameGroup, ...popular])].filter((s) => s !== slug).slice(0, limit);
}
