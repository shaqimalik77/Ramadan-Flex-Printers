import { FileCheck, Layers, MessageCircle, Truck } from "lucide-react";
import { INK } from "@/lib/brand";
import Reveal from "@/components/Reveal";

const YELLOW_TEXT = "#E0A800";

/** The four promises, taken from the site's own copy (confirm with the client). */
const benefits = [
  {
    icon: Truck,
    color: INK.cyan,
    title: "Delivery across Pakistan",
    text: "We ship by courier to your door, in Lahore or any other city.",
  },
  {
    icon: MessageCircle,
    color: INK.magenta,
    title: "Free quote on WhatsApp",
    text: "Send us your idea and get the price and timing in a reply.",
  },
  {
    icon: FileCheck,
    color: YELLOW_TEXT,
    title: "Design proof first",
    text: "You approve a digital proof before anything goes to print.",
  },
  {
    icon: Layers,
    color: INK.key,
    title: "Small or bulk orders",
    text: "From a first small run to regular bulk orders for your brand.",
  },
];

/** Four-column strip of promises (2 x 2 on phones). */
export default function Benefits({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <section className="border-y border-neutral-200 bg-white">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, color, title, text }, i) => (
          <li
            key={title}
            className={`group px-5 py-8 sm:px-8 sm:py-10 ${
              i % 2 === 1 ? "border-l border-neutral-200" : ""
            } ${i >= 2 ? "border-t border-neutral-200 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <Reveal delay={i * 90} className="flex flex-col gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-1"
                style={{ background: `${color}14` }}
              >
                <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.7} />
              </span>
              <Heading className="text-base font-semibold sm:text-lg">{title}</Heading>
              <p className="text-sm leading-relaxed text-neutral-500 sm:text-[15px]">{text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
