import {
  ClipboardList,
  PenLine,
  Printer,
  BadgeCheck,
  Truck,
  LucideIcon,
} from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: ClipboardList,
    title: "Requirement",
    description: "Share your product, quantity, and branding details.",
  },
  {
    icon: PenLine,
    title: "Design",
    description: "We prepare a digital proof for your approval.",
  },
  {
    icon: Printer,
    title: "Printing",
    description: "Production begins once the design is confirmed.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Check",
    description: "Every batch is inspected before it ships.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Fast, tracked delivery anywhere in Pakistan.",
  },
];

export default function OurProcess() {
  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#E41F26] bg-red-50 px-3 py-1 rounded-full mb-4">
            Our Process
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            From Requirement to Delivery
          </h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-200"
          />

          {steps.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#E41F26] shadow-md mb-4">
                <Icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-[#E41F26] mb-1">
                Step {index + 1}
              </span>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
