import type { Category } from "@/data/categoryProducts";

interface CategoryHeroProps {
  category: Category;
}

/**
 * Renders the category title and the long-form SEO description.
 * Kept as a plain server component — no client state needed here.
 */
export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="bg-white border-b border-neutral-100">
      <div className="mx-auto max-w-5xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E41F26]">
          Premium Custom Printing & Packaging
        </span>
        
        <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {category.name}
        </h1>

        <div className="mt-6 space-y-4 text-neutral-600">
          {category.seoDescription.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "text-[15px] sm:text-base leading-relaxed text-neutral-800 font-medium"
                  : "text-xs sm:text-sm leading-relaxed text-neutral-500"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
