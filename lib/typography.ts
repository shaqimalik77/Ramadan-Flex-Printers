/**
 * Shared type styles, so every page uses the same sizes.
 * (Section headings use components/site/SectionTitle.)
 */
export const TEXT = {
  /** Small uppercase line above a page heading. */
  eyebrow: "flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500",
  /** The big heading at the top of every page (H1, or the slogan on the homepage). */
  display: "text-[2.25rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]",
  /** The introduction paragraph under a page heading. */
  lead: "text-base leading-relaxed text-neutral-600 sm:text-lg",
} as const;
