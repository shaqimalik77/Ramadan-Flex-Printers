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
 * TEMPORARY while the redesign is being finished: new header and footer (and
 * no loading spinner) on redesigned pages; the old ones on the rest.
 */
function useIsPreview() {
  const pathname = usePathname() ?? "";
  // dev/work only (not merged to main until launch): every page except the
  // current homepage and the admin panel is already redesigned, so they get
  // the new header and footer. The homepage switches to NewHome at launch.
  if (pathname === PREVIEW_PATH) return true;
  return pathname !== "/" && !pathname.startsWith("/admin");
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
