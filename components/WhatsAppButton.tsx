import { siteConfig } from "@/lib/siteConfig";

/**
 * Fixed, always-visible floating WhatsApp button.
 * Pure CSS animations only (no animation libraries) — safe to drop into
 * the root layout so it stays visible while scrolling across every page.
 */
export default function WhatsAppButton() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber ?? "923311146549"}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-fab group relative flex h-[54px] w-[54px] sm:h-[58px] sm:w-[58px] lg:h-16 lg:w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        {/* Continuous slow pulse ring */}
        <span
          aria-hidden="true"
          className="wa-fab-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        />

        {/* WhatsApp glyph */}
        <svg
          viewBox="0 0 448 512"
          aria-hidden="true"
          className="relative h-6 w-6 sm:h-[26px] sm:w-[26px] lg:h-7 lg:w-7 fill-white drop-shadow-sm"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Tooltip */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Chat on WhatsApp
          <span
            aria-hidden="true"
            className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-neutral-900"
          />
        </span>
      </a>

      <style>{`
        .wa-fab-pulse {
          animation: wa-pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes wa-pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.55;
          }
          70% {
            transform: scale(1.6);
            opacity: 0;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wa-fab-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
