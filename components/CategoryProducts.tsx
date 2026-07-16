import type { Product } from "@/data/categoryProducts";
import CategoryProductCard from "./CategoryProductCard";

interface CategoryProductsProps {
  products: Product[];
}

/**
 * Responsive product grid:
 * - Mobile: 1 column
 * - Tablet & Desktop: 2 columns
 */
export default function CategoryProducts({ products }: CategoryProductsProps) {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <CategoryProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
