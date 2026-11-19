"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades and lifts its content in when it scrolls into view.
 *
 * Content is fully visible in the server HTML (good for SEO and if JS fails).
 * Only blocks that start below the fold are hidden on mount. A block is
 * revealed as soon as its top passes the lower part of the screen, which also
 * covers jumps (End key, anchor links) that skip past it. Does nothing for
 * visitors who prefer reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Extra delay in ms, e.g. to stagger items in a grid. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reached = () => el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (reached()) return;

    el.dataset.reveal = "hidden";
    let frame = 0;
    const check = () => {
      frame = 0;
      if (reached()) {
        el.dataset.reveal = "shown";
        stop();
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return stop;
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out data-[reveal=hidden]:translate-y-6 data-[reveal=hidden]:opacity-0 ${className}`}
    >
      {children}
    </div>
  );
}
