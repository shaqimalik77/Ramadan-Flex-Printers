"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingWhatsApp from "@/components/FloatingWhatsapp";
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
  // dev/work only (not merged to main until launch): category and product
  // pages are already redesigned, so they get the new header and footer too.
  return (
    pathname === PREVIEW_PATH ||
    pathname.startsWith("/categories/") ||
    pathname.startsWith("/products/")
  );
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

/** Product pages have their own pinned quote bar on phones, so skip the bubble there. */
export function FloatingWhatsAppSwitch() {
  const pathname = usePathname() ?? "";
  return pathname.startsWith("/products/") ? null : <FloatingWhatsApp />;
}
