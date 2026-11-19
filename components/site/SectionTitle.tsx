import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";

/** Section heading of the redesign: CMYK stripe, title and a subtitle line. */
export default function SectionTitle({
  title,
  subtitle,
  onDark = false,
  align = "center",
  as: Tag = "h2",
}: {
  title: string;
  subtitle?: string;
  onDark?: boolean;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-left"}`}>
      <InkStripe onDark={onDark} />
      <Tag
        className={`mt-5 text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight ${
          onDark ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className={`mt-3 max-w-2xl text-lg ${onDark ? "text-neutral-300" : "text-neutral-500"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
