"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./Loader";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Disable scrolling immediately when loader is visible
    if (!isFadingOut) {
      document.body.style.overflow = "hidden";
    }

    let safetyTimer: NodeJS.Timeout;
    let removeTimer: NodeJS.Timeout;

    const startFadeOut = () => {
      setIsFadingOut(true);
      document.body.style.overflow = "";

      // Remove component from DOM after fade-out transition duration (400ms)
      removeTimer = setTimeout(() => {
        setMounted(false);
      }, 400);
    };

    // Safety fallback: Always hide loader after maximum 1100ms
    // This guarantees the 400ms fade-out transition concludes by 1500ms max.
    safetyTimer = setTimeout(() => {
      startFadeOut();
    }, 1100);

    // Hide immediately if resources and page finish loading earlier
    const handleLoad = () => {
      clearTimeout(safetyTimer);
      startFadeOut();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "";
    };
  }, [isFadingOut]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading Ramadan Flex Printers"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white transition-all duration-[400ms] cubic-bezier(0.16, 1, 0.3, 1) animate-[preloaderFadeIn_0.3s_ease-out] ${
        isFadingOut ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Double concentric rotating rings */}
        <Loader />

        {/* Center Logo Frame with premium breathing scale pulse */}
        <div className="absolute flex items-center justify-center">
          <div className="relative w-[120px] h-[56px] sm:w-[150px] sm:h-[70px] lg:w-[180px] lg:h-[84px] animate-[preloaderLogoPulse_2s_infinite_cubic-bezier(0.4, 0, 0.2, 1)]">
            <Image
              src="/Images/logo/logo.png"
              alt="Ramdan Flex Printers"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes preloaderLogoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes preloaderFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
