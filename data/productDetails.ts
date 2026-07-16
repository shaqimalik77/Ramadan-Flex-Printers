/**
 * Product Detail data source for the dynamic Product Detail Page
 * (app/products/[slug]/page.tsx).
 *
 * This is a separate, standalone data source from data/categoryProducts.ts
 * (which powers the Category Detail Page) so that neither file needs to
 * change when the other is extended.
 *
 * NOTE ON SCOPE: To keep every entry genuinely detailed (1000-1500 words of
 * unique long-form copy, a full spec table, and real FAQs) rather than thin
 * placeholder content, this file ships with a complete, production-quality
 * example for two products in each of four categories (Ribbons, Business
 * Cards, Mugs, and Stickers) — eight products total, including two per
 * category so Related Products has something real to show. Adding the
 * remaining products across the other categories is just a matter of
 * following the exact same `ProductDetail` shape below.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductDetail {
  slug: string;
  /** Category slug — matches the corresponding category in data/categoryProducts.ts */
  category: string;
  /** Human-readable category name, used in the breadcrumb */
  categoryName: string;
  title: string;
  /** Local image paths, e.g. /images/products/ribbons/premium-satin-ribbon.png */
  images: string[];
  shortDescription: string;
  /** Long-form SEO copy, split into paragraphs for clean rendering */
  longDescription: string[];
  features: string[];
  specifications: Record<string, string>;
  faq: FaqItem[];
}

export const productDetails: ProductDetail[] = [
  // ---------------------------------------------------------------------
  // RIBBONS
  // ---------------------------------------------------------------------
  {
    slug: "premium-satin-ribbon",
    category: "ribbons",
    categoryName: "Ribbons",
    title: "Premium Satin Ribbon",
    images: [
      "/Images/products/ribbons/premium-satin-ribbon.png",
      "/Images/products/ribbons/premium-satin-ribbon-2.png",
      "/Images/products/ribbons/premium-satin-ribbon-3.png",
      "/Images/products/ribbons/premium-satin-ribbon-detail.png",
    ],
    shortDescription:
      "Smooth, high-sheen satin ribbon custom printed with your logo or brand name, finished for a clean, premium tie on any package.",
    longDescription: [
      "Premium Satin Ribbon is built for one job: making a package feel finished. It is the detail a customer notices in the second before they open a box, and for a growing number of boutiques, bakeries, and gifting brands across Pakistan, it has become as much a part of the product as the packaging itself. This is satin ribbon printed specifically with your brand name, logo, or a short message, produced on a base material chosen for how well it holds colour and how good it looks tied around a finished parcel.",
      "The satin base matters more than most people expect. Unlike grosgrain or paper ribbon, satin has a natural sheen and a soft drape that ties into a clean bow or knot without stiffness or fraying at the cut edge. It photographs well under normal indoor lighting, which is exactly the moment most customers are looking at their package — right after opening it, phone already in hand. A dull or scratchy ribbon undercuts an otherwise well-packaged order; satin does the opposite.",
      "Printing is done using heat transfer, a method chosen specifically because it lets ink bond into the fabric rather than sit on top of it. That distinction is what keeps text and logos from rubbing off or smudging during transit, handling, or storage. Whether the design is a simple wordmark in a single colour or a more detailed logo with fine lines, the same printing process is used, so smaller design details are not lost the way they can be with cheaper stamping methods.",
      "This ribbon is ordered by a wide range of businesses for a wide range of reasons. Clothing boutiques tie it around garment bags before shipping. Bakeries and dessert studios use it to finish cake and pastry boxes so a dessert feels like a gift rather than a takeaway item. Wedding planners use it on favour boxes where guests notice every visual detail. Corporate teams use it on client hampers sent out during holidays or after signing new business. In every case, the ribbon is doing double duty — holding the packaging together and putting a brand name in front of a customer at the exact moment they are most engaged with the product.",
      "Two roll sizes are available to match how often a business needs to restock. The 20-yard roll suits businesses testing branded packaging for the first time, or smaller operations that do not yet need a large standing supply. The 100-yard roll is built for brands that have already made ribbon part of their regular packaging process and need enough on hand to avoid reordering every few weeks. Both are produced to the same print and colour standard, so quality does not change based on order size.",
      "Colour options cover the common brand palette — white, black, red, pink, gold, silver, and navy — alongside custom colour matching for brands with a specific shade already built into their visual identity. Width can also be adjusted between 1 inch, 1.5 inch, and 2 inch depending on the size of packaging the ribbon is meant to wrap, since a ribbon that is too narrow for a box can look like an afterthought rather than a finishing touch.",
      "Ordering starts with a digital proof. Once a brand name, logo, or message is supplied, along with the preferred colour and width, a proof is shared for approval before printing begins, so there is no risk of a wasted batch over a wording or colour mismatch. Once approved, production and dispatch is typically completed within 7 to 8 working days, which is fast enough to fit most launch dates, restocks, and wedding season deadlines without forcing a business to plan months in advance.",
      "For a business trying to build recognition without a large marketing budget, Premium Satin Ribbon remains one of the most efficient places to start. It touches every single order that goes out the door, costs a fraction of most other branding materials, and is one of the few pieces of packaging a customer physically holds in their hands before anything else. Getting it right — sharp print, durable colour, and a size that matches the box it wraps — turns a simple finishing touch into a small, consistent piece of business branding that customers actually remember.",
    ],
    features: [
      "Custom printed with your logo, brand name, or short message",
      "Available in 20-yard and 100-yard rolls",
      "Multiple ribbon widths: 1 inch, 1.5 inch, and 2 inch",
      "Heat transfer printing resists fading and rubbing off in transit",
      "Wide colour range plus custom brand colour matching",
      "Ideal for gift boxes, garment bags, hampers, and dessert packaging",
    ],
    specifications: {
      Material: "100% Satin Polyester",
      "Width Options": "1 inch / 1.5 inch / 2 inch",
      "Roll Length": "20 yards or 100 yards",
      "Print Method": "Heat Transfer Printing",
      "Colours Available": "White, Black, Red, Pink, Gold, Silver, Navy, Custom",
      "Minimum Order": "1 roll",
      "Turnaround Time": "7-8 working days",
    },
    faq: [
      {
        question: "What is the minimum order quantity for custom printed ribbon?",
        answer:
          "Orders start from a single 20-yard roll, which is enough for most small businesses to trial branded packaging before committing to a larger 100-yard bulk roll.",
      },
      {
        question: "Can I match the ribbon colour to my brand's exact shade?",
        answer:
          "Yes. Alongside the standard colour range, custom colour matching is available if your brand already has a specific shade you want the ribbon to match.",
      },
      {
        question: "Will the printed text fade or rub off after handling?",
        answer:
          "No. Heat transfer printing bonds ink into the satin fabric itself rather than sitting on top of it, so the print holds up through normal handling, tying, and transit.",
      },
      {
        question: "How long does an order take from confirmation to delivery?",
        answer:
          "A digital proof is shared for approval first, and once confirmed, production and dispatch is typically completed within 7 to 8 working days.",
      },
      {
        question: "Do you deliver outside major cities?",
        answer:
          "Yes, delivery is available nationwide through established courier partners, covering major cities as well as smaller towns across Pakistan.",
      },
    ],
  },
  {
    slug: "gold-foil-ribbon",
    category: "ribbons",
    categoryName: "Ribbons",
    title: "Gold Foil Ribbon",
    images: [
      "/Images/products/ribbons/gold-foil-ribbon.png",
      "/Images/products/ribbons/gold-foil-ribbon-2.png",
      "/Images/products/ribbons/gold-foil-ribbon-3.png",
      "/Images/products/ribbons/gold-foil-ribbon-detail.png",
    ],
    shortDescription:
      "Luxury foil-printed ribbon that adds a premium, reflective finishing touch to gift and retail packaging.",
    longDescription: [
      "Gold Foil Ribbon exists for a specific kind of packaging moment — the one where a brand wants the ribbon itself to signal that what is inside is special. Instead of standard printed ink, this ribbon carries a metallic foil finish along its length, catching light in a way flat print never can. It is most commonly ordered by jewellery brands, premium gifting businesses, and retailers packaging a limited or higher-value product line where the extra visual weight of foil is worth the added cost.",
      "The base ribbon is the same high-quality satin used across our standard ribbon range, chosen because its smooth surface is what allows foil stamping to sit cleanly and evenly rather than looking patchy or inconsistent. A rougher or thinner ribbon base would cause foil to lift unevenly or crack when tied into a bow, which is why satin remains the standard base for any foil-finished product in this category.",
      "Foil stamping itself is a heat and pressure process rather than standard printing, transferring a thin metallic layer directly onto the ribbon in the exact shape of a logo, wordmark, or pattern. Gold is the most requested finish, chosen for how universally it reads as premium across nearly every retail and gifting context, though silver and rose gold variations can be produced on request for brands with a different metallic tone in their existing visual identity.",
      "Retail and gifting brands use this ribbon specifically at moments where packaging needs to do some of the selling on its own — a jewellery box tied shut before a customer even opens it, a hamper handed over as a corporate gift, or a limited-edition product line where standard packaging would undersell what is inside. The foil detail becomes part of the anticipation, adding a small but noticeable signal of quality before the product itself is even seen.",
      "Because foil stamping is a more involved process than standard heat transfer printing, order sizes for this ribbon tend to run smaller than standard bulk rolls, matched to how a brand actually uses premium packaging — usually reserved for flagship products, gifting sets, or seasonal collections rather than every single item shipped. Even so, bulk pricing is available for brands that have built foil ribbon into their standard premium packaging line.",
      "Width options mirror the standard ribbon range, from a narrower 1 inch suited to smaller jewellery and gift boxes, up to a wider 2 inch for larger hampers and retail boxes where the ribbon needs enough surface area for the foil detail to read clearly from a distance. Choosing the right width matters more here than with standard ribbon, since foil detail on too narrow a ribbon can end up looking cramped rather than deliberate.",
      "Ordering follows the same proofing process used across our ribbon range — a digital proof showing the exact foil placement and colour is shared before production, since foil stamping cannot be easily corrected once applied the way standard ink can be. Once a design is approved, production is typically completed within 7 to 8 working days, slightly longer for larger custom width or colour requests.",
      "For any brand positioning a product at a premium price point, Gold Foil Ribbon is one of the more strategic small details available — inexpensive relative to the impression it creates, and one of the few pieces of packaging that visibly signals quality before a customer has touched anything else.",
    ],
    features: [
      "Metallic foil stamping in gold, silver, or rose gold",
      "Applied to a smooth satin ribbon base for a clean, even finish",
      "Ideal for jewellery, gifting, and limited-edition retail packaging",
      "Available in 1 inch, 1.5 inch, and 2 inch widths",
      "Custom logo, wordmark, or pattern foil stamping",
      "Smaller order sizes suited to premium and seasonal product lines",
    ],
    specifications: {
      Material: "Satin Ribbon with Metallic Foil Finish",
      "Foil Colours": "Gold, Silver, Rose Gold",
      "Width Options": "1 inch / 1.5 inch / 2 inch",
      "Print Method": "Heat Foil Stamping",
      "Recommended Use": "Jewellery, Gifting, Premium Retail Packaging",
      "Minimum Order": "1 roll",
      "Turnaround Time": "7-8 working days",
    },
    faq: [
      {
        question: "How is foil ribbon different from standard printed ribbon?",
        answer:
          "Foil ribbon uses a heat-stamped metallic layer rather than standard ink, giving it a reflective, premium finish that catches light instead of sitting flat on the fabric.",
      },
      {
        question: "Can I get a colour other than gold?",
        answer:
          "Yes, silver and rose gold foil are both available on request alongside the standard gold finish.",
      },
      {
        question: "Is foil ribbon suitable for large bulk orders?",
        answer:
          "It can be, though most brands reserve foil ribbon for premium or seasonal product lines rather than every order, given the slightly higher cost of the foil stamping process.",
      },
      {
        question: "Will the foil crack or peel over time?",
        answer:
          "No, as long as the ribbon is tied and handled normally. The foil is applied to a smooth satin base specifically to avoid the cracking that can happen on rougher ribbon materials.",
      },
      {
        question: "How far in advance should I order for an event or launch?",
        answer:
          "We recommend approving your proof at least 10 days before your event or launch date to comfortably account for production and nationwide delivery time.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // BUSINESS CARDS
  // ---------------------------------------------------------------------
  {
    slug: "matte-business-cards",
    category: "business-cards",
    categoryName: "Business Cards",
    title: "Matte Business Cards",
    images: [
      "/Images/products/business-cards/matte-business-cards.png",
      "/Images/products/business-cards/matte-business-cards-2.png",
      "/Images/products/business-cards/matte-business-cards-3.png",
      "/Images/products/business-cards/matte-business-cards-detail.png",
    ],
    shortDescription:
      "Clean, non-reflective matte finish business cards designed for a professional, minimal brand identity.",
    longDescription: [
      "Matte Business Cards are the standard starting point for most professionals and companies ordering printed cards for the first time, and for good reason — the matte finish reads as clean and understated in almost any industry, from consulting and real estate to retail and creative services. Where a glossy card can sometimes feel showy, matte keeps the focus entirely on the logo, name, and contact details printed on it.",
      "The finish itself is achieved through a matte laminate applied over the printed surface, which eliminates glare and reflection under office lighting or during a handshake exchange at an event. This matters more than it sounds — a card that glares under fluorescent lighting is genuinely harder to read at a glance, while a matte surface stays legible and comfortable to look at regardless of the lighting a meeting happens under.",
      "Beyond the visual finish, matte lamination also adds a slight textural resistance that makes the card easier to handle. Cards without any lamination at all tend to feel thin and can pick up fingerprints and smudges quickly, especially in humid conditions. The matte coating protects the printed surface, so a card handed out today still looks clean weeks later sitting in a wallet or card holder.",
      "Printing is done in full colour on either side, supporting logos, contact details, QR codes, and any additional branding elements a business wants included, such as a tagline or social handle. Layouts can be as minimal as a name and number or as detailed as a full two-sided design, and the same matte finish is applied consistently regardless of how much detail is on the card.",
      "Consistency across a company is where this product earns its keep. Businesses ordering cards for multiple employees or multiple office branches typically supply one approved template, adjusted only for individual names and titles, so that every card produced — whether for a founder or a new hire — carries the exact same logo placement, font, and colour values. This is what keeps a company looking established rather than assembled from several slightly different card designs over time.",
      "Card stock weight is chosen specifically to feel substantial without becoming stiff or difficult to carry. A card that is too thin bends and creases easily inside a wallet, while one that is too rigid can feel closer to a piece of packaging than a business card. The stock used here sits at a weight most professionals recognise as standard for a well-produced card, regardless of industry.",
      "Ordering is straightforward: a design file or a request to build one from your logo and details is all that's needed to generate a digital proof. Once approved, standard orders — including reprints for growing teams — are typically completed within about a week, which is fast enough to have new cards ready before a new hire's first client meeting or a scheduled trade show appearance.",
      "For any business, from a solo consultant to a multi-branch company, Matte Business Cards remain one of the cheapest and most durable ways to hand someone a brand identity in a single physical object — one that is still being kept and referenced long after a digital contact has been scrolled past and forgotten.",
    ],
    features: [
      "Smooth, non-reflective matte laminate finish",
      "Full colour printing on front and back",
      "Consistent branding across multi-employee and multi-branch orders",
      "Durable card stock resistant to bending and smudging",
      "Suited to any industry — consulting, retail, real estate, and more",
      "Fast reprints for growing teams",
    ],
    specifications: {
      Material: "300gsm Art Card with Matte Lamination",
      Size: "Standard 3.5 x 2 inch",
      Finish: "Matte Laminate",
      "Print Sides": "Single or Double Sided",
      "Corner Style": "Square or Rounded",
      "Minimum Order": "100 cards",
      "Turnaround Time": "5-7 working days",
    },
    faq: [
      {
        question: "Can you design the card layout for me, or do I need my own artwork?",
        answer:
          "Both options are available. You can send existing artwork, or share your logo and details and a layout can be created for you before printing.",
      },
      {
        question: "What is the difference between matte and glossy business cards?",
        answer:
          "Matte cards have a non-reflective, textured finish that reduces glare and feels more premium in hand, while glossy cards are shinier and more reflective, which some brands prefer for a bolder look.",
      },
      {
        question: "Can I order cards for multiple employees in one batch?",
        answer:
          "Yes, this is common. One approved template is used with individual name and title changes, keeping the branding consistent across your whole team.",
      },
      {
        question: "How many cards should I order to start?",
        answer:
          "Most individuals and small teams start with a batch of 100 to 200 per person, reordering as needed once initial stock runs low.",
      },
      {
        question: "How quickly can I get cards before an event?",
        answer:
          "Standard orders are typically completed within 5 to 7 working days once your design is approved, so we recommend confirming artwork at least that far ahead of any fixed event date.",
      },
    ],
  },
  {
    slug: "gold-foil-business-cards",
    category: "business-cards",
    categoryName: "Business Cards",
    title: "Gold Foil Business Cards",
    images: [
      "/Images/products/business-cards/gold-foil-business-cards.png",
      "/Images/products/business-cards/gold-foil-business-cards-2.png",
      "/Images/products/business-cards/gold-foil-business-cards-3.png",
      "/Images/products/business-cards/gold-foil-business-cards-detail.png",
    ],
    shortDescription:
      "Premium business cards finished with gold foil detailing for a luxury, high-end professional impression.",
    longDescription: [
      "Gold Foil Business Cards exist for the moment a standard printed card is not quite enough — when a founder, consultant, or luxury brand wants the card itself to communicate a level of quality before a single word is read. Instead of a flat printed logo, key design elements are finished with a metallic gold foil layer, catching light and drawing the eye in a way ordinary ink cannot replicate.",
      "The foil stamping process itself uses heat and pressure to transfer a thin metallic film onto the card in the precise shape of a logo, name, or border detail, rather than printing ink onto the surface. This is a fundamentally different production step from standard printing, which is why foil elements are usually applied selectively — a logo mark, a name, or a border — rather than across the entire card surface.",
      "Card stock for this product is chosen specifically to support the foiling process without warping or cracking under the heat and pressure applied. A heavier, rigid card base is used, which also happens to reinforce the premium feel the foil finish is meant to create — a thin, flimsy card undermines a gold foil detail no matter how well it is stamped.",
      "This style of card is most commonly ordered by professionals in high-end services — real estate, law, private consulting, luxury retail, and similar fields — where the first physical object exchanged in a meeting sets an early tone. A foil-finished card signals a level of investment and attention to detail that a standard printed card, however well designed, does not convey in the same way.",
      "Design layout matters more here than with standard cards, since foil elements need to be planned deliberately rather than simply swapped in as a colour change on an existing design. Logos with fine detail, thin serif fonts, or intricate borders all foil differently than bold, simple shapes, so designs are typically reviewed specifically with the foiling process in mind before a final proof is produced.",
      "Silver and rose gold foil finishes are available alongside the standard gold option, chosen based on a brand's existing colour palette rather than a fixed rule — gold suits warmer, traditional branding, while silver and rose gold suit cooler or more modern visual identities respectively. All three use the same stamping process and turnaround time.",
      "Because foil stamping is a more deliberate process than standard printing, proofing is taken seriously before production begins — a digital proof showing exact foil placement is shared for approval, since foil elements cannot be corrected the way standard ink can once applied. Once approved, orders are typically completed within 7 to 10 working days depending on design complexity.",
      "For professionals and brands where the first handshake and the first card exchanged genuinely matter, Gold Foil Business Cards remain one of the most effective small investments available — a physical detail that continues doing quiet, persuasive work for a client long after the meeting itself has ended.",
    ],
    features: [
      "Genuine heat foil stamping, not printed gold ink",
      "Gold, silver, or rose gold foil options",
      "Heavier, rigid card stock built to support the foiling process",
      "Ideal for real estate, law, consulting, and luxury retail",
      "Selective foil detailing on logos, names, or borders",
      "Design review specifically for foil-suitable layouts",
    ],
    specifications: {
      Material: "400gsm Rigid Card Stock",
      Size: "Standard 3.5 x 2 inch",
      "Foil Colours": "Gold, Silver, Rose Gold",
      "Print Method": "Offset Print with Heat Foil Stamping",
      "Corner Style": "Square or Rounded",
      "Minimum Order": "100 cards",
      "Turnaround Time": "7-10 working days",
    },
    faq: [
      {
        question: "Is this real gold foil or just gold-coloured ink?",
        answer:
          "It is genuine heat foil stamping, using a metallic film applied with heat and pressure, not printed ink designed to look gold.",
      },
      {
        question: "Can my entire card be covered in foil?",
        answer:
          "Full-coverage foil is technically possible but uncommon, since foil reads most effectively when applied selectively to a logo, name, or border rather than the entire surface.",
      },
      {
        question: "Will fine text or detailed logos foil clearly?",
        answer:
          "Very fine detail can be more challenging to foil cleanly, which is why designs are reviewed before production and occasionally adjusted slightly to foil well.",
      },
      {
        question: "How much more does foil printing cost compared to standard cards?",
        answer:
          "Foil stamping is a more involved process than standard printing, so pricing is higher than our Matte or Spot UV cards — get in touch on WhatsApp for a quote based on your exact design and quantity.",
      },
      {
        question: "How long should I allow before an event or launch?",
        answer:
          "We recommend approving your design at least two weeks ahead of any fixed date, since foil orders take slightly longer than standard business cards.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // MUGS
  // ---------------------------------------------------------------------
  {
    slug: "premium-ceramic-mugs",
    category: "mugs",
    categoryName: "Mugs",
    title: "Premium Ceramic Mugs",
    images: [
      "/Images/products/mugs/premium-ceramic-mugs.png",
      "/Images/products/mugs/premium-ceramic-mugs-2.png",
      "/Images/products/mugs/premium-ceramic-mugs-3.png",
      "/Images/products/mugs/premium-ceramic-mugs-detail.png",
    ],
    shortDescription:
      "High-quality ceramic mugs with sharp, fade-resistant full-colour printing for personal gifts and corporate branding.",
    longDescription: [
      "Premium Ceramic Mugs are printed using sublimation, a process that infuses ink directly into the ceramic glaze rather than sitting on top of it as a surface coating. This is the single biggest factor separating a mug that stays sharp for years from one that fades or peels after a handful of washes, and it is why sublimation is the standard method used across this entire product line.",
      "The ceramic base itself is chosen for wall thickness and glaze quality, both of which affect how a printed design ultimately looks and how long it lasts. A thinner, lower-quality ceramic body can absorb ink unevenly, leading to patchy colour or a design that looks slightly duller than the original artwork. The ceramic used here is selected specifically to reproduce full-colour designs, photographs, and logos with accurate, consistent colour across the entire printed surface.",
      "Because sublimation bonds ink into the glaze at a molecular level, the finished print becomes genuinely dishwasher and microwave safe, unlike vinyl decals or surface-printed alternatives that are prone to peeling under heat and repeated washing. This is particularly relevant for mugs intended for daily use rather than display, since a mug that cannot survive a dishwasher cycle quickly stops being used at all.",
      "Design possibilities are broad given the full-colour printing method — a single logo, a detailed illustration, a personal photograph, or a mix of text and imagery can all be reproduced with the same level of sharpness. This flexibility is what makes this specific mug popular across very different use cases, from a single personalised gift mug printed with a family photo to a full batch of a hundred mugs printed with one consistent company logo.",
      "Corporate orders are handled with the same printing standard as individual gifts, since the process does not change based on quantity — only the volume of mugs run through production at once. Businesses ordering for staff gifting, client appreciation, or onboarding kits can expect the same colour accuracy and durability whether ordering ten mugs or several hundred.",
      "Handle and rim shape follow a classic, comfortable design chosen deliberately over more novelty-shaped alternatives, since the priority for this specific mug is everyday practicality rather than a decorative shape that might compromise grip or balance. The white ceramic base also ensures printed colours appear as close as possible to the original artwork, without a coloured base shifting the tone of the design.",
      "Ordering starts with a design file, photo, or logo, which is used to generate a digital proof showing exactly how the finished mug will look before production begins. This step matters particularly for photo-based designs, where cropping and colour balance need to be confirmed ahead of time rather than adjusted after printing, since sublimation cannot easily be corrected once applied.",
      "Once a design is approved, standard orders are typically completed within about a week, which comfortably fits most personal gifting timelines as well as corporate deadlines tied to a specific event or onboarding date. Bulk pricing is available for corporate and event orders, making this one of the more cost-effective branded giveaway items available at scale.",
      "Whether ordered as a single personalised gift or a full batch of corporate giveaways, Premium Ceramic Mugs remain one of the most practical branded items available — used daily, seen constantly, and durable enough that the design still looks sharp long after most paper-based promotional items would have been thrown away.",
    ],
    features: [
      "Full-colour sublimation printing bonded into the ceramic glaze",
      "Dishwasher and microwave safe",
      "Sharp, fade-resistant results for photos, logos, and illustrations",
      "Consistent quality across single gifts and large corporate orders",
      "Classic 11oz ceramic shape with a comfortable handle",
      "Bulk pricing available for corporate and event orders",
    ],
    specifications: {
      Material: "Ceramic with Sublimation Coating",
      Capacity: "11oz (Standard)",
      "Print Method": "Full-Colour Sublimation Printing",
      "Care Instructions": "Dishwasher and Microwave Safe",
      "Base Colour": "White",
      "Minimum Order": "1 mug",
      "Turnaround Time": "5-7 working days",
    },
    faq: [
      {
        question: "Will the printed design fade after washing?",
        answer:
          "No, sublimation printing bonds the ink directly into the ceramic glaze rather than coating the surface, so the design stays sharp through regular dishwasher use.",
      },
      {
        question: "Can I print a photo instead of a logo?",
        answer:
          "Yes, full-colour photo printing works the same way as logo printing — a digital proof is shared first to confirm cropping and colour before production.",
      },
      {
        question: "Is there a discount for ordering mugs in bulk for my company?",
        answer:
          "Yes, bulk pricing is available for corporate gifting, staff onboarding kits, and event giveaways. Reach out on WhatsApp with your quantity for a quote.",
      },
      {
        question: "Are these mugs microwave safe?",
        answer:
          "Yes, both the ceramic body and the sublimation print are microwave and dishwasher safe.",
      },
      {
        question: "How long does a bulk corporate order take?",
        answer:
          "Standard bulk orders are typically completed within 5 to 7 working days once your design is approved, though very large quantities may take slightly longer.",
      },
    ],
  },
  {
    slug: "magic-colour-changing-mugs",
    category: "mugs",
    categoryName: "Mugs",
    title: "Magic Colour Changing Mugs",
    images: [
      "/Images/products/mugs/magic-colour-changing-mugs.png",
      "/Images/products/mugs/magic-colour-changing-mugs-2.png",
      "/Images/products/mugs/magic-colour-changing-mugs-3.png",
      "/Images/products/mugs/magic-colour-changing-mugs-detail.png",
    ],
    shortDescription:
      "Heat-reactive mugs that reveal a hidden design once hot liquid is poured in — a favourite for personalised gifts.",
    longDescription: [
      "Magic Colour Changing Mugs take the standard printed mug and add a heat-reactive coating over the ceramic surface, so the mug appears in a solid, often dark colour when cold and reveals a printed design underneath once hot liquid is poured in. This reveal effect is the entire appeal of the product, turning a routine morning coffee or tea into a small, repeated moment of surprise every time the mug is used.",
      "The coating itself is a thermochromic layer applied over a base design that has already been printed onto the ceramic using standard sublimation. As the mug warms from hot liquid, the coating becomes transparent, gradually exposing the design beneath it, and as the mug cools back down, the coating returns to its original solid colour, hiding the design again until the next use.",
      "Design planning for this product works differently than for standard mugs, since the artwork needs to be visible and legible specifically once revealed by heat, rather than visible at all times. Photos, messages, and logos are all commonly used, though designs with strong contrast tend to reveal most clearly, since the transition from opaque coating to visible print happens gradually rather than instantly.",
      "This mug is most frequently ordered as a personal gift — for anniversaries, birthdays, or as a surprise message mug where the hidden design is a photo, a private joke, or a heartfelt note that only appears once hot coffee or tea is poured in. The novelty of the reveal is what makes it a repeat favourite for personal gifting compared to a standard static-print mug.",
      "Corporate and event use is less common than personal gifting for this specific product, though it does get ordered for product launches or brand activations where a company wants a giveaway item with genuine novelty value rather than a purely functional branded mug. A logo reveal effect can work well for this kind of activation, provided the design is planned with the heat-reveal process in mind from the start.",
      "Base colour options for the heat-reactive coating are typically limited to a small range of solid colours — usually black or a dark tone — chosen specifically because darker coatings hide the underlying design most effectively when cold and reveal it most clearly once heated. Lighter coating colours are technically possible but tend to produce a less dramatic reveal effect.",
      "Because the reveal effect depends on both the base print and the coating working together correctly, proofing for this mug includes a description of how the design will appear at both the cold and hot stages, rather than a single static image. This helps set accurate expectations before production, particularly for photo-based designs where colour intensity after the reveal can differ slightly from the original source image.",
      "Ordering follows the same process as standard mugs — a design or photo is supplied, a proof is shared for approval, and production is typically completed within about a week. Given the added coating step, slightly more lead time should be planned for large bulk orders compared to standard ceramic mugs.",
      "For anyone looking for a gift with a genuine element of surprise built in, or a business wanting a more memorable giveaway than a standard printed mug, Magic Colour Changing Mugs remain one of the most consistently popular novelty items in our full mug range — practical enough for daily use, but with a small reveal moment that keeps the design feeling fresh every single time.",
    ],
    features: [
      "Heat-reactive coating reveals a hidden design when hot liquid is added",
      "Design returns to hidden state once the mug cools",
      "Popular for anniversaries, birthdays, and personal photo gifts",
      "Full-colour sublimation base print beneath the reactive coating",
      "Dark coating colours for maximum reveal contrast",
      "Available for personal gifting and brand activation events",
    ],
    specifications: {
      Material: "Ceramic with Thermochromic Coating",
      Capacity: "11oz (Standard)",
      "Print Method": "Sublimation Print with Heat-Reactive Overcoat",
      "Coating Colour": "Black (Standard), other dark tones on request",
      "Care Instructions": "Hand wash recommended to preserve coating longevity",
      "Minimum Order": "1 mug",
      "Turnaround Time": "6-8 working days",
    },
    faq: [
      {
        question: "How does the colour changing effect actually work?",
        answer:
          "A heat-reactive coating sits over a printed design. When hot liquid is poured in, the coating turns transparent and reveals the design underneath; as it cools, the coating returns to its solid colour and hides the design again.",
      },
      {
        question: "Can I use a photo for the hidden design?",
        answer:
          "Yes, photo-based reveal designs are one of the most popular choices, especially for anniversary and birthday gifts.",
      },
      {
        question: "Is the coating dishwasher safe like your standard mugs?",
        answer:
          "Hand washing is recommended for this mug specifically, since the heat-reactive coating can wear faster than a standard sublimation print under repeated dishwasher cycles.",
      },
      {
        question: "Does the reveal work with any hot drink?",
        answer:
          "Yes, any sufficiently hot liquid — coffee, tea, or hot water — will trigger the colour change and reveal the design underneath.",
      },
      {
        question: "How long does a custom colour-changing mug order take?",
        answer:
          "Standard orders are typically completed within 6 to 8 working days once your design is approved, slightly longer than our standard ceramic mugs due to the added coating step.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // STICKERS
  // ---------------------------------------------------------------------
  {
    slug: "vinyl-stickers",
    category: "stickers",
    categoryName: "Stickers",
    title: "Vinyl Stickers",
    images: [
      "/Images/products/stickers/vinyl-stickers.png",
      "/Images/products/stickers/vinyl-stickers-2.png",
      "/Images/products/stickers/vinyl-stickers-3.png",
      "/Images/products/stickers/vinyl-stickers-detail.png",
    ],
    shortDescription:
      "Durable, weatherproof vinyl stickers ideal for outdoor use, product labelling, and packaging seals.",
    longDescription: [
      "Vinyl Stickers are built specifically for situations where a standard paper sticker would not survive — outdoor exposure, repeated handling, moisture, or long-term display. The vinyl base material itself is what makes this possible, holding colour and adhesion in conditions that would cause paper stock to fade, peel, or tear within weeks.",
      "Printing is done in full colour directly onto the vinyl surface, capable of reproducing detailed logos, illustrations, and photographic designs with sharp, accurate colour. A protective laminate is applied over the printed surface as standard, adding an additional layer of scratch and UV resistance so the design continues to look sharp well after the sticker has been applied and handled repeatedly.",
      "Adhesive strength is a major factor separating vinyl stickers from cheaper alternatives, and the adhesive used here is chosen specifically to hold securely on a range of surfaces — cardboard packaging, glass, painted walls, laptops, and plastic product casings — without lifting at the corners over time. This matters as much as the print quality itself, since a sticker that peels away within a week undermines the branding effort entirely.",
      "Businesses use vinyl stickers across a genuinely wide range of applications. E-commerce sellers apply them as tamper-evident seals on shipping boxes. Product brands use them as durable labels on bottles, jars, and containers exposed to handling and occasional moisture. Retailers use them as window decals and promotional displays that need to survive sun exposure without fading. Event organisers use them as branded giveaways that attendees actually keep and use afterward, unlike most paper-based promotional items.",
      "Shape and size are fully customisable, whether that means a simple circle or square sized to fit a jar lid, or a fully custom die-cut outline that follows the exact shape of a logo or illustration. Custom die-cutting is a standard part of the production process here, not an added extra, since a sticker cut to match its own artwork outline consistently looks more professional than a plain rectangular sticker with visible white space around the design.",
      "Bulk ordering is where this product becomes particularly cost-effective, since unit price drops meaningfully as order quantity increases. Businesses building stickers into standard packaging — sealing every box or labelling every unit produced — typically order in batches of several hundred or several thousand, planned around production or shipping schedules rather than as a one-time purchase.",
      "Because vinyl stickers are frequently used as a branding touchpoint on every single order or product unit, consistency across a large batch matters as much as the quality of any individual sticker. Colour accuracy and cut precision are maintained across the full run, so a sticker applied to the thousandth box looks identical to the one applied to the first.",
      "Ordering starts with an uploaded design or logo, from which a digital proof is generated showing the exact colours, size, and cut line before printing begins. Once approved, standard bulk orders are typically completed within about a week, keeping packaging and labelling schedules on track without a costly delay waiting on a basic supply item.",
      "Whether the goal is a tamper-evident seal for e-commerce shipments, a durable product label, or a branded giveaway attendees actually keep, Vinyl Stickers remain one of the most flexible and cost-effective printed items available — built to survive far longer than the moment they are first applied.",
    ],
    features: [
      "Weatherproof vinyl base with UV and scratch-resistant laminate",
      "Strong adhesive suited to cardboard, glass, plastic, and painted surfaces",
      "Custom die-cutting to match your exact logo or artwork outline",
      "Full-colour printing for detailed logos, illustrations, and photos",
      "Ideal for shipping seals, product labels, window decals, and giveaways",
      "Consistent colour and cut accuracy across large bulk runs",
    ],
    specifications: {
      Material: "Weatherproof Vinyl with Protective Laminate",
      "Finish Options": "Gloss or Matte Laminate",
      "Cut Style": "Custom Die-Cut or Standard Shapes",
      "Adhesive Type": "Permanent, Weatherproof Adhesive",
      "Recommended Use": "Indoor and Outdoor Applications",
      "Minimum Order": "50 stickers",
      "Turnaround Time": "5-7 working days",
    },
    faq: [
      {
        question: "Are vinyl stickers waterproof?",
        answer:
          "Yes, the vinyl material and protective laminate are both designed to resist water, making these stickers suitable for outdoor use and packaging exposed to moisture.",
      },
      {
        question: "Can you cut stickers to match my logo's exact shape?",
        answer:
          "Yes, custom die-cutting to follow your artwork's outline is a standard part of production, not an added extra.",
      },
      {
        question: "Will these stickers work on cardboard shipping boxes?",
        answer:
          "Yes, the adhesive used is suited to cardboard, glass, plastic, and painted surfaces, making it a reliable choice for sealing shipping boxes.",
      },
      {
        question: "What is the minimum order quantity?",
        answer:
          "Orders start from 50 stickers, with unit pricing dropping significantly at higher quantities suited to ongoing packaging or labelling use.",
      },
      {
        question: "How long do vinyl stickers last outdoors?",
        answer:
          "With the UV-resistant laminate applied, vinyl stickers are built to hold their colour and adhesion in outdoor conditions for an extended period without fading or peeling.",
      },
    ],
  },
  {
    slug: "die-cut-stickers",
    category: "stickers",
    categoryName: "Stickers",
    title: "Die Cut Stickers",
    images: [
      "/Images/products/stickers/die-cut-stickers.png",
      "/Images/products/stickers/die-cut-stickers-2.png",
      "/Images/products/stickers/die-cut-stickers-3.png",
      "/Images/products/stickers/die-cut-stickers-detail.png",
    ],
    shortDescription:
      "Custom-shaped stickers cut precisely to your logo or artwork outline for a clean, professional look.",
    longDescription: [
      "Die Cut Stickers are produced by cutting directly along the outline of a logo or design, rather than leaving it inside a standard rectangular or circular shape. This single production choice is what separates a sticker that looks intentionally designed from one that looks like a basic printed label, and it is the reason die-cut stickers remain one of the most requested formats for brands wanting a genuinely polished result.",
      "The cutting process itself uses a precision blade guided by the exact vector outline of the supplied artwork, following every curve and edge of a logo or illustration rather than a simplified shape. This means a design with an irregular outline — a mascot character, a wordmark with unusual letterforms, or a detailed icon — is cut exactly to that shape rather than approximated with a basic circle or square around it.",
      "Because the cut line follows the artwork so closely, file preparation matters more for this product than for simple shaped stickers. A clean vector outline, or a high-resolution image that can be traced accurately, produces the sharpest results, since the cutting equipment is only ever as precise as the outline it is following. Where needed, artwork can be reviewed and lightly adjusted specifically to produce a cleaner die line before production begins.",
      "Printing itself uses the same full-colour, laminate-protected process used across our sticker range, so die-cut stickers hold the same fade resistance and durability as our standard shaped stickers — the difference is purely in the cut, not the print quality or material underneath it.",
      "This format is especially popular for brand logo stickers intended to be seen and kept — laptop stickers, water bottle decals, and giveaway items at events or trade shows, where a shape that closely follows a recognisable logo tends to get picked up, kept, and displayed more often than a plain rectangular sticker with the same logo printed inside it.",
      "Product and packaging use is equally common, particularly for brands that want a sticker to visually double as part of the product's own branding — a die-cut logo sticker sealing a box flap reads as a deliberate design choice, whereas the same logo on a plain rectangular sticker can look like an afterthought applied to generic packaging.",
      "Bulk ordering works the same way as our standard stickers, with unit cost dropping at higher quantities. Businesses ordering die-cut stickers as a recurring packaging seal or product label typically plan orders in batches of several hundred to several thousand, timed around production or shipping cycles rather than ordered piecemeal.",
      "Ordering starts with your logo or artwork file, from which a digital proof is generated showing the exact die line before cutting begins, since this is the detail most worth confirming ahead of production. Once approved, standard orders are typically completed within about a week, the same turnaround as our other sticker formats.",
      "For any brand that wants its logo or mascot to look intentional rather than boxed in in, Die Cut Stickers remain the most effective sticker format available — the same durable print quality as our full range, cut specifically to make a design look like it was always meant to exist as a standalone sticker.",
    ],
    features: [
      "Precision cutting that follows your exact logo or artwork outline",
      "Same full-colour, laminate-protected printing as our standard stickers",
      "Ideal for logo stickers, mascots, and irregular-shaped designs",
      "Ready for laptops, bottles, packaging seals, and event giveaways",
      "Vector or high-resolution artwork accepted for precise die lines",
      "Bulk pricing for recurring packaging and labelling use",
    ],
    specifications: {
      Material: "Weatherproof Vinyl with Protective Laminate",
      "Cut Style": "Custom Die-Cut to Artwork Outline",
      "Finish Options": "Gloss or Matte Laminate",
      "Recommended Artwork": "Vector File or High-Resolution Image",
      "Adhesive Type": "Permanent, Weatherproof Adhesive",
      "Minimum Order": "50 stickers",
      "Turnaround Time": "5-7 working days",
    },
    faq: [
      {
        question: "What file format do you need for die-cut stickers?",
        answer:
          "A vector file (such as AI, EPS, or SVG) produces the cleanest die line, though a high-resolution image can also be used and traced if a vector file isn't available.",
      },
      {
        question: "How is a die-cut sticker different from a regular shaped sticker?",
        answer:
          "A regular shaped sticker is cut to a basic shape like a circle or square around your design, while a die-cut sticker is cut precisely along your artwork's own outline.",
      },
      {
        question: "Can complex logos or mascots be die-cut accurately?",
        answer:
          "Yes, as long as the outline is clear in the supplied artwork. More intricate shapes may be reviewed and lightly adjusted first to ensure a clean, accurate cut.",
      },
      {
        question: "Are die-cut stickers as durable as your standard vinyl stickers?",
        answer:
          "Yes, they use the same weatherproof vinyl and protective laminate — the only difference is the cut line follows your artwork instead of a basic shape.",
      },
      {
        question: "What's the minimum order for die-cut stickers?",
        answer:
          "Orders start from 50 stickers, with pricing improving significantly at higher bulk quantities.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return productDetails.find((product) => product.slug === slug);
}

export function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 4
): ProductDetail[] {
  return productDetails
    .filter((product) => product.category === category && product.slug !== excludeSlug)
    .slice(0, limit);
}
