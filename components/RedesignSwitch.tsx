"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import NewHeader from "@/components/NewHeader";
import NewFooter from "@/components/NewFooter";
import { PREVIEW_PATH } from "@/lib/brand";

/**
 * TEMPORARY while the redesign is being reviewed: the new header and footer
 * (and no loading spinner) show only on the private preview page (PREVIEW_PATH). Every other
 * page keeps the current header, footer and spinner.
 */
function useIsPreview() {
  const pathname = usePathname() ?? "";
  return pathname === PREVIEW_PATH || pathname.startsWith(`${PREVIEW_PATH}/`);
}

/** Pages that already have a preview version under PREVIEW_PATH. */
const PREVIEWED = ["/categories", "/products"];

/**
 * Inside the client preview, links to pages that have a preview version
 * (e.g. "All products" → /categories) open that preview instead of the live
 * page, so the client can click around the new design.
 */
export function PreviewLinks() {
  const isPreview = useIsPreview();
  const router = useRouter();
  useEffect(() => {
    if (!isPreview) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      const href = a?.getAttribute("href");
      if (!href || a?.target === "_blank") return;
      const path = href.split(/[?#]/)[0];
      if (PREVIEWED.includes(path)) {
        e.preventDefault();
        router.push(`${PREVIEW_PATH}${href}`);
      } else if (href === "/") {
        e.preventDefault();
        router.push(PREVIEW_PATH);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [isPreview, router]);
  return null;
}

export function HeaderSwitch() {
  return useIsPreview() ? <NewHeader /> : <Header />;
}

export function FooterSwitch() {
  return useIsPreview() ? <NewFooter /> : <Footer />;
}

export function PreloaderSwitch() {
  return useIsPreview() ? null : <Preloader />;
}
