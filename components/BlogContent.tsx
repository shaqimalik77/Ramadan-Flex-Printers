import SmartImage from "./Smartimage";
import { MessageCircle } from "lucide-react";
import { BlogContentBlock } from "@/data/blogDetails";
import { siteConfig } from "@/lib/siteConfig";

type BlogContentProps = {
  blocks: BlogContentBlock[];
};

function ContentBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-[15px] md:text-base text-gray-700 leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc pl-5 space-y-2 text-[15px] md:text-base text-gray-700 mb-6 marker:text-red-600">
          {block.items.map((item, index) => (
            <li key={index} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden my-8 shadow-sm">
          <SmartImage
            src={block.src}
            alt={block.alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      );
    default:
      return null;
  }
}

export default function BlogContent({ blocks }: BlogContentProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I read your blog and I'd like to get a quote."
  )}`;

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-4">
      <div className="prose-none">
        {blocks.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-100 px-6 py-10 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Ready to Get Started?
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-6 max-w-xl mx-auto">
          Share your requirements with our team on WhatsApp and get a fast,
          no-obligation quote for your order.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 ease-in-out hover:brightness-105 hover:shadow-lg active:scale-95"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Get Quote on WhatsApp
        </a>
      </div>
    </article>
  );
}
