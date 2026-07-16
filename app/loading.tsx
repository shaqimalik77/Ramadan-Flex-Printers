import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Soft pulse animation for the brand logo */}
        <div className="relative h-20 w-48 animate-pulse">
          <Image
            src="/Images/logo/logo.png"
            alt="Ramdan Flex Printers Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        {/* Smooth spinner matching brand colors */}
        <div className="h-5.5 w-5.5 animate-spin rounded-full border-2 border-neutral-100 border-t-[#E41F26]" />
      </div>
    </div>
  );
}
