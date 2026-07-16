import Link from "next/link";
import SmartImage from "./Smartimage";
import { ArrowRight } from "lucide-react";
import { SearchResultItem } from "@/data/search";

type SearchCardProps = {
  item: SearchResultItem;
};

const badgeStyles: Record<string, string> = {
  Product: "bg-red-50 text-[#E41F26]",
  Category: "bg-blue-50 text-blue-600",
  Blog: "bg-amber-50 text-amber-600",
};

export default function SearchCard({ item }: SearchCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1">
      <Link
        href={item.href}
        aria-label={item.title}
        className="absolute inset-0 z-10"
      />

      <div className="relative w-full h-44 bg-gray-50 overflow-hidden">
        <SmartImage
          src={item.image || "/Images/logo/logo.png"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            badgeStyles[item.badge] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {item.badge}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        <span className="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E41F26] transition-colors duration-200">
          View
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
