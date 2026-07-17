"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Clock,
  Phone,
  User,
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  FileText,
  Send,
  Tag,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

/* ------------------------------------------------------------------ */
/*  Config — edit these to fit your business, no markup changes needed */
/* ------------------------------------------------------------------ */

const META = {
  location: "Lahore Valencia Town A Block",
  hours: "11:00 AM - 7:00 PM",
  phone: "0301 7413377",
};

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// Map all navigation items to existing dynamic pages or fallbacks to prevent 404
const NAV_ITEMS: NavItem[] = [
  {
    label: "Bundles",
    href: "/categories/promotional-products",
    children: [
      { label: "Mini Startup Packaging Bundle", href: "/categories/ecommerce-boxes" },
      { label: "Jewelry Packaging Bundle", href: "/categories/jewellery-cards" },
      { label: "Clothing Packaging Bundle", href: "/categories/fabric-tags" },
      { label: "Clothing Bulk Packaging Bundle", href: "/categories/ziplock-frosted-bags" },
    ],
  },
  {
    label: "All",
    href: "/categories",
    children: [
      { label: "Keychains", href: "/categories/promotional-products" },
      { label: "Mugs", href: "/categories/mugs" },
      { label: "Notebooks", href: "/categories/promotional-products" },
      { label: "Pens", href: "/categories/promotional-products" },
      { label: "Water Bottles", href: "/categories/promotional-products" },
      { label: "Stickers", href: "/categories/stickers" },
      { label: "Label & Hang Tags", href: "/categories/label-hang-tags" },
      { label: "Thankyou Cards", href: "/categories/thank-you-cards" },
      { label: "Butter Paper", href: "/categories/butter-paper" },
      { label: "Shirts", href: "/categories/custom-t-shirts" },
      { label: "Polaroids", href: "/categories/polaroids" },
      { label: "Cosmetic Boxes", href: "/categories/ecommerce-boxes" },
      { label: "Gift Bags", href: "/categories/ecommerce-boxes" },
      { label: "Shopping Bags", href: "/categories/ecommerce-boxes" },
      { label: "Drawer Hard Box", href: "/categories/hard-drawer-boxes" },
      { label: "Standup Pouches", href: "/categories/stand-up-pouches" },
      { label: "Ziplock Frosted Bags", href: "/categories/ziplock-frosted-bags" },
      { label: "Courier Flyer Bags", href: "/categories/courier-flyer-poly-bags" },
      { label: "Business Cards", href: "/categories/business-cards" },
      { label: "Jewellery Cards", href: "/categories/jewellery-cards" },
      { label: "Fabric Tags", href: "/categories/fabric-tags" },
      { label: "Wedding Cards", href: "/categories/wedding-cards" },
    ],
  },
  { label: "Wedding Specials", href: "/categories/wedding-cards" },
  { label: "Clothing Packaging", href: "/categories/ziplock-frosted-bags" },
  { label: "Office Stationery", href: "/categories/business-cards" },
  { label: "Corporate Giveaways", href: "/categories/promotional-products" },
  { label: "Stickers", href: "/categories/stickers" },
  { label: "Label & Hang Tags", href: "/categories/label-hang-tags" },
  { label: "Packaging", href: "/categories/ecommerce-boxes" },
  { label: "How to Order", href: "/contact" },
];

const CART_COUNT = 0;

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null
  );
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [guideOpen, setGuideOpen] = useState(false);

  // Drives the shrink-on-scroll effect. Sticky (not fixed) keeps the
  // header in normal document flow, so Hero always starts right below
  // it and shrinking never overlaps page content.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close Modals on Escape key press, and disable body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAuthModalOpen(false);
        setGuideOpen(false);
      }
    };
    if (authModalOpen || guideOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [authModalOpen, guideOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setAuthModalOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-[9999] w-full border-b border-[#ECECEC]/30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-md"
          : "bg-white shadow-none"
      }`}
    >
      {/* ---------------------------------------------------------- */}
      {/* Row 1 — logo, search, meta, login, cart (~60px)             */}
      {/* ---------------------------------------------------------- */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 ease-in-out md:gap-4 lg:px-8 ${
          isScrolled ? "h-[52px]" : "h-[60px]"
        }`}
      >
        {/* Logo — fixed height, auto width */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className={`flex shrink-0 items-center self-center origin-left transition-all duration-300 ease-in-out hover:opacity-80 ${
            isScrolled ? "scale-90" : "scale-100"
          }`}
        >
          <Image
            src="/images/logo/logo.png"
            alt="Ramdan Flex Printers"
            width={703}
            height={401}
            className="h-[48px] sm:h-[58px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Search — hidden on small screens, shown from md up */}
        <div className="-ml-2 hidden min-w-0 flex-1 md:block">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[360px]">
            <input
              type="text"
              placeholder="Type here to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-full border border-[#ECECEC] bg-white/70 pl-4 pr-10 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-all duration-300 ease-in-out focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/20 ${
                isScrolled ? "h-9" : "h-10"
              }`}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-[#E41F26] flex items-center justify-center cursor-pointer"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>

        {/* Meta info — desktop only */}
        <div className="hidden shrink-0 items-center gap-5 whitespace-nowrap text-[13px] font-medium text-[#1A1A1A] lg:flex">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-[#E41F26]" />
            {META.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0 text-[#E41F26]" />
            {META.hours}
          </span>
          <a
            href={`tel:${META.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-[#E41F26]"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#E41F26]" />
            {META.phone}
          </a>
        </div>

        {/* Auth — desktop only */}
        <button
          onClick={() => setAuthModalOpen(true)}
          className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#1A1A1A] transition-colors hover:text-[#E41F26] lg:flex cursor-pointer"
        >
          <User className="h-4 w-4" />
          Login / Register
        </button>

        {/* How to Order — always visible */}
        <button
          onClick={() => setGuideOpen(true)}
          className="ml-auto flex shrink-0 items-center gap-1.5 rounded-md bg-[#E41F26] p-2 text-xs font-semibold text-white transition-transform hover:brightness-110 active:scale-95 sm:px-3 sm:py-2 sm:text-sm cursor-pointer"
          aria-label="How to Order Guide"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">How to Order</span>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-1 flex items-center justify-center rounded-md p-2 text-[#1A1A1A] transition-colors hover:bg-gray-100 lg:hidden w-10 h-10"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile-only search bar */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Type here to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-full border border-[#ECECEC] bg-white pl-4 pr-10 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/20"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 hover:text-[#E41F26] flex items-center justify-center cursor-pointer"
            aria-label="Submit search"
          >
            <Search className="h-4 w-4" aria-hidden />
          </button>
        </form>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Row 2 — single-line nav (~40px)                             */}
      {/* ---------------------------------------------------------- */}
      <nav className="hidden border-t border-[#ECECEC] bg-white lg:block">
        <ul
          className={`mx-auto flex max-w-7xl flex-nowrap items-center overflow-visible whitespace-nowrap px-4 text-sm font-semibold text-[#1A1A1A] transition-all duration-300 ease-in-out lg:px-8 ${
            isScrolled ? "h-9 gap-x-4 xl:gap-x-5" : "h-10 gap-x-5 xl:gap-x-7"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="group relative shrink-0 overflow-visible"
            >
              {item.label === "How to Order" ? (
                <button
                  onClick={() => setGuideOpen(true)}
                  className="relative flex items-center gap-1 py-1 transition-colors hover:text-[#E41F26] cursor-pointer font-semibold text-sm"
                >
                  {item.label}
                  {/* Small underline-grow animation on hover */}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#E41F26] transition-all duration-300 ease-in-out group-hover:w-full" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="relative flex items-center gap-1 py-1 transition-colors hover:text-[#E41F26]"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  )}
                  {/* Small underline-grow animation on hover */}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-[#E41F26] transition-all duration-300 ease-in-out group-hover:w-full" />
                </Link>
              )}

              {item.label === "Bundles" && (
                <div className="invisible absolute left-0 top-full z-50 w-[500px] translate-y-2 rounded-xl border border-[#ECECEC] bg-white p-6 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Startup Bundle
                      </h4>
                      <ul className="space-y-2.5">
                        <li>
                          <Link href="/categories/ecommerce-boxes" className="block text-xs font-medium text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">
                            Mini Startup Packaging Bundle
                          </Link>
                        </li>
                        <li>
                          <Link href="/categories/jewellery-cards" className="block text-xs font-medium text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">
                            Jewelry Packaging Bundle
                          </Link>
                        </li>
                        <li>
                          <Link href="/categories/fabric-tags" className="block text-xs font-medium text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">
                            Clothing Packaging Bundle
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Bulk Packaging
                      </h4>
                      <ul className="space-y-2.5">
                        <li>
                          <Link href="/categories/ziplock-frosted-bags" className="block text-xs font-medium text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">
                            Clothing Bulk Packaging Bundle
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {item.label === "All" && (
                <div className="invisible absolute left-0 top-full z-50 w-[920px] translate-y-2 rounded-xl border border-[#ECECEC] bg-white p-6 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-6 gap-6">
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Promotional
                      </h4>
                      <ul className="space-y-2">
                        <li><Link href="/categories/promotional-products" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Keychains</Link></li>
                        <li><Link href="/categories/mugs" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Mugs</Link></li>
                        <li><Link href="/categories/promotional-products" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Notebooks</Link></li>
                        <li><Link href="/categories/promotional-products" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Pens</Link></li>
                        <li><Link href="/categories/promotional-products" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Water Bottles</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Hot Selling
                      </h4>
                      <ul className="space-y-2">
                        <li><Link href="/categories/stickers" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Stickers</Link></li>
                        <li><Link href="/categories/label-hang-tags" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Label & Hang Tags</Link></li>
                        <li><Link href="/categories/thank-you-cards" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Thankyou Cards</Link></li>
                        <li><Link href="/categories/butter-paper" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Butter Paper</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Personalized
                      </h4>
                      <ul className="space-y-2">
                        <li><Link href="/categories/custom-t-shirts" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Shirts</Link></li>
                        <li><Link href="/categories/mugs" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Mugs</Link></li>
                        <li><Link href="/categories/polaroids" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Polaroids</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Boxes & Bags
                      </h4>
                      <ul className="space-y-2">
                        <li><Link href="/categories/ecommerce-boxes" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Cosmetic Boxes</Link></li>
                        <li><Link href="/categories/ecommerce-boxes" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Gift Bags</Link></li>
                        <li><Link href="/categories/ecommerce-boxes" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Shopping Bags</Link></li>
                        <li><Link href="/categories/hard-drawer-boxes" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Drawer Hard Box</Link></li>
                        <li><Link href="/categories/stand-up-pouches" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Standup Pouches</Link></li>
                        <li><Link href="/categories/ziplock-frosted-bags" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Ziplock Frosted Bags</Link></li>
                        <li><Link href="/categories/courier-flyer-poly-bags" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Courier Flyer Bags</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Cards & Tags
                      </h4>
                      <ul className="space-y-2">
                        <li><Link href="/categories/business-cards" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Business Cards</Link></li>
                        <li><Link href="/categories/jewellery-cards" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Jewellery Cards</Link></li>
                        <li><Link href="/categories/fabric-tags" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Fabric Tags</Link></li>
                        <li><Link href="/categories/label-hang-tags" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Label & Hang Tags</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2 mb-3">
                        Wedding
                      </h4>
                      <ul className="space-y-2">
                        <li><Link href="/categories/wedding-cards" className="block text-[11px] font-semibold text-neutral-500 hover:text-[#E41F26] uppercase transition-colors whitespace-normal">Wedding Cards</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------------------------------------------------------- */}
      {/* Mobile menu panel                                           */}
      {/* ---------------------------------------------------------- */}
      <div
        className={`overflow-hidden border-t border-[#ECECEC] bg-white transition-[max-height] duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col divide-y divide-[#ECECEC] px-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <div className="flex items-center justify-between py-3">
                {item.children ? (
                  <button
                    onClick={() =>
                      setOpenMobileSubmenu((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    className="text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#E41F26] text-left flex-1 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : item.label === "How to Order" ? (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setGuideOpen(true);
                    }}
                    className="text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#E41F26] flex-1 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-[#1A1A1A] transition-colors hover:text-[#E41F26] flex-1"
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && (
                  <button
                    onClick={() =>
                      setOpenMobileSubmenu((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    className="p-1 text-gray-400 cursor-pointer"
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openMobileSubmenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.children && openMobileSubmenu === item.label && (
                <ul className="mb-3 flex flex-col gap-1 pl-3">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-sm text-gray-500 transition-colors hover:text-[#E41F26]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li className="flex items-center gap-2 py-4 text-sm text-[#1A1A1A]">
            <MapPin className="h-4 w-4 text-[#E41F26]" />
            {META.location}
          </li>
          <li className="flex items-center gap-2 py-3 text-sm text-[#1A1A1A]">
            <Clock className="h-4 w-4 text-[#E41F26]" />
            {META.hours}
          </li>
          <li className="flex items-center gap-2 py-3 text-sm text-[#1A1A1A]">
            <Phone className="h-4 w-4 text-[#E41F26]" />
            <a href={`tel:${META.phone.replace(/\s/g, "")}`}>{META.phone}</a>
          </li>
          <li className="py-3">
            <button
              onClick={() => {
                setMobileOpen(false);
                setAuthModalOpen(true);
              }}
              className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] w-full text-left cursor-pointer"
            >
              <User className="h-4 w-4" />
              Login / Register
            </button>
          </li>
        </ul>
      </div>

      {/* Auth Modal */}
      {authModalOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-[headerFadeIn_0.2s_ease-out] cursor-pointer"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-2xl transition-all duration-300 sm:p-8 animate-[headerScaleIn_0.2s_ease-out] cursor-default">
            {/* Close Button */}
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Tabs */}
            <div className="mb-6 flex border-b border-[#ECECEC]">
              <button
                onClick={() => setAuthTab("login")}
                className={`flex-1 pb-3 text-center text-sm font-bold transition-all duration-200 cursor-pointer ${
                  authTab === "login"
                    ? "border-b-2 border-[#E41F26] text-[#E41F26]"
                    : "text-gray-500 hover:text-[#E41F26]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthTab("register")}
                className={`flex-1 pb-3 text-center text-sm font-bold transition-all duration-200 cursor-pointer ${
                  authTab === "register"
                    ? "border-b-2 border-[#E41F26] text-[#E41F26]"
                    : "text-gray-500 hover:text-[#E41F26]"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {authTab === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/10"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/10"
                />
              </div>

              {authTab === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-[#ECECEC] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/10"
                  />
                </div>
              )}

              {authTab === "login" ? (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#ECECEC] text-[#E41F26] focus:ring-[#E41F26]/20 cursor-pointer"
                    />
                    Remember Me
                  </label>
                  <button
                    type="button"
                    className="font-semibold text-[#E41F26] hover:underline cursor-pointer"
                    onClick={() => alert("Password reset link sent to your email.")}
                  >
                    Forgot Password?
                  </button>
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#E41F26] py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] shadow-md shadow-[#E41F26]/10 cursor-pointer"
              >
                {authTab === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* How to Order Guide Modal */}
      {guideOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setGuideOpen(false);
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-[headerFadeIn_0.2s_ease-out] cursor-pointer"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#ECECEC] bg-white p-6 shadow-2xl transition-all duration-300 sm:p-8 animate-[headerScaleIn_0.2s_ease-out] cursor-default">
            {/* Close Button */}
            <button
              onClick={() => setGuideOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close guide modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 flex items-center gap-3 border-b border-[#ECECEC]/70 pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E41F26]/10 text-[#E41F26]">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  How to Order
                </h3>
                <p className="text-xs text-gray-500">
                  Follow these 4 simple steps to place your order
                </p>
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-5">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold text-neutral-600">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
                    <FileText className="h-4 w-4 text-[#E41F26]" />
                    Select Product & Specs
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600 leading-relaxed">
                    Browse our products (Boxes, Stickers, Ribbons, Cards, etc.) and decide on your required size, material, and quantity.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold text-neutral-600">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
                    <Send className="h-4 w-4 text-[#E41F26]" />
                    Share Design via WhatsApp
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600 leading-relaxed">
                    Click any product&apos;s quote button to start a WhatsApp chat. Share your details, logo, or design files (PDF/AI/PNG).
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold text-neutral-600">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
                    <Tag className="h-4 w-4 text-[#E41F26]" />
                    Review Pricing & Quote
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600 leading-relaxed">
                    Our team will quickly calculate costs and reply with a custom price quote, payment details, and estimated time.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold text-neutral-600">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="flex items-center gap-1.5 text-sm font-bold text-[#1A1A1A]">
                    <Truck className="h-4 w-4 text-[#E41F26]" />
                    Confirm & Doorstep Delivery
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600 leading-relaxed">
                    Upon deposit confirmation, we process printing and ship the final goods safely to your address in Lahore or nationwide!
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-7">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}${
                  siteConfig.whatsappDefaultMessage
                    ? `?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`
                    : ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setGuideOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E41F26] py-3.5 text-sm font-bold text-white shadow-md shadow-[#E41F26]/10 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes headerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes headerScaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </header>
  );
}