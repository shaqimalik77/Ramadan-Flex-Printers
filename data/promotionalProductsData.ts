export type PromotionalProduct = {
  id: string;
  name: string;
  /** Short one-line description shown on the card */
  description: string;
  /** Path under /public/images/promotional/ */
  image: string;
};

/**
 * Homepage "Promotional Products" grid.
 * Add a new product later: just append an object here — no component
 * changes needed. Photos aren't in the project yet, so each `image`
 * path below doesn't exist under /public yet — cards fall back to your
 * logo (see PromotionalProducts.tsx) until the real photo is added.
 */
export const promotionalProducts: PromotionalProduct[] = [
  {
    id: "promotional-mugs",
    name: "Promotional Mugs",
    description: "Custom printed mugs for corporate gifting and giveaways.",
    image: "/images/promotional/promotional-mugs.png",
  },
  {
    id: "corporate-diaries",
    name: "Corporate Diaries",
    description: "Branded diaries and notebooks with a professional finish.",
    image: "/images/promotional/corporate-diaries.png",
  },
  {
    id: "custom-pens",
    name: "Custom Pens",
    description: "Logo-printed pens for everyday brand visibility.",
    image: "/images/promotional/custom-pens.png",
  },
  {
    id: "keychains",
    name: "Keychains",
    description: "Durable custom keychains that keep your brand close.",
    image: "/images/promotional/keychains.png",
  },
  {
    id: "tote-bags",
    name: "Tote Bags",
    description: "Reusable branded tote bags for events and retail.",
    image: "/images/promotional/tote-bags.png",
  },
  {
    id: "mouse-pads",
    name: "Mouse Pads",
    description: "Custom printed mouse pads for desks and giveaways.",
    image: "/images/promotional/mouse-pads.png",
  },
  {
    id: "lanyards",
    name: "Lanyards",
    description: "Branded lanyards for staff, events and conferences.",
    image: "/images/promotional/lanyards.png",
  },
  {
    id: "water-bottles",
    name: "Water Bottles",
    description: "Custom printed bottles for corporate and event giveaways.",
    image: "/images/promotional/water-bottles.png",
  },
];