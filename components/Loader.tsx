import React from "react";

export default function Loader() {
  return (
    <div className="relative flex items-center justify-center w-[220px] h-[220px] sm:w-[255px] sm:h-[255px] lg:w-[290px] lg:h-[290px]">
      {/* Outer Ring - Clockwise Rotation (Blue) */}
      <svg
        className="absolute inset-0 w-full h-full animate-[spin_2.2s_linear_infinite]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(11, 94, 215, 0.08))",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="#0B5ED7"
          strokeWidth="1.2"
          strokeDasharray="65 220"
          strokeLinecap="round"
        />
      </svg>

      {/* Inner Ring - Anti-clockwise Rotation (Red) */}
      <svg
        className="absolute inset-0 w-full h-full animate-[preloaderSpinReverse_1.8s_linear_infinite]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(229, 57, 53, 0.08))",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="39"
          stroke="#E53935"
          strokeWidth="1.2"
          strokeDasharray="50 190"
          strokeLinecap="round"
        />
      </svg>

      <style>{`
        @keyframes preloaderSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
