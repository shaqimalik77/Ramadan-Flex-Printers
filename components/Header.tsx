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
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Config — edit these to fit your business, no markup changes needed */
/* ------------------------------------------------------------------ */

const META = {
  location: "Lahore Valencia Town A Block",
  hours: "11:00 AM - 7:00 PM",
  phone: "0331 1146549",
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
      { label: "Starter Bundle", href: "/categories/promotional-products" },
      { label: "Pro Bundle", href: "/categories/promotional-products" },
    ],
  },
  {
    label: "All",
    href: "/",
    children: [
      { label: "New Arrivals", href: "/" },
      { label: "Best Sellers", href: "/" },
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

  // Close Auth Modal on Escape key press, and disable body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAuthModalOpen(false);
      }
    };
    if (authModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [authModalOpen]);

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
      className={`sticky top-0 z-[9999] w-full border-b border-[#ECECEC] bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      {/* ---------------------------------------------------------- */}
      {/* Row 1 — logo, search, meta, login, cart (~60px)             */}
      {/* ---------------------------------------------------------- */}
      <div
        className={`mx-auto flex max-w-7xl items-center gap-3 px-4 transition-all duration-300 ease-in-out md:gap-4 lg:px-8 ${
          isScrolled ? "h-[52px]" : "h-[60px]"
        }`}
      >
        {/* Logo — fixed 58px height, width auto, aspect ratio preserved */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className={`flex shrink-0 items-center self-center origin-left transition-transform duration-300 ease-in-out hover:opacity-80 ${
            isScrolled ? "scale-90" : "scale-100"
          }`}
        >
          <Image
            src="/images/logo/logo.png"
            alt="Ramdan Flex Printers"
            width={703}
            height={401}
            className="h-[58px] w-auto object-contain"
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
              className={`w-full rounded-full border border-[#ECECEC] bg-white pl-4 pr-10 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none transition-all duration-300 ease-in-out focus:border-[#E41F26] focus:ring-2 focus:ring-[#E41F26]/20 ${
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

        {/* Cart — always visible */}
        <Link
          href="/cart"
          className="ml-auto flex shrink-0 items-center gap-2 rounded-md bg-[#E41F26] px-3 py-2 text-sm font-semibold text-white transition-transform hover:brightness-110 active:scale-95 md:ml-0"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart / Rs {CART_COUNT}
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-1 flex items-center justify-center rounded-md p-2 text-[#1A1A1A] transition-colors hover:bg-gray-100 lg:hidden"
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

              {item.children && (
                <ul className="invisible absolute left-0 top-full z-10 min-w-[180px] translate-y-1 rounded-md border border-[#ECECEC] bg-white py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="block px-4 py-2 text-xs font-medium text-[#1A1A1A] transition-colors hover:bg-gray-50 hover:text-[#E41F26]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
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