import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#E41F26] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-800 font-medium">About</li>
          </ol>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20 text-center">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#E41F26] bg-red-50 px-3 py-1 rounded-full mb-4">
          About Us
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
          About Ramdan Flex Printers
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Trusted across Pakistan for premium custom printing, branded
          packaging, and promotional products, built on quality, speed, and
          service you can rely on.
        </p>
      </div>
    </section>
  );
}
