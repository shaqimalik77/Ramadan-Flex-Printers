/**
 * Real customer reviews from the RAMDAN FLEX PRINTERS Google Business Profile,
 * copied word for word (spelling included) on 18 Nov 2026. Do not edit the
 * text or add reviews that are not on Google.
 *
 * Names are shortened to first name + last initial for privacy. Profile photos
 * (saved by Hamza from Google) are imported from /assets, not /public, because
 * new files in /public are not served on Hostinger. Reviewers without a photo
 * get a coloured initial instead.
 */

import type { StaticImageData } from "next/image";
import sarmadPhoto from "@/assets/reviewers/sarmad.png";
import younusPhoto from "@/assets/reviewers/younus.png";
import hibaPhoto from "@/assets/reviewers/hiba.png";
import hameedPhoto from "@/assets/reviewers/hammad.png";

export interface GoogleReview {
  name: string;
  text: string;
  photo?: StaticImageData;
}

export const GOOGLE_RATING = "5.0";
/** Total shown on Google on 18 Nov 2026. Update when it changes. */
export const GOOGLE_REVIEW_COUNT = 19;
/** Share link to the Google Business Profile (opens the reviews on Google). */
export const GOOGLE_PROFILE_URL = "https://share.google/IUpHCKCZpI40jdRoR";

export const googleReviews: GoogleReview[] = [
  {
    name: "Nabeeha A.",
    text: "Great service.made my flex on urgent bases 👍👍amazing quality",
  },
  {
    name: "Hiba Events",
    photo: hibaPhoto,
    text: "They work is marvellous, beautiful, truly understanding",
  },
  {
    name: "Muhammad H.",
    photo: hameedPhoto,
    text: "Very nice printing and quick service I impressive. And good communication . I like it's service of printing specialy flex and shirts a one quality",
  },
  {
    name: "Muhammad Y.",
    photo: younusPhoto,
    text: "Stand print quality is so fine and behavior is so cool and happy. Deliver on time.",
  },
  {
    name: "Sarmad A.",
    photo: sarmadPhoto,
    text: "I print my mug for my mom birthday . High quality prints mug. Copretive and fast response. I highly refer for ramdan flex printers",
  },
  {
    name: "Chaudhary A.",
    text: "Very good quality of printing",
  },
];
