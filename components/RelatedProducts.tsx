import Link from "next/link";
import type { ProductDetail } from "@/data/productDetails";
import SmartImage from "./Smartimage";

interface RelatedProductsProps {
  products: ProductDetail[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-neutral-200 py-10 sm:py-12">
      <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
        You May Also Like
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <SmartImage
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 sm:text-[15px]">
                {product.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
