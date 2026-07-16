import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-b from-neutral-50 to-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-neutral-500">
            <li>
              <Link
                href="/"
                className="hover:text-[#E31E24] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-900 font-medium">Contact</span>
            </li>
          </ol>
        </nav>

        {/* Title */}
        <div className="max-w-2xl">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-[#E31E24] uppercase mb-3">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            We&apos;re here to help with all your printing and branding
            requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
