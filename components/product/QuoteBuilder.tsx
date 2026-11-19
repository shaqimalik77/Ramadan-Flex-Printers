"use client";

import { useMemo, useState } from "react";
import { FileCheck, Minus, Plus, Send } from "lucide-react";
import { INK } from "@/lib/brand";
import { whatsappLink } from "@/components/site/QuoteButton";

/** Specification keys that describe a choice the customer can make. */
const CHOICE_KEYS = [
  "Width Options",
  "Roll Length",
  "Colours Available",
  "Foil Colours",
  "Print Sides",
  "Corner Style",
  "Finish Options",
  "Cut Style",
];

/** Short labels for the choices (and for the WhatsApp message). */
const LABELS: Record<string, string> = {
  "Width Options": "Width",
  "Roll Length": "Roll length",
  "Colours Available": "Colour",
  "Foil Colours": "Foil colour",
  "Print Sides": "Print sides",
  "Corner Style": "Corners",
  "Finish Options": "Finish",
  "Cut Style": "Cut",
};

/** "1 inch / 1.5 inch / 2 inch", "Gold, Silver, Rose Gold", "Single or Double Sided" → options. */
function splitOptions(value: string): string[] {
  const parts = value
    .split(/\s*\/\s*|\s*,\s*|\s+or\s+/i)
    .map((s) => s.trim())
    .filter(Boolean);
  // "Single or Double Sided" → "Single sided", "Double sided"
  const last = parts[parts.length - 1]?.split(" ") ?? [];
  if (parts.length === 2 && last.length === 2 && !parts[0].includes(" ")) {
    return [`${parts[0]} ${last[1].toLowerCase()}`, `${last[0]} ${last[1].toLowerCase()}`];
  }
  return parts;
}

/** "100 cards" → { amount: 100, unit: "cards" } */
function parseMinimum(text?: string): { amount: number; unit: string } {
  const m = text?.match(/(\d+)\s*(.*)/);
  if (!m) return { amount: 1, unit: "" };
  return { amount: Math.max(1, Number(m[1])), unit: m[2].trim() };
}

/** Plural-aware unit: 1 roll, 5 rolls; 100 cards. */
function unitFor(n: number, unit: string): string {
  if (!unit) return "";
  const singular = unit.replace(/s$/, "");
  return n === 1 ? singular : singular.endsWith("s") ? singular : `${singular}s`;
}

/**
 * "Build your quote": pick from the product's real options, set a quantity
 * (starting at the minimum order) and send a ready-made WhatsApp message.
 */
export default function QuoteBuilder({
  title,
  specifications,
}: {
  title: string;
  specifications: Record<string, string>;
}) {
  const groups = useMemo(
    () =>
      CHOICE_KEYS.flatMap((key) => {
        const value = specifications[key];
        if (!value) return [];
        const options = splitOptions(value);
        return options.length >= 2 ? [{ key, label: LABELS[key] ?? key, options }] : [];
      }),
    [specifications]
  );
  const minimum = parseMinimum(specifications["Minimum Order"]);
  const step = minimum.amount >= 50 ? minimum.amount : 1;

  const [choices, setChoices] = useState<Record<string, string>>(() =>
    Object.fromEntries(groups.map((g) => [g.key, g.options[0]]))
  );
  const [qty, setQty] = useState(minimum.amount);
  const [note, setNote] = useState("");

  const message = [
    `Hi, I'd like a quote for ${title}.`,
    ...groups.map((g) => `${g.label}: ${choices[g.key]}`),
    `Quantity: ${qty} ${unitFor(qty, minimum.unit)}`.trim(),
    note.trim() ? `Note: ${note.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      <h2 className="text-lg font-semibold">Build your quote</h2>
      <p className="mt-1 text-sm text-neutral-500">Choose your options. We&apos;ll reply on WhatsApp with the price.</p>

      <div className="mt-5 space-y-5">
        {groups.map((g) => (
          <fieldset key={g.key}>
            <legend className="text-sm font-medium text-neutral-800">
              {g.label}: <span className="font-normal text-neutral-500">{choices[g.key]}</span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {g.options.map((opt) => {
                const selected = choices[g.key] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setChoices((c) => ({ ...c, [g.key]: opt }))}
                    className={`rounded-lg border px-3.5 py-2 text-sm transition ${
                      selected
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div>
          <label htmlFor="qty" className="text-sm font-medium text-neutral-800">
            Quantity
            {minimum.unit && (
              <span className="font-normal text-neutral-500">
                {" "}
                · minimum {minimum.amount} {unitFor(minimum.amount, minimum.unit)}
              </span>
            )}
          </label>
          <div className="mt-2 flex w-fit items-center rounded-lg border border-neutral-300">
            <button
              type="button"
              aria-label="Less"
              onClick={() => setQty((q) => Math.max(minimum.amount, q - step))}
              className="flex h-10 w-10 items-center justify-center text-neutral-700 hover:text-neutral-950 disabled:opacity-30"
              disabled={qty <= minimum.amount}
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              id="qty"
              type="number"
              inputMode="numeric"
              min={minimum.amount}
              step={step}
              value={qty}
              onChange={(e) => setQty(Math.max(minimum.amount, Number(e.target.value) || minimum.amount))}
              className="h-10 w-20 border-x border-neutral-300 text-center text-base outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              aria-label="More"
              onClick={() => setQty((q) => q + step)}
              className="flex h-10 w-10 items-center justify-center text-neutral-700 hover:text-neutral-950"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="note" className="text-sm font-medium text-neutral-800">
            Anything else? <span className="font-normal text-neutral-500">(optional)</span>
          </label>
          <textarea
            id="note"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Your logo or text, deadline, delivery city…"
            className="mt-2 w-full resize-none rounded-lg border border-neutral-300 px-3.5 py-2.5 text-[15px] outline-none placeholder:text-neutral-400 focus:border-neutral-900"
          />
        </div>
      </div>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: INK.red }}
      >
        <Send className="h-5 w-5" /> Send quote request on WhatsApp
      </a>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
        <FileCheck className="h-4 w-4" /> Free digital proof before anything is printed
      </p>
    </div>
  );
}
