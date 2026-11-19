"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import InkStripe from "@/components/InkStripe";
import { NAV } from "@/lib/navigation";
import ramdanLogo from "@/assets/brand/ramdan-logo.png";

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappDefaultMessage
)}`;

export default function NewHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu after navigating
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`${brandFont.className} sticky top-0 z-[9999] w-full bg-white`}>
      <InkStripe className="h-1 w-full" rounded={false} />

      <div className="border-b border-neutral-200">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label={`${siteConfig.name} home`}>
            <Image
              src={ramdanLogo}
              alt={siteConfig.name}
              preload
              unoptimized
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((group) => (
                <li key={group.label} className="group relative">
                  {group.href ? (
                    <Link
                      href={group.href}
                      className="block rounded-md px-3 py-2 text-[15px] text-neutral-700 transition-colors hover:text-neutral-950"
                    >
                      {group.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="flex items-center gap-1 rounded-md px-3 py-2 text-[15px] text-neutral-700 transition-colors group-hover:text-neutral-950 group-focus-within:text-neutral-950"
                        aria-haspopup="true"
                      >
                        {group.label}
                        <ChevronDown className="h-4 w-4 text-neutral-400 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                        <ul className="min-w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                          {group.items?.map((item) => (
                            <li key={item.href + item.label}>
                              <Link
                                href={item.href}
                                className="block rounded-lg px-3 py-2 text-[15px] text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="hidden items-center gap-2 text-[15px] text-neutral-700 hover:text-neutral-950 lg:flex"
            >
              <Phone className="h-4 w-4" style={{ color: INK.cyan }} />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 sm:px-4"
              style={{ background: INK.red }}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Get a quote</span>
              <span className="sm:hidden">Quote</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 text-neutral-800 hover:bg-neutral-100 xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {open && (
        <nav
          aria-label="Main"
          className="max-h-[calc(100vh-76px)] overflow-y-auto border-b border-neutral-200 bg-white xl:hidden"
        >
          <div className="mx-auto max-w-7xl px-5 py-4">
            {NAV.map((group) =>
              group.href ? (
                <Link
                  key={group.label}
                  href={group.href}
                  className="block border-b border-neutral-100 py-3.5 text-[17px] font-medium text-neutral-900"
                >
                  {group.label}
                </Link>
              ) : (
                <details key={group.label} className="group border-b border-neutral-100">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[17px] font-medium text-neutral-900">
                    {group.label}
                    <ChevronDown className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="grid grid-cols-2 gap-x-4 pb-4">
                    {group.items?.map((item) => (
                      <li key={item.href + item.label}>
                        <Link href={item.href} className="block py-2 text-[15px] text-neutral-600">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              )
            )}
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="mt-4 flex items-center gap-2 text-[15px] text-neutral-700"
            >
              <Phone className="h-4 w-4" style={{ color: INK.cyan }} />
              {siteConfig.phoneDisplay} · {siteConfig.hoursDays}, {siteConfig.hoursTime}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
