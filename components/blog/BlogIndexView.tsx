import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brandFont, INK } from "@/lib/brand";
import { blogDetails } from "@/data/blogDetails";
import Halftone from "@/components/Halftone";
import InkStripe from "@/components/InkStripe";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import ClosingCta from "@/components/site/ClosingCta";

/**
 * Blog list. Shows only the full articles (data/blogDetails.ts). The other
 * listed posts share one template text and stay unlisted (and noindex) until
 * real articles are written for them.
 */
export default function BlogIndexView() {
  const [featured, ...rest] = blogDetails;

  return (
    <main className={`${brandFont.className} bg-white text-neutral-900`}>
      <section className="relative overflow-hidden bg-[#FAF8F5]">
        <Halftone color={INK.yellow} className="-right-24 -top-24 hidden h-[26rem] w-[26rem] sm:block" opacity={0.35} />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-6 sm:pb-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div className="mt-8 max-w-3xl sm:mt-12">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              <InkStripe className="h-1.5 w-10" />
              Blog
            </p>
            <h1 className="mt-5 text-[2.3rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Printing &amp; packaging guides
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Practical advice on packaging, printing materials and branding for shops and online brands.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5">
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-3xl bg-[#FAF8F5] lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={featured.heroImage}
                    alt={featured.title}
                    fill
                    preload
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
                    Latest · {featured.category}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-600">{featured.excerpt}</p>
                  <p className="mt-6 inline-flex items-center gap-2 font-medium">
                    Read the article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
                  <p className="mt-4 text-sm text-neutral-500">
                    {featured.publishDate} · {featured.readingTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <ul className={`mt-10 grid gap-8 sm:grid-cols-2 ${rest.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {rest.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={i * 90} className="h-full">
                    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        {post.category} · {post.readingTime}
                      </p>
                      <h3 className="mt-1 flex items-start justify-between gap-3 text-xl font-semibold leading-snug">
                        {post.title}
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:rotate-45 group-hover:text-neutral-900" />
                      </h3>
                      <p className="mt-2 line-clamp-3 leading-relaxed text-neutral-600">{post.excerpt}</p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
