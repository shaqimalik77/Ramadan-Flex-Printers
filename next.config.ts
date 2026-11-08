import type { NextConfig } from "next";

// Cache images for a day, then serve the cached copy while refreshing it in
// the background for up to a week. Admin-uploaded images that replace a file
// with the same name show up within a day.
const IMAGE_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  async headers() {
    // If two rules set the same header on a path, the LAST one wins.
    return [
      {
        // HTML pages: browsers must re-check with the server on every visit,
        // so content changes show up immediately. (Replaces "no-store", which
        // also blocked the browser's back/forward cache.)
        // Excludes /_next (Next.js manages those headers itself) and /images.
        source: "/:path((?!_next/|images/).*)",
        headers: [{ key: "Cache-Control", value: "max-age=0, must-revalidate" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: IMAGE_CACHE }],
      },
      {
        source: "/og-image.jpg",
        headers: [{ key: "Cache-Control", value: IMAGE_CACHE }],
      },
    ];
  },

  async redirects() {
    return [
      {
        // One domain only: send ramdanflexprinters.com to www.ramdanflexprinters.com
        source: "/:path*",
        has: [{ type: "host", value: "ramdanflexprinters.com" }],
        destination: "https://www.ramdanflexprinters.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
