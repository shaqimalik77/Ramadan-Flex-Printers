import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuoteButton, { quoteMessage } from "@/components/site/QuoteButton";
import { INK } from "@/lib/brand";

const ACCENTS = [INK.cyan, INK.magenta, "#E0A800", INK.key];

/**
 * Product card for category and product pages. Products with a detail page
 * link to it (plus a small quote button); others go straight to a WhatsApp
 * quote with the product name filled in.
 *
 * Without an `image` it renders as a text-only "option" card (used for the
 * many products that have no photo of their own, so the same category photo
 * isn't repeated on every card).
 */
export default function ProductCard({
  slug,
  title,
  description,
  image,
  hasDetails,
  index = 0,
}: {
  slug: string;
  title: string;
  description: string;
  image?: string;
  hasDetails: boolean;
  /** Position in the list; picks the accent colour of option cards. */
  index?: number;
}) {
  if (!image) {
    const accent = ACCENTS[index % ACCENTS.length];
    return (
      <article className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl">
        <span className="flex items-center gap-3">
          <span className="h-1.5 w-8 rounded-full" style={{ background: accent }} aria-hidden />
          <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-neutral-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-neutral-900">
          {hasDetails ? (
            <Link href={`/products/${slug}`} className="hover:underline hover:underline-offset-4">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-neutral-500">{description}</p>
        <div className="mt-5">
          {hasDetails ? (
            <Link
              href={`/products/${slug}`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              View details <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <QuoteButton
              label="Get a quote"
              message={quoteMessage(title)}
              variant="outline"
              size="sm"
              className="w-full group-hover:border-neutral-900"
            />
          )}
        </div>
      </article>
    );
  }

  const href = `/products/${slug}`;
  const photo = (
    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
    </div>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {hasDetails ? (
        <Link href={href} aria-label={`${title}: view details`}>
          {photo}
        </Link>
      ) : (
        photo
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-neutral-900">
          {hasDetails ? (
            <Link href={href} className="hover:underline hover:decoration-neutral-300 hover:underline-offset-4">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-neutral-500">{description}</p>
        <div className="mt-5 flex items-center gap-3">
          {hasDetails ? (
            <>
              <Link
                href={href}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                View details <ArrowRight className="h-4 w-4" />
              </Link>
              <QuoteButton label="Quote" message={quoteMessage(title)} variant="outline" size="sm" />
            </>
          ) : (
            <QuoteButton
              label="Get a quote"
              message={quoteMessage(title)}
              size="sm"
              className="flex-1"
            />
          )}
        </div>
      </div>
    </article>
  );
}
