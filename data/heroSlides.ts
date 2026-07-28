import slidesData from "./heroSlides.json";

export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
};

export const heroSlides: HeroSlide[] = slidesData;
