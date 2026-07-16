"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/productDetails";

interface ProductFAQProps {
  faq: FaqItem[];
}

export default function ProductFAQ({ faq }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-neutral-200 py-8 sm:py-10">
      <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
        Frequently Asked Questions
      </h2>

      <div className="mt-5 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-neutral-900 sm:px-6 sm:text-base"
              >
                <span>{item.question}</span>
                <span
                  className={`flex-shrink-0 text-xl leading-none text-neutral-400 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {isOpen && (
                <p className="px-4 pb-4 text-sm leading-relaxed text-neutral-600 sm:px-6 sm:text-[15px]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
