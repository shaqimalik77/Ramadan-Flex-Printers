import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { brandFont, INK } from "@/lib/brand";
import { NAV } from "@/lib/navigation";
import { type Category, categoryProducts, getCategoryBySlug, getCategoryImage } from "@/data/categoryProducts";
import { getCategorySeo } from "@/data/categorySeo";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import QuoteButton from "@/components/site/QuoteButton";
import Benefits from "@/components/site/Benefits";
import HowToOrder from "@/components/site/HowToOrder";
import ClosingCta from "@/components/site/ClosingCta";

const GROUP_INKS = [INK.cyan, INK.magenta, "#E0A800", INK.key];

/** The menu groups, with Stickers folded into the cards and tags group. */
function groups(): { title: string; categories: Category[] }[] {
  const out = NAV.filter((g) => g.items?.length).map((g) => ({
    title: g.label === "Cards & Tags" ? "Cards, tags & stickers" : g.label,
    categories: (g.items ?? [])
      .map((i) => getCategoryBySlug(i.href.replace("/categories/", "")))
      .filter((c): c is Category => Boolean(c)),
  }));
  const stickers = getCategoryBySlug("stickers");
  const cards = out.find((g) => g.title.startsWith("Cards"));
  if (stickers && cards) cards.categories.splice(1, 0, stickers);
  // Any category missing from the menu still gets listed.
  const listed = new Set(out.flatMap((g) => g.categories.map((c) => c.slug)));
  const rest = categoryProducts.filter((c) => !listed.has(c.slug));
  if (rest.length) out.push({ title: "More", categories: rest });
  return out;
}

/** All products overview (/categories): every category, grouped. */
export default function CategoriesIndexView() {
  const productCount = categoryProducts.reduce((n, c) => n + c.products.length, 0);
  const all = groups();

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.cyan} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.3} />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-6 sm:pb-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All products" }]} />
          <div className="mt-8 max-w-3xl sm:mt-12">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              <InkStripe className="h-1.5 w-10" />
              {categoryProducts.length} categories · {productCount} products
            </p>
            <h1 className="mt-5 text-[2.3rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Everything we print
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Packaging, cards, tags, stickers, apparel, gifts, signs and flex printing. Made in Lahore,
              delivered across Pakistan.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-base font-medium text-white hover:bg-neutral-700"
              >
                <Search className="h-5 w-5" /> Search all {productCount} products
              </Link>
              <QuoteButton label="Ask on WhatsApp" variant="outline" />
            </div>
          </div>
          {/* Jump links to the groups */}
          <ul className="mt-10 flex flex-wrap gap-2">
            {all.map((g, i) => (
              <li key={g.title}>
                <a
                  href={`#group-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:border-neutral-900 hover:text-neutral-950"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: GROUP_INKS[i % GROUP_INKS.length] }} />
                  {g.title}
                  <span className="text-neutral-400">{g.categories.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Groups */}
      {all.map((g, gi) => (
        <section key={g.title} id={`group-${gi}`} className="scroll-mt-24 border-t border-neutral-200 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal className="flex items-end justify-between gap-4">
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                <span className="h-2 w-8 rounded-full" style={{ background: GROUP_INKS[gi % GROUP_INKS.length] }} />
                {g.title}
              </h2>
              <span className="text-sm text-neutral-500">{g.categories.length} categories</span>
            </Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {g.categories.map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={(i % 4) * 80} className="h-full">
                    <Link href={`/categories/${c.slug}`} className="group flex h-full flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                        <Image
                          src={getCategoryImage(c.slug)}
                          alt={c.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-800 backdrop-blur">
                          {c.products.length} products
                        </span>
                      </div>
                      <p className="mt-3 flex items-center justify-between gap-2 text-base font-semibold sm:text-lg">
                        {c.name}
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:rotate-45 group-hover:text-neutral-900" />
                      </p>
                      <p className="mt-1 line-clamp-2 hidden text-sm leading-relaxed text-neutral-500 sm:block">
                        {getCategorySeo(c.slug, c.name).description}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <Benefits headingLevel="h3" />
      <HowToOrder />
      <ClosingCta title="Can't find what you need?" />
    </main>
  );
}
