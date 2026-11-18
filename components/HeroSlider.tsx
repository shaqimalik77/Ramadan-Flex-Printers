"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Pause, Play, Star } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { INK } from "@/lib/brand";
import InkStripe from "@/components/InkStripe";
import CropMarks from "@/components/CropMarks";
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/googleReviews";
// Photo parts cropped from the old homepage banners (no banner text on them).
// Imported, not served from /public, because new /public files 404 on Hostinger.
import neonPhoto from "@/assets/hero/neon-signs.jpg";
import boardsPhoto from "@/assets/hero/3d-boards.jpg";
import flexPhoto from "@/assets/hero/flex-printing.jpg";
import offsetPhoto from "@/assets/hero/offset-printing.jpg";

/** How long each slide stays before moving on, in ms. */
const DURATION = 6000;

interface Slide {
  /** Short name for the service tab. */
  tab: string;
  eyebrow: string;
  title: string;
  /** Word(s) at the end of the title that get the yellow underline. */
  highlight: string;
  text: string;
  image: string | StaticImageData;
  alt: string;
  /** Pre-filled WhatsApp message for this slide's button. */
  whatsappMessage: string;
  link: { label: string; href: string };
  /** The two ink colours behind the photo; the first also colours the tab. */
  inks: [string, string];
}

const slides: Slide[] = [
  {
    tab: "All printing",
    eyebrow: "Printing & packaging · Lahore",
    title: "Print that makes your brand",
    highlight: "stand out",
    text: "Custom boxes, stickers, business cards, tags, wedding cards, neon signs and flex printing. Made in Lahore, delivered across Pakistan.",
    image: "/images/categories/promotional-products.png",
    alt: "Branded business cards, bags, mugs, stickers and pouches printed by Ramdan Flex Printers",
    whatsappMessage: siteConfig.whatsappDefaultMessage,
    link: { label: "Browse products", href: "/categories" },
    inks: [INK.cyan, INK.magenta],
  },
  {
    tab: "T-shirts",
    eyebrow: "Custom T-shirts",
    title: "Your logo on",
    highlight: "quality T-shirts",
    text: "Printed and embroidered shirts for brands, teams, events and uniforms. Bulk orders welcome.",
    image: "/images/categories/custom-tshirts.png",
    alt: "White T-shirt printed with the Ramdan Flex Printers logo",
    whatsappMessage: "Hi, I'd like a quote for custom T-shirts.",
    link: { label: "View T-shirts", href: "/categories/custom-t-shirts" },
    inks: [INK.magenta, INK.yellow],
  },
  {
    tab: "Neon signs",
    eyebrow: "LED neon signs",
    title: "Neon signs that light up",
    highlight: "your brand",
    text: "Custom LED neon in any text, logo or colour, for shops, cafes, weddings and events.",
    image: neonPhoto,
    alt: "Custom LED neon signs in many colours",
    whatsappMessage: "Hi, I'd like a quote for a custom neon sign.",
    link: { label: "View neon signs", href: "/categories/neon-signs" },
    inks: [INK.yellow, INK.cyan],
  },
  {
    tab: "3D boards",
    eyebrow: "3D boards & signs",
    title: "3D signboards for your",
    highlight: "shop front",
    text: "Backlit acrylic and metal letter signs, made to order for shops, gyms, cafes and offices.",
    image: boardsPhoto,
    alt: "Backlit 3D signboards for a boutique, a gym, a kids play zone and a coffee lounge",
    whatsappMessage: "Hi, I'd like a quote for a 3D signboard.",
    link: { label: "View 3D boards", href: "/categories/3d-boards" },
    inks: [INK.cyan, INK.magenta],
  },
  {
    tab: "Flex printing",
    eyebrow: "Flex printing",
    title: "Flex banners and boards,",
    highlight: "printed fast",
    text: "Outdoor banners, shop boards, event backdrops and roll-up stands in vivid colour.",
    image: flexPhoto,
    alt: "Wide-format flex printing machine printing colourful banners",
    whatsappMessage: "Hi, I'd like a quote for flex printing.",
    link: { label: "View flex printing", href: "/categories/flex-designs" },
    inks: [INK.magenta, INK.yellow],
  },
  {
    tab: "Offset printing",
    eyebrow: "Offset printing",
    title: "Flyers, brochures and",
    highlight: "business stationery",
    text: "Sharp offset printing for flyers, cash memos, brochures, catalogs and business cards.",
    image: offsetPhoto,
    alt: "Offset printing press with printed flyers, cash memos, brochures and catalogs",
    whatsappMessage: "Hi, I'd like a quote for offset printing.",
    link: { label: "View business cards", href: "/categories/business-cards" },
    inks: [INK.yellow, INK.cyan],
  },
];

const waLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  /** Only the visitor's pause button stops autoplay (not hover or clicks). */
  const [paused, setPaused] = useState(false);
  const pillRow = useRef<HTMLDivElement>(null);
  const pills = useRef<(HTMLButtonElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;

  const go = useCallback((i: number) => setActive((i + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  // Respect the visitor's "reduce motion" setting: no autoplay.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    const id = window.setTimeout(update, 0);
    return () => {
      mq.removeEventListener("change", update);
      window.clearTimeout(id);
    };
  }, []);

  const autoplaying = !paused && !reducedMotion;

  // Autoplay timer that can pause and resume where it left off, so it stays in
  // step with the CSS progress line (which pauses with animation-play-state).
  const remaining = useRef(DURATION);
  const startedAt = useRef(0);

  // A new slide always gets the full duration. (Declared before the timer
  // effect so it runs after the old timer's cleanup and before the new timer.)
  useEffect(() => {
    remaining.current = DURATION;
  }, [active]);

  useEffect(() => {
    if (!autoplaying) return;
    startedAt.current = Date.now();
    const id = window.setTimeout(next, remaining.current);
    return () => {
      window.clearTimeout(id);
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    };
  }, [active, autoplaying, next]);

  // Keep the active service pill visible in the scrollable row (mobile),
  // scrolling only that row, never the page.
  useEffect(() => {
    const row = pillRow.current;
    const pill = pills.current[active];
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: pill.offsetLeft - row.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const progressStyle: React.CSSProperties = reducedMotion
    ? { transform: "scaleX(1)" }
    : {
        animation: `hero-progress ${DURATION}ms linear forwards`,
        animationPlayState: autoplaying ? "running" : "paused",
      };

  return (
    <section
      className="relative overflow-hidden bg-[#FAF8F5]"
      aria-roledescription="carousel"
      aria-label="Our services"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      <style>{`
        @keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>

      {/* All slides sit in the same grid cell and cross-fade. */}
      <div className="grid">
        {slides.map((slide, i) => {
          const isActive = i === active;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.tab}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out ${
                isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${slide.tab}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-4 pt-8 sm:pt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-8 lg:pt-16">
                {/* Text: rises in when the slide becomes active */}
                <div
                  className={`transition-all duration-700 ease-out ${
                    isActive ? "translate-y-0 opacity-100 delay-150" : "translate-y-4 opacity-0"
                  }`}
                >
                  <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                    <InkStripe className="h-1.5 w-10" />
                    {slide.eyebrow}
                  </p>
                  <Heading className="mt-4 text-[2.1rem] font-semibold sm:mt-5 leading-[1.08] tracking-tight sm:text-[3.4rem]">
                    {slide.title}{" "}
                    <span className="relative inline-block">
                      {slide.highlight}
                      <span
                        aria-hidden
                        className={`absolute -bottom-1 left-0 h-2 w-full origin-left rounded-full opacity-80 transition-transform duration-700 ease-out ${
                          isActive ? "scale-x-100 delay-500" : "scale-x-0"
                        }`}
                        style={{ background: INK.yellow }}
                      />
                    </span>
                    .
                  </Heading>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">{slide.text}</p>
                  <div className="mt-6 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:items-center sm:gap-5">
                    <a
                      href={waLink(slide.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
                      style={{ background: INK.red }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      Get a free quote on WhatsApp
                    </a>
                    <Link
                      href={slide.link.href}
                      className="inline-flex items-center gap-1.5 px-1 py-2 text-base font-medium text-neutral-800 hover:text-neutral-950 sm:py-3"
                    >
                      {slide.link.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <a
                    href={GOOGLE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-3 text-[15px] sm:mt-7 text-neutral-600 hover:text-neutral-950"
                  >
                    <span className="flex" aria-hidden>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                      ))}
                    </span>
                    <span>
                      <span className="font-medium text-neutral-900">{GOOGLE_RATING}</span> rating ·{" "}
                      <span className="underline decoration-neutral-300 underline-offset-4">
                        {GOOGLE_REVIEW_COUNT} Google reviews
                      </span>
                    </span>
                  </a>
                </div>

                {/* Photo framed like a print proof; gently zooms out when active */}
                <div className="relative mx-5 my-5 sm:mx-10 sm:my-6">
                  <span
                    aria-hidden
                    className="absolute -right-4 -top-4 h-full w-full rounded-2xl transition-transform duration-700"
                    style={{ background: slide.inks[0], opacity: 0.18 }}
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl"
                    style={{ background: slide.inks[1], opacity: 0.16 }}
                  />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      preload={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-[1600ms] ease-out ${
                        isActive ? "scale-100" : "scale-110"
                      }`}
                    />
                  </div>
                  <CropMarks />
                  {/* Previous / next on the photo's corner (bottom-left on phones,
                      away from the floating WhatsApp button) */}
                  <div className="absolute bottom-3 left-3 z-10 flex gap-2 sm:bottom-4 sm:left-auto sm:right-4">
                    <ArrowButton direction="prev" onClick={prev} />
                    <ArrowButton direction="next" onClick={next} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service pills (with progress) and a pause button */}
      <div className="relative z-20 mx-auto flex max-w-7xl items-center gap-3 px-5 pb-8 pt-2 lg:pb-12">
        <div
          ref={pillRow}
          className="-ml-5 flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 pl-5 pr-1 [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-28px),transparent)] [scrollbar-width:none] lg:ml-0 lg:[mask-image:none] lg:flex-wrap lg:overflow-visible lg:pl-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Choose a service"
        >
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <button
                key={slide.tab}
                ref={(el) => {
                  pills.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => go(i)}
                className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm transition-colors sm:text-[15px] ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900 hover:text-neutral-950"
                }`}
              >
                {isActive && (
                  <span
                    key={`run-${active}`}
                    aria-hidden
                    className="absolute inset-0 origin-left bg-white/15"
                    style={progressStyle}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: slide.inks[0] }}
                  />
                  {slide.tab}
                </span>
              </button>
            );
          })}
        </div>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:border-neutral-900"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        )}
      </div>
    </section>
  );
}

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-105 hover:bg-white"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
