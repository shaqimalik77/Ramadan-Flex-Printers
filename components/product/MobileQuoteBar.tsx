"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { INK } from "@/lib/brand";

/**
 * Phones only: a bar pinned to the bottom of the screen once the visitor has
 * scrolled past the quote builder, with a button that brings them back to it.
 */
export default function MobileQuoteBar({ title }: { title: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById("quote-builder");
    if (!target) return;
    let frame = 0;
    // Show once the builder has scrolled up out of view. Checked on every
    // scroll (throttled to animation frames), so fast flings and jumps that
    // skip straight past it are caught too.
    const check = () => {
      frame = 0;
      setShow(target.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-[9998] border-t border-neutral-200 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 truncate text-[15px] font-medium">{title}</p>
        <a
          href="#quote-builder"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white"
          style={{ background: INK.red }}
        >
          <MessageCircle className="h-4 w-4" /> Get a quote
        </a>
      </div>
    </div>
  );
}
