import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { brandFont, INK } from "@/lib/brand";
import { siteConfig } from "@/lib/siteConfig";
import type { BlogContentBlock, BlogDetail } from "@/data/blogDetails";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import QuoteButton from "@/components/site/QuoteButton";
import SectionTitle from "@/components/site/SectionTitle";
import ClosingCta from "@/components/site/ClosingCta";

function Block({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-12 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">{block.text}</h2>;
    case "paragraph":
      return <p className="mt-5 text-[17px] leading-8 text-neutral-700 sm:text-lg sm:leading-8">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[17px] leading-8 text-neutral-700">
              <span className="mt-3 h-1.5 w-4 shrink-0 rounded-full" style={{ background: INK.magenta }} aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
            <Image src={block.src} alt={block.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          {block.alt && <figcaption className="mt-3 text-center text-sm text-neutral-500">{block.alt}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

/**
 * Blog article page. The byline is the business itself: the old author
 * names matched the made-up "team" and can't be verified.
 */
export default function BlogPostView({ post, related }: { post: BlogDetail; related: BlogDetail[] }) {
  // Don't repeat the hero photo if the article body starts with the same image.
  const blocks = post.content.filter((b, i) => !(b.type === "image" && i < 4 && b.src === post.heroImage));

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      {/* Header */}
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.cyan} className="-right-24 -top-24 hidden h-[24rem] w-[24rem] sm:block" opacity={0.3} />
        <div className="relative mx-auto max-w-4xl px-5 pb-10 pt-6 sm:pb-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
          <p className="mt-10 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            <InkStripe className="h-1.5 w-10" />
            {post.category}
          </p>
          <h1 className="mt-5 text-[2.2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600 sm:text-xl">{post.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
            <span className="font-medium text-neutral-800">By {siteConfig.name}</span>
            <span>{post.publishDate}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readingTime}
            </span>
          </p>
        </div>
      </section>

      {/* Hero photo */}
      <div className="mx-auto -mt-2 max-w-5xl px-5 pt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100 shadow-xl">
          <Image src={post.heroImage} alt={post.title} fill preload sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-5 pb-6 pt-6">
        {blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}

        {/* Inline call to action */}
        <div className="mt-14 rounded-2xl bg-[#FAF8F5] p-6 sm:p-8">
          <InkStripe className="h-1.5 w-10" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Need this printed?</h2>
          <p className="mt-2 text-neutral-600">
            Send us your idea on WhatsApp. We&apos;ll reply with the price, timing and a free digital proof.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <QuoteButton message={`Hi, I read "${post.title}" and I'd like a quote.`} />
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-base font-medium hover:border-neutral-900"
            >
              Browse products
            </Link>
          </div>
        </div>
      </article>

      {/* More articles */}
      {related.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5">
            <SectionTitle title="More to read" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <li key={r.slug}>
                  <Reveal delay={i * 90} className="h-full">
                    <Link href={`/blog/${r.slug}`} className="group flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
                        <Image
                          src={r.heroImage}
                          alt={r.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        {r.category} · {r.readingTime}
                      </p>
                      <h3 className="mt-1 flex items-start justify-between gap-3 text-lg font-semibold leading-snug">
                        {r.title}
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:rotate-45 group-hover:text-neutral-900" />
                      </h3>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ClosingCta />
    </main>
  );
}
