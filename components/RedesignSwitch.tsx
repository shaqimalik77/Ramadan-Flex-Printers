"use client";

import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  return pathname === PREVIEW_PATH;
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
