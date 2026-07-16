import SmartImage from "./Smartimage";

export default function AboutStory() {
  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#E41F26] bg-red-50 px-3 py-1 rounded-full mb-4">
            Our Story
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">
            Built on Craftsmanship, Trusted for Consistency
          </h2>
          <div className="space-y-4 text-gray-600 text-[15px] md:text-base leading-relaxed">
            <p>
              Ramdan Flex Printers started with a simple goal: give
              businesses across Pakistan access to printing and packaging
              that actually looks and feels premium, without the long lead
              times or inconsistent quality that small and growing brands
              often struggle with.
            </p>
            <p>
              Over the years, we have grown from a small local printing
              setup into a full-service partner for custom packaging,
              branded stationery, promotional products, and bulk corporate
              printing, serving boutiques, bakeries, wedding planners, and
              corporate teams alike.
            </p>
            <p>
              Every order, whether it is a small trial batch or a large
              bulk run, goes through the same quality process. That
              consistency is what keeps our clients coming back, and what
              lets us deliver nationwide without compromising on the finish
              our customers expect.
            </p>
          </div>
        </div>

        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <SmartImage
            src="/Images/about/our-story.jpg"
            alt="Printing press producing custom branded packaging"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
