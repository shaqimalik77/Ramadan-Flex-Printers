import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center w-[180px] h-[180px]">
        {/* Spinning ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: "2s" }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#E41F26"
            strokeWidth="1.5"
            strokeDasharray="55 220"
            strokeLinecap="round"
          />
        </svg>

        {/* Logo center */}
        <div className="relative w-[90px] h-[42px] animate-pulse">
          <Image
            src="/images/logo/logo.png"
            alt="Ramdan Flex Printers Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
