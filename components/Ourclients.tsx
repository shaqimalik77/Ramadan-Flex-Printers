"use client";

import { useState } from "react";
import Image from "next/image";
import { clientsData, type ClientLogo } from "@/data/clientsdata";

// Falls back here if a client logo 404s or fails to load.
// Add your logo file at this path in /public.
const FALLBACK_LOGO_SRC = "/Images/logo/logo.png";

function ClientCard({ client, hidden }: { client: ClientLogo; hidden?: boolean }) {
  const [imgSrc, setImgSrc] = useState(client.image);

  return (
    <li
      aria-hidden={hidden}
      className="group flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:h-24 sm:w-44"
    >
      <Image
        src={imgSrc}
        alt={client.name}
        width={160}
        height={64}
        className="h-full w-full object-contain grayscale transition-all duration-300 ease-out group-hover:grayscale-0"
        onError={() => setImgSrc(FALLBACK_LOGO_SRC)}
      />
    </li>
  );
}

export default function OurClients() {
  // Duplicated once so the track can loop seamlessly at -50% translateX.
  const loopItems = [...clientsData, ...clientsData];

  return (
    <section aria-label="Our Clients" className="overflow-hidden bg-white py-10 sm:py-12 md:py-14">
      {/* Keyframes for the marquee — kept local since this file can't
          touch tailwind.config.ts. Adjust "30s" below to change speed. */}
      <style>{`
        @keyframes clients-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Same boxed heading + divider-line style as the other sections */}
        <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
          <span aria-hidden className="h-px flex-1 bg-gray-300" />
          <h2 className="whitespace-nowrap border border-gray-300 px-6 py-2 text-sm font-bold uppercase tracking-widest text-gray-800 sm:text-base">
            Our Clients
          </h2>
          <span aria-hidden className="h-px flex-1 bg-gray-300" />
        </div>
      </div>

      <ul
        className="flex w-max items-center gap-6 [animation:clients-marquee_30s_linear_infinite] hover:[animation-play-state:paused] sm:gap-8"
      >
        {loopItems.map((client, index) => (
          <ClientCard
            key={`${client.id}-${index}`}
            client={client}
            hidden={index >= clientsData.length}
          />
        ))}
      </ul>
    </section>
  );
}