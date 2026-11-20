import { Figtree } from "next/font/google";

/**
 * Design tokens for the redesign. The identity is built on the four
 * printing inks (CMYK) that also appear in the Ramdan Flex Printers logo.
 */
export const INK = {
  cyan: "#00AEEF",
  magenta: "#EC008C",
  yellow: "#FFD200",
  key: "#1A1A1A",
  /** Brand red, used for the main call-to-action buttons. */
  red: "#E41F26",
} as const;

export const INK_ORDER = [INK.cyan, INK.magenta, INK.yellow, INK.key] as const;

/** Light, friendly sans used by the redesign. */
export const brandFont = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
