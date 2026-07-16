import Link from "next/link";
import type { ProductDetail } from "@/data/productDetails";

/**
 * NOTE: Replace this with the project's existing WhatsApp number / config
 * if one is already defined elsewhere (e.g. a shared `lib/whatsapp.ts` or
 * site config file). This constant matches the one used in
 * components/CategoryProductCard.tsx so behaviour stays consistent.
 */
const WHATSAPP_NUMBER = "923311146549";

function buildWhatsAppLink(productTitle: string): string {
  const message = `Hi, I'm interested in getting a quote for ${productTitle}. Could you please share pricing and details?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const whatsappLink = buildWhatsAppLink(product.title);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {product.title}
      </h1>

      <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
        {product.shortDescription}
      </p>

      {product.features.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700 sm:text-[15px]">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-green-700 sm:w-auto sm:px-12"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.33 4.93L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 1 1 15.29-4.38 8.24 8.24 0 0 1-8.3 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
        </svg>
        Get Quote on WhatsApp
      </Link>
    </div>
  );
}
