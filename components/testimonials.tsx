import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/data/Testimonials";

export default function Testimonials() {
  return (
    <section className="w-full py-10 sm:py-12 md:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden sm:block h-px w-24 bg-neutral-200" />
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-neutral-800 border border-neutral-200 px-5 py-2.5 rounded-xl uppercase">
            CUSTOMER REVIEWS
          </h2>
          <span className="hidden sm:block h-px w-24 bg-neutral-200" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 px-6 py-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:-translate-y-2"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-offset-2 ring-amber-400 mb-4 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name} - ${testimonial.business}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < testimonial.rating
                      ? "fill-amber-500 text-amber-500"
                      : "fill-gray-200 text-gray-200"
                  }
                />
              ))}
            </div>

            <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
              {testimonial.review}
            </p>

            <div className="mt-auto">
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">
                {testimonial.role} - {testimonial.business}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}