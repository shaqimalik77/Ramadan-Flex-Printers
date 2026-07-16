export type CategoryItem = {
  id: string;
  name: string;
  /** Path under /public */
  image: string;
  /** Where the card links to */
  href: string;
};

/**
 * Section 1 — "Best Selling Products".
 * NOTE on images:
 * - shirts, neon-signs: your real uploaded photos.
 * - 3d-boards: still pointing at a file that doesn't exist yet on purpose —
 *   the only photo you've sent for this ("3d-boards.png") is a real photo
 *   of an actual Mobil 1 Center sign (a third-party trademark), not
 *   confirmed as Ramdan's own work, so I didn't copy it in. Card falls
 *   back to your logo until you confirm it's your own job or send a
 *   different photo.
 * - flex-designs: using your promo banner as requested — heads up it's a
 *   dense multi-panel poster with small text, so it'll look busy at
 *   thumbnail size. A single cropped photo would look cleaner if you have one.
 * - promotional-products: no photo provided yet, falls back to your logo.
 */
export const bestSellingProducts: CategoryItem[] = [
  { id: "shirts", name: "Shirts", image: "/images/categories/custom-tshirts.png", href: "/products?category=shirts" },
  { id: "neon-signs", name: "Neon Signs", image: "/images/categories/neon-signs.png", href: "/products?category=neon-signs" },
  { id: "3d-boards", name: "3D Boards", image: "/images/categories/3d-boards.png", href: "/products?category=3d-boards" },
  { id: "flex-designs", name: "Flex Designs", image: "/images/categories/flex-designs.png", href: "/products?category=flex-designs" },
  { id: "promotional-products", name: "Promotional Products", image: "/images/categories/promotional-products.png", href: "/products?category=promotional-products" },
];

/**
 * Section 2 — "Packaging Products".
 * None of these have real photos yet — each falls back to your logo
 * until a photo is added at the given path in /public.
 */
export const packagingProducts: CategoryItem[] = [
  { id: "stickers", name: "Stickers", image: "/images/categories/stickers.png", href: "/products?category=stickers" },
  { id: "ribbons", name: "Ribbons", image: "/images/categories/ribbons.png", href: "/products?category=ribbons" },
  { id: "butter-paper", name: "Butter Paper", image: "/images/categories/butter-paper.png", href: "/products?category=butter-paper" },
  { id: "jewellery-cards", name: "Jewellery Cards", image: "/images/categories/jewellery-cards.png", href: "/products?category=jewellery-cards" },
  { id: "polaroids", name: "Polaroids", image: "/images/categories/polaroids.png", href: "/products?category=polaroids" },
  { id: "business-cards", name: "Business Cards", image: "/images/categories/business-cards.png", href: "/products?category=business-cards" },
  { id: "label-and-hang-tags", name: "Label & Hang Tags", image: "/images/categories/label-and-hang-tags.png", href: "/products?category=label-and-hang-tags" },
  { id: "thankyou-cards", name: "Thank You Cards", image: "/images/categories/thankyou-cards.png", href: "/products?category=thankyou-cards" },
  { id: "fabric-tags", name: "Fabric Tags", image: "/images/categories/fabric-tags.png", href: "/products?category=fabric-tags" },
  { id: "ecommerce-boxes", name: "Ecommerce Boxes", image: "/images/categories/ecommerce-boxes.png", href: "/products?category=ecommerce-boxes" },
  { id: "standup-pouches", name: "Standup Pouches", image: "/images/categories/standup-pouches.png", href: "/products?category=standup-pouches" },
  { id: "hard-drawer-boxes", name: "Hard Drawer Boxes", image: "/images/categories/hard-drawer-boxes.png", href: "/products?category=hard-drawer-boxes" },
  { id: "ziplock-frosted-bags", name: "Ziplock Frosted Bags", image: "/images/categories/ziplock-frosted-bags.png", href: "/products?category=ziplock-frosted-bags" },
  { id: "courier-flyer-poly-bags", name: "Courier Flyer Poly Bags", image: "/images/categories/courier-flyer-poly-bags.png", href: "/products?category=courier-flyer-poly-bags" },
  { id: "wedding-cards", name: "Wedding Cards", image: "/images/categories/wedding-cards.png", href: "/products?category=wedding-cards" },
  { id: "mugs", name: "Mugs", image: "/images/categories/mugs.png", href: "/products?category=mugs" },
];