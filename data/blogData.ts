export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-custom-packaging-builds-your-brand",
    title: "How Custom Packaging Builds Your Brand",
    excerpt:
      "Great packaging does more than protect your product, it tells your brand story before the box is even opened. Here's how to make every unboxing count.",
    date: "July 2, 2026",
    image: "/images/blog/branding-guide.jpg",
  },
  {
    id: 2,
    slug: "choosing-the-right-printing-material",
    title: "Choosing the Right Printing Material",
    excerpt:
      "From kraft paper to coated cardstock, the material you choose affects durability, cost, and print finish. We break down which option fits your product best.",
    date: "June 21, 2026",
    image: "/images/blog/printing-tips.jpg",
  },
  {
    id: 3,
    slug: "top-packaging-trends-for-small-businesses",
    title: "Top Packaging Trends for Small Businesses",
    excerpt:
      "Minimalist design, sustainable materials, and bold typography are shaping how small brands stand out on the shelf. See which trends are worth adopting this year.",
    date: "June 10, 2026",
    image: "/images/blog/packaging-guide.jpg",
  },
];