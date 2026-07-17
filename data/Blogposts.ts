export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readingTime: string;
  /** Path under /public/images/blog/ */
  image: string;
};

/**
 * Blog listing data. Add a new post later: just append an object here —
 * no component changes needed. Individual /blog/[slug] pages aren't
 * built yet (out of scope for this request), so links currently point
 * to routes that don't exist. Photos aren't in the project yet either —
 * cards fall back to your logo (see BlogCard.tsx) until real images are
 * added at the paths below.
 */
export const blogPosts: BlogPost[] = [
  {
    id: "custom-packaging-brand-identity",
    slug: "custom-packaging-brand-identity",
    title: "How Custom Packaging Improves Brand Identity",
    excerpt:
      "Packaging is often a customer's first physical touchpoint with your brand. Here's how custom boxes, pouches and labels build recognition and trust before the product is even opened.",
    category: "Packaging",
    publishDate: "Jul 1, 2026",
    readingTime: "5 min read",
    image: "/images/categories/ecommerce-boxes.png",
  },
  {
    id: "business-cards-lasting-impression",
    slug: "business-cards-lasting-impression",
    title: "Business Cards That Leave a Lasting Impression",
    excerpt:
      "A well-designed business card still matters in a digital world. We break down paper stock, finishes and layout choices that make yours memorable instead of forgettable.",
    category: "Business Cards",
    publishDate: "Jun 24, 2026",
    readingTime: "4 min read",
    image: "/images/categories/business-cards.png",
  },
  {
    id: "choosing-right-sticker-material",
    slug: "choosing-right-sticker-material",
    title: "Choosing the Right Sticker Material",
    excerpt:
      "Vinyl, paper, holographic or waterproof — the material you choose affects durability, look and cost. A quick guide to picking the right sticker stock for your use case.",
    category: "Stickers",
    publishDate: "Jun 17, 2026",
    readingTime: "4 min read",
    image: "/images/categories/stickers.png",
  },
  {
    id: "corporate-gifts-customer-loyalty",
    slug: "corporate-gifts-customer-loyalty",
    title: "Why Corporate Gifts Increase Customer Loyalty",
    excerpt:
      "Thoughtful branded gifts do more than say thank you — they keep your business top of mind. Here's why corporate gifting is a low-cost, high-return loyalty tool.",
    category: "Corporate Gifts",
    publishDate: "Jun 10, 2026",
    readingTime: "5 min read",
    image: "/images/categories/promotional-products.png",
  },
  {
    id: "printed-ribbons-luxury-packaging",
    slug: "printed-ribbons-luxury-packaging",
    title: "How Printed Ribbons Enhance Luxury Packaging",
    excerpt:
      "Small details finish the experience. See how custom-printed ribbons add a premium, gift-ready feel to boxes, hampers and retail packaging.",
    category: "Packaging",
    publishDate: "Jun 3, 2026",
    readingTime: "3 min read",
    image: "/images/categories/ribbons.png",
  },
  {
    id: "wedding-card-printing-guide",
    slug: "wedding-card-printing-guide",
    title: "The Complete Guide to Wedding Card Printing",
    excerpt:
      "From paper weight to foil finishes, wedding card printing has a lot of moving parts. This guide walks through the choices that shape the final look and feel.",
    category: "Wedding Cards",
    publishDate: "May 27, 2026",
    readingTime: "6 min read",
    image: "/images/categories/wedding-cards.png",
  },
  {
    id: "benefits-custom-courier-bags",
    slug: "benefits-custom-courier-bags",
    title: "Benefits of Custom Courier Bags",
    excerpt:
      "Branded courier and poly mailer bags protect your product and market your business at the same time. Here's why more e-commerce sellers are switching to custom bags.",
    category: "Packaging",
    publishDate: "May 20, 2026",
    readingTime: "4 min read",
    image: "/images/categories/courier-bags.png",
  },
  {
    id: "top-promotional-products-businesses",
    slug: "top-promotional-products-businesses",
    title: "Top Promotional Products for Businesses",
    excerpt:
      "Mugs, pens, tote bags and more — some promotional items simply get more use (and visibility) than others. A rundown of the products worth budgeting for.",
    category: "Promotional Products",
    publishDate: "May 13, 2026",
    readingTime: "5 min read",
    image: "/images/categories/promotional-products.png",
  },
];