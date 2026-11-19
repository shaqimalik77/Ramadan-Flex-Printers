import { siteConfig } from "@/lib/siteConfig";
import { INK } from "@/lib/brand";
import Halftone from "@/components/Halftone";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/site/SectionTitle";
import QuoteButton from "@/components/site/QuoteButton";

/** Dark closing band: "Have something in mind?" plus the WhatsApp button. */
export default function ClosingCta({
  title = "Have something in mind?",
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <section
      className="relative overflow-hidden px-5 py-20 text-center text-white sm:py-24"
      style={{ background: INK.key }}
    >
      <Halftone color={INK.magenta} className="-left-16 -top-20 h-80 w-80" opacity={0.3} spacing={12} />
      <Halftone color={INK.cyan} className="-bottom-24 -right-16 h-96 w-96" opacity={0.25} spacing={12} />
      <div className="relative">
        <SectionTitle
          title={title}
          subtitle={`Send us a message on WhatsApp and get a free quote today. ${siteConfig.hoursDays}, ${siteConfig.hoursTime}.`}
          onDark
        />
        <Reveal className="mt-9 flex justify-center">
          <QuoteButton label={`WhatsApp ${siteConfig.phoneDisplay}`} message={message} variant="light" />
        </Reveal>
      </div>
    </section>
  );
}
