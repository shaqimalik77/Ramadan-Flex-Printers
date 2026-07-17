"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Disable scrolling immediately when loader is visible
    if (!isFadingOut) {
      document.body.style.overflow = "hidden";
    }

    let removeTimer: NodeJS.Timeout;

    const startFadeOut = () => {
      setIsFadingOut(true);
      document.body.style.overflow = "";

      // Remove component from DOM after fade-out transition duration (500ms)
      removeTimer = setTimeout(() => {
        setMounted(false);
      }, 500);
    };

    // Safety fallback: Always hide loader after maximum 1200ms
    const safetyTimer = setTimeout(() => {
      startFadeOut();
    }, 1200);

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
      aria-label="Loading Ramdan Flex Printers"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? "opacity-0 scale-[0.97] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative flex items-center justify-center w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]">
        {/* Outer animated ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-[preloaderSpin_2s_linear_infinite]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="#E41F26"
            strokeWidth="1.5"
            strokeDasharray="60 230"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 1px 3px rgba(228,31,38,0.15))" }}
          />
        </svg>

        {/* Middle animated ring (reverse) */}
        <svg
          className="absolute inset-0 w-full h-full animate-[preloaderSpinReverse_2.4s_linear_infinite]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#00AEEF"
            strokeWidth="1.2"
            strokeDasharray="45 200"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,174,239,0.12))" }}
          />
        </svg>

        {/* Inner dotted ring (slow spin) */}
        <svg
          className="absolute inset-0 w-full h-full animate-[preloaderSpin_6s_linear_infinite]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke="#ECECEC"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeLinecap="round"
          />
        </svg>

        {/* Center logo with gentle breathing pulse */}
        <div className="absolute flex items-center justify-center">
          <div className="relative w-[100px] h-[46px] sm:w-[130px] sm:h-[60px] animate-[preloaderLogoPulse_2.2s_ease-in-out_infinite]">
            <Image
              src="/images/logo/logo.png"
              alt="Ramdan Flex Printers"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Loading text with shimmer */}
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 animate-[preloaderTextPulse_1.5s_ease-in-out_infinite]">
        Loading…
      </p>

      <style>{`
        @keyframes preloaderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes preloaderSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes preloaderLogoPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        @keyframes preloaderTextPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
