"use client";

import { usePathname } from "next/navigation";
import FloatingWhatsApp from "@/components/FloatingWhatsapp";

/** Product pages have their own pinned quote bar on phones, so skip the bubble there. */
export default function FloatingWhatsAppSwitch() {
  const pathname = usePathname() ?? "";
  return pathname.startsWith("/products/") ? null : <FloatingWhatsApp />;
}
