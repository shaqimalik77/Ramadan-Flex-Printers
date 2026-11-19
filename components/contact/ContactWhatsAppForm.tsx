"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { INK } from "@/lib/brand";
import { whatsappLink } from "@/components/site/QuoteButton";

/**
 * Contact form that sends through WhatsApp: it builds a ready message from
 * what the visitor typed and opens WhatsApp. (The old form only showed
 * "message received" without sending anything.)
 */
export default function ContactWhatsAppForm({ categories }: { categories: string[] }) {
  const [name, setName] = useState("");
  const [need, setNeed] = useState("");
  const [quantity, setQuantity] = useState("");
  const [details, setDetails] = useState("");

  const message = [
    name.trim() ? `Hi, I'm ${name.trim()}.` : "Hi,",
    need ? `I'd like a quote for ${need.toLowerCase()}.` : "I'd like a quote.",
    quantity.trim() ? `Quantity: ${quantity.trim()}` : "",
    details.trim() ? `Details: ${details.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const field =
    "mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-base outline-none placeholder:text-neutral-400 focus:border-neutral-900";

  return (
    <form
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <h2 className="text-2xl font-semibold tracking-tight">Tell us what you need</h2>
      <p className="mt-2 text-neutral-500">
        Fill this in and press send. WhatsApp opens with your message ready; just tap send there.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-neutral-800">
          Your name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ali" className={field} />
        </label>
        <label className="block text-sm font-medium text-neutral-800">
          What do you need?
          <select value={need} onChange={(e) => setNeed(e.target.value)} className={field}>
            <option value="">Choose a product</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-neutral-800 sm:col-span-2">
          Quantity <span className="font-normal text-neutral-500">(optional)</span>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 500 boxes"
            className={field}
          />
        </label>
        <label className="block text-sm font-medium text-neutral-800 sm:col-span-2">
          Details <span className="font-normal text-neutral-500">(optional)</span>
          <textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Size, colours, your logo or text, deadline, delivery city…"
            className={`${field} resize-none`}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: INK.red }}
      >
        <Send className="h-5 w-5" /> Send on WhatsApp
      </button>
    </form>
  );
}
