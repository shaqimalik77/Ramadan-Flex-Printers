/**
 * Hand-written SEO copy for category pages, keyed by category slug.
 *
 * Kept separate from categoryProducts.json on purpose: the admin panel
 * rewrites that JSON file whenever a product is saved, so anything stored
 * here is safe from being overwritten.
 *
 * A category that has no entry here (e.g. one created later from the admin
 * panel) falls back to an auto-generated title and description, see
 * getCategorySeo() below.
 */

export interface CategorySeo {
  /** Page <title>, without the " | Ramdan Flex Printers" suffix. */
  title: string;
  /** Meta description, roughly 140–155 characters. */
  description: string;
}

const categorySeo: Record<string, CategorySeo> = {
  ribbons: {
    title: "Custom Printed Ribbons in Lahore",
    description:
      "Custom printed satin ribbons in Lahore with your logo or brand name, in any colour or foil finish. Bulk rolls, delivery across Pakistan. Get a quote.",
  },
  stickers: {
    title: "Custom Sticker Printing in Lahore",
    description:
      "Custom sticker printing in Lahore: vinyl, die-cut, holographic and waterproof label stickers. Fast delivery across Pakistan. Get a quote on WhatsApp.",
  },
  "butter-paper": {
    title: "Custom Printed Butter Paper in Lahore",
    description:
      "Grease-resistant custom printed butter paper in Lahore for burgers, bakeries and restaurants. Your logo, sheets or rolls, delivery across Pakistan.",
  },
  "jewellery-cards": {
    title: "Custom Jewellery Cards Printing in Lahore",
    description:
      "Custom jewellery display cards printed in Lahore for earrings, necklaces and rings. Your logo, premium card stock, delivery across Pakistan. Get a quote.",
  },
  polaroids: {
    title: "Polaroid Photo Printing in Lahore",
    description:
      "Polaroid-style photo prints in Lahore for gifts, events and brand inserts. Sharp colours, premium paper and delivery across Pakistan. Order on WhatsApp.",
  },
  "business-cards": {
    title: "Business Card Printing in Lahore",
    description:
      "Premium business card printing in Lahore: matte, gold foil, spot UV, embossed and transparent cards. Quick turnaround, delivery across Pakistan.",
  },
  "label-hang-tags": {
    title: "Custom Hang Tags & Labels Printing in Lahore",
    description:
      "Custom printed hang tags and labels in Lahore for clothing brands and boutiques. Any shape, size and finish. Delivery across Pakistan. Get a free quote.",
  },
  "thank-you-cards": {
    title: "Custom Thank You Cards Printing in Lahore",
    description:
      "Custom thank you cards printed in Lahore for online stores and small brands. Add your logo and message to every order. Delivery across Pakistan.",
  },
  "fabric-tags": {
    title: "Custom Fabric Tags & Woven Labels in Lahore",
    description:
      "Custom fabric tags and clothing labels made in Lahore for garment brands. Printed or woven, your logo in any size. Delivery across Pakistan. Get a quote.",
  },
  "ecommerce-boxes": {
    title: "Custom Ecommerce & Mailer Boxes in Lahore",
    description:
      "Custom printed mailer and ecommerce boxes in Lahore for online brands. Corrugated, kraft or rigid, with your logo. Delivery across Pakistan. Get a quote.",
  },
  "stand-up-pouches": {
    title: "Custom Printed Stand Up Pouches in Lahore",
    description:
      "Custom printed stand up pouches in Lahore for food, tea, spices and cosmetics. Zipper and window options, delivery across Pakistan. Get a quote today.",
  },
  "hard-drawer-boxes": {
    title: "Custom Hard Drawer Boxes in Lahore",
    description:
      "Premium rigid drawer boxes made in Lahore for gifts, jewellery and luxury products. Custom size, print and finish. Delivery across Pakistan. Get a quote.",
  },
  "cosmetic-boxes": {
    title: "Custom Cosmetic Boxes in Lahore",
    description:
      "Custom printed cosmetic boxes in Lahore for skincare, makeup and perfume brands. Any size, foil or matte finish. Delivery across Pakistan. Get a quote.",
  },
  "gift-bags": {
    title: "Custom Printed Gift Bags in Lahore",
    description:
      "Custom printed gift bags in Lahore for weddings, events, boutiques and corporate gifts. Paper or frosted, ribbon handles. Delivery across Pakistan.",
  },
  "shopping-bags": {
    title: "Custom Printed Shopping Bags in Lahore",
    description:
      "Custom printed shopping bags in Lahore for clothing stores and boutiques. Paper, kraft or frosted, with your logo. Delivery across Pakistan. Get a quote.",
  },
  "ziplock-frosted-bags": {
    title: "Custom Ziplock Frosted Bags in Lahore",
    description:
      "Custom printed frosted ziplock bags in Lahore for clothing, accessories and cosmetics. Your logo, multiple sizes, delivery across Pakistan. Order now.",
  },
  "courier-flyer-poly-bags": {
    title: "Custom Courier Flyer & Poly Bags in Lahore",
    description:
      "Custom printed courier flyers and poly mailer bags in Lahore for online sellers. Tamper-proof seal, your branding, delivery across Pakistan. Get a quote.",
  },
  "wedding-cards": {
    title: "Wedding Card Printing in Lahore",
    description:
      "Elegant custom wedding cards printed in Lahore: foil stamped, laser cut, acrylic and boxed invitation sets. Delivery across Pakistan. Get a quote today.",
  },
  mugs: {
    title: "Custom Printed Mugs in Lahore",
    description:
      "Custom printed mugs in Lahore with your logo, photo or message. Ideal for corporate gifts, events and giveaways. Delivery across Pakistan. Order now.",
  },
  "promotional-products": {
    title: "Promotional Products & Corporate Gifts in Lahore",
    description:
      "Branded promotional products in Lahore: pens, keychains, notebooks, tote bags and desk calendars with your logo. Delivery across Pakistan. Get a quote.",
  },
  "custom-t-shirts": {
    title: "Custom T-Shirt Printing in Lahore",
    description:
      "Custom T-shirt printing in Lahore for brands, events and teams: printed, DTF and embroidered polo shirts. Bulk orders, delivery across Pakistan.",
  },
  "neon-signs": {
    title: "Custom LED Neon Signs in Lahore",
    description:
      "Custom LED neon signs made in Lahore for shops, cafes, events and home decor. Any text, logo or colour. Delivery across Pakistan. Get a quote on WhatsApp.",
  },
  "3d-boards": {
    title: "3D Signboards & Acrylic Signs in Lahore",
    description:
      "Backlit 3D signboards, acrylic and metal letter signs made in Lahore for shops, offices and boutiques. Custom designs to match your brand. Get a quote.",
  },
  "flex-designs": {
    title: "Flex Printing & Banners in Lahore",
    description:
      "Flex printing in Lahore for outdoor banners, shop front boards, event banners and backlit signage. Vivid prints, fast turnaround. Get a quote today.",
  },
};

/** SEO title and description for a category, with a safe fallback. */
export function getCategorySeo(slug: string, name: string): CategorySeo {
  return (
    categorySeo[slug] ?? {
      title: `Custom ${name} Printing in Lahore`,
      description: `Custom ${name.toLowerCase()} printed in Lahore by Ramdan Flex Printers. Premium quality and delivery across Pakistan. Get a quote on WhatsApp.`,
    }
  );
}
