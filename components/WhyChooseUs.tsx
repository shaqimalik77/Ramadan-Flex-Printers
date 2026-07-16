import {
  Sparkles,
  Zap,
  PackageCheck,
  Truck,
  PenTool,
  Wallet,
  LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Premium Printing",
    description:
      "Sharp, vibrant, and consistent print quality on every material, from packaging to promotional products.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Efficient production workflows that keep your order on schedule, even on tight deadlines.",
  },
  {
    icon: PackageCheck,
    title: "Bulk Orders",
    description:
      "Scalable production for large quantity orders with pricing that gets better as you grow.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description:
      "Reliable delivery to Lahore, Karachi, Islamabad, Faisalabad, Multan, Sialkot, and beyond.",
  },
  {
    icon: PenTool,
    title: "Professional Design",
    description:
      "Free digital proofs and design support to make sure your branding looks right before printing.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description:
      "Transparent, competitive pricing for small businesses and large corporate orders alike.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#E41F26] bg-red-50 px-3 py-1 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Quality and Reliability, Every Order
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg p-7 transition-all duration-300 ease-in-out hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-5 transition-colors duration-300 group-hover:bg-[#E41F26]">
                <Icon
                  className="w-6 h-6 text-[#E41F26] transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
