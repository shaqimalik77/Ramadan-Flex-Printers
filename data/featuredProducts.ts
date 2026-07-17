export type FeaturedProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "custom-stickers",
    slug: "custom-stickers",
    name: "Custom Stickers",
    description:
      "Premium quality custom stickers for branding, packaging, promotions, and product labeling.",
    image: "/images/categories/stickers.png",
  },
  {
    id: "business-cards",
    slug: "business-cards",
    name: "Business Cards",
    description:
      "High-quality business cards with premium finishes including matte, glossy, and spot UV.",
    image: "/images/categories/business-cards.png",
  },
  {
    id: "wedding-cards",
    slug: "wedding-cards",
    name: "Wedding Cards",
    description:
      "Luxury wedding invitation cards with elegant printing, foil stamping, and custom designs.",
    image: "/images/categories/wedding-cards.png",
  },
  {
    id: "hang-tags",
    slug: "hang-tags",
    name: "Label & Hang Tags",
    description:
      "Premium printed hang tags and clothing labels for fashion brands and retail products.",
    image: "/images/categories/label-and-hang-tags.png",
  },
  {
    id: "custom-boxes",
    slug: "custom-boxes",
    name: "Custom Boxes",
    description:
      "Custom printed packaging boxes for cosmetics, gifts, food, and ecommerce businesses.",
    image: "/images/categories/ecommerce-boxes.png",
  },
  {
    id: "paper-bags",
    slug: "paper-bags",
    name: "Paper Bags",
    description:
      "Eco-friendly custom printed paper bags for retail stores, restaurants, and boutiques.",
    image: "/images/categories/courier-bags.png",
  },
  {
    id: "mugs",
    slug: "mugs",
    name: "Printed Mugs",
    description:
      "Personalized ceramic mugs with vibrant, long-lasting custom printing for gifts and branding.",
    image: "/images/categories/mugs.png",
  },
  {
    id: "ribbons",
    slug: "ribbons",
    name: "Printed Ribbons",
    description:
      "Custom satin ribbons with premium printing for gifts, packaging, and special occasions.",
    image: "/images/categories/ribbons.png",
  },
];