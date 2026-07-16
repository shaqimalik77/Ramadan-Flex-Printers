"use client";

import Link from "next/link";
import { ShoppingBag, ChevronRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function CartPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to place an order for custom printing and packaging."
  )}`;

  return (
    <main className="bg-neutral-50 min-h-[75vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-lg mb-8 text-sm text-neutral-500">
        <ol className="flex items-center gap-1.5 justify-center">
          <li>
            <Link href="/" className="hover:text-[#E41F26] transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Cart</span>
          </li>
        </ol>
      </nav>

      {/* Cart Container */}
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-lg">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-[#E41F26]" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mb-2">
          Your Cart is Empty
        </h1>
        
        <p className="text-sm text-neutral-500 max-w-xs mx-auto mb-8 leading-relaxed">
          We print everything on-demand based on custom requirements. Add products to get a quote, or chat with us directly.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#E41F26] py-3.5 text-sm font-bold text-white transition hover:brightness-110 active:scale-[0.98] shadow-sm shadow-[#E41F26]/10"
          >
            Browse Products
          </Link>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-green-600 bg-white py-3.5 text-sm font-bold text-green-600 transition hover:bg-green-50 active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Order directly on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
