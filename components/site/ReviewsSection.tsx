import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import ReviewsSlider from "@/components/ReviewsSlider";
import SectionTitle from "@/components/site/SectionTitle";
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  googleReviews,
} from "@/data/googleReviews";

/** Real Google reviews in a slider, with a link to all reviews on Google. */
export default function ReviewsSection({ title = "What our customers say" }: { title?: string }) {
  return (
    <section className="py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          title={title}
          subtitle={`Real reviews from our Google Business Profile, rated ${GOOGLE_RATING} by ${GOOGLE_REVIEW_COUNT} customers.`}
        />
        <Reveal className="mt-10 sm:mt-12">
          <ReviewsSlider reviews={googleReviews} />
        </Reveal>
        <div className="mt-8 text-center sm:mt-10">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:border-neutral-900"
          >
            Read all {GOOGLE_REVIEW_COUNT} reviews on Google <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
