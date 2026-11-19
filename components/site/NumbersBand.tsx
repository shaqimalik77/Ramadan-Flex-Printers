import { siteConfig } from "@/lib/siteConfig";
import { INK } from "@/lib/brand";
import { categoryProducts } from "@/data/categoryProducts";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
import Halftone from "@/components/Halftone";
import Reveal from "@/components/Reveal";

/** Dark band of real numbers only (no made-up "years" or "clients"). */
export default function NumbersBand() {
  const stats = [
    { value: String(categoryProducts.length), label: "Product categories", color: INK.cyan },
    { value: `${GOOGLE_RATING}★`, label: "Google rating", color: INK.yellow },
    { value: String(GOOGLE_REVIEW_COUNT), label: "Google reviews", color: INK.magenta },
    { value: "6 days", label: `a week, ${siteConfig.hoursTime.replace(/:00/g, "")}`, color: "#FFFFFF" },
  ];
  return (
    <section className="relative overflow-hidden py-14 text-white sm:py-16" style={{ background: INK.key }}>
      <Halftone color={INK.yellow} className="-right-10 -top-16 h-72 w-72" opacity={0.25} spacing={12} />
      <Halftone color={INK.cyan} className="-bottom-20 -left-10 h-72 w-72" opacity={0.25} spacing={12} />
      <ul className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 lg:grid-cols-4">
        {stats.map(({ value, label, color }, i) => (
          <li key={label} className={`text-center ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
            <Reveal delay={i * 90}>
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color }}>
                {value}
              </p>
              <p className="mt-2 text-sm text-neutral-300 sm:text-base">{label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
