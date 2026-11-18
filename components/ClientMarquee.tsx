import Image from "next/image";
import type { ClientLogo } from "@/data/clientLogos";

/**
 * Size each logo so they all look equally heavy: wide logos get more width,
 * square ones less, based on the same visual area (and sensible caps).
 */
function logoSize(width: number, height: number) {
  const ratio = width / height;
  const AREA = 5800; // px² of "ink" each logo gets
  const h = Math.min(Math.max(Math.sqrt(AREA / ratio), 40), 84);
  const w = Math.min(h * ratio, 220);
  return { w: Math.round(w), h: Math.round(w / ratio), square: ratio < 1.3 };
}

/**
 * A slow, endless strip of client logos. Pauses while hovered. Visitors who
 * prefer reduced motion get a static, wrapped row instead.
 */
export default function ClientMarquee({ clients }: { clients: ClientLogo[] }) {
  const item = (client: ClientLogo, key: string, hidden = false) => {
    const { w, h, square } = logoSize(client.logo.width, client.logo.height);
    return (
      <li
        key={key}
        aria-hidden={hidden || undefined}
        className="flex h-24 shrink-0 items-center px-7 sm:px-10"
      >
        <Image
          src={client.logo}
          alt={hidden ? "" : `${client.name} logo`}
          title={client.name}
          // Logos are tiny (5–40 KB): load them up front so none scrolls into
          // view empty, and serve the file as-is (no on-the-fly resizing,
          // which is slow on the Hostinger server the first time).
          loading="eager"
          unoptimized
          style={{ width: w, height: h }}
          className={`object-contain mix-blend-multiply transition duration-300 hover:scale-105 ${
            square ? "rounded-lg" : ""
          }`}
        />
      </li>
    );
  };

  return (
    <div className="client-marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <style>{`
        @keyframes client-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .client-marquee ul { animation: client-marquee 50s linear infinite; }
        .client-marquee:hover ul { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .client-marquee { mask-image: none; }
          .client-marquee ul { animation: none; flex-wrap: wrap; justify-content: center; width: auto; }
          .client-marquee li[aria-hidden="true"] { display: none; }
        }
      `}</style>
      {/* Two identical copies side by side; moving left by half loops
          seamlessly (spacing is padding inside each item, so both halves are
          exactly the same width). */}
      <ul className="flex w-max items-center">
        {clients.map((c) => item(c, `a-${c.name}`))}
        {clients.map((c) => item(c, `b-${c.name}`, true))}
      </ul>
    </div>
  );
}
