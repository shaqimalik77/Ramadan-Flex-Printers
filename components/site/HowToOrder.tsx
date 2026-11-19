import { BadgeCheck, Send, Truck } from "lucide-react";
import { INK } from "@/lib/brand";
import Halftone from "@/components/Halftone";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/site/SectionTitle";
import QuoteButton from "@/components/site/QuoteButton";

const YELLOW_TEXT = "#E0A800";

const steps = [
  {
    icon: Send,
    color: INK.cyan,
    title: "Send your idea",
    text: "WhatsApp us your logo, design or a reference picture, with the quantity you need.",
  },
  {
    icon: BadgeCheck,
    color: INK.magenta,
    title: "Approve the proof",
    text: "We reply with the price, timing and a digital proof. Nothing is printed until you say yes.",
  },
  {
    icon: Truck,
    color: YELLOW_TEXT,
    title: "Get it delivered",
    text: "We print your order in Lahore and deliver it to your door anywhere in Pakistan.",
  },
];

/** "How to order" timeline: three steps joined by a dashed line. */
export default function HowToOrder({ quoteMessage }: { quoteMessage?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] py-14 sm:py-24">
      <Halftone color={INK.yellow} className="-right-24 top-10 h-80 w-80" opacity={0.4} />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle title="How to order" subtitle="Three simple steps, all on WhatsApp." />
        <div className="relative mt-12 md:mt-16">
          {/* Dashed line joining the steps */}
          <span
            aria-hidden
            className="absolute left-[16.7%] right-[16.7%] top-8 hidden border-t-2 border-dashed border-neutral-300 md:block"
          />
          <span
            aria-hidden
            className="absolute bottom-10 left-8 top-8 border-l-2 border-dashed border-neutral-300 md:hidden"
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map(({ icon: Icon, color, title, text }, i) => (
              <li key={title} className="relative">
                <Reveal delay={i * 150} className="flex gap-5 md:flex-col md:items-center md:text-center">
                  <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-8 ring-[#FAF8F5]">
                    <Icon className="h-7 w-7" style={{ color }} strokeWidth={1.7} />
                    <span
                      className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ background: color }}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <div className="md:mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color }}>
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                    <p className="mt-2 max-w-xs leading-relaxed text-neutral-500 md:mx-auto">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="mt-12 text-center">
          <QuoteButton label="Start your order on WhatsApp" message={quoteMessage} />
        </Reveal>
      </div>
    </section>
  );
}
