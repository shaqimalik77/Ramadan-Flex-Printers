"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 sm:p-8 lg:p-9">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Send Us a Message
      </h2>
      <p className="text-neutral-600 text-sm mb-7">
        Fill out the form below and our team will get back to you shortly.
      </p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-14 h-14 rounded-full bg-[#E31E24]/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#E31E24]" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
            Thank you!
          </h3>
          <p className="text-neutral-600 text-sm max-w-sm">
            Your message has been received. Our team will reach out to you
            soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Name <span className="text-[#E31E24]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 focus:border-[#E31E24] transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Email <span className="text-[#E31E24]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 focus:border-[#E31E24] transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Phone <span className="text-[#E31E24]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="03XX XXXXXXX"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 focus:border-[#E31E24] transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-neutral-800 mb-1.5"
              >
                Company{" "}
                <span className="text-neutral-400 font-normal">
                  (optional)
                </span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Your company name"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 focus:border-[#E31E24] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-neutral-800 mb-1.5"
            >
              Subject <span className="text-[#E31E24]">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What is this regarding?"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 focus:border-[#E31E24] transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-800 mb-1.5"
            >
              Message <span className="text-[#E31E24]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your printing requirements..."
              className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 focus:border-[#E31E24] transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#E31E24] hover:bg-[#c81920] text-white font-semibold text-base py-4 px-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
