/**
 * Central contact/business info.
 * Pulled into one place so any component (Hero, Footer, Contact page)
 * can import it instead of hardcoding strings.
 */
export const siteConfig = {
  name: "Ramdan Flex Printers",
  address: "Lahore, Pakistan",
  email: "ramdanprinters@gmail.com",

  /** Display format, e.g. for footers or "Call us" links */
  phoneDisplay: "0301 7413377",

  /** tel: link format (no spaces) */
  phoneHref: "03017413377",

  /**
   * International format for wa.me links: country code + number,
   * no leading 0, no "+", no spaces/dashes.
   */
  whatsappNumber: "923017413377",

  /**
   * Default pre-filled message for the "Get Quote on WhatsApp" button.
   * Edit or remove — set to "" to open a blank chat instead.
   */
  whatsappDefaultMessage: "Hi, I'd like to get a quote.",
};
