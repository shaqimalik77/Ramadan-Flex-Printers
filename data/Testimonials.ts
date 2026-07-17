export interface Testimonial {
  id: number;
  name: string;
  role: string;
  business: string;
  rating: number;
  review: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Owner",
    business: "ChickoFlame",
    rating: 5,
    review:
      "Our premium stickers, textured hang tags, butter papers, and thank you cards arrived beautifully finished. The quality is absolutely top-notch and completely elevated our packaging game.",
    image: "/images/testimonials/ahmed-khan.png",
  },
  {
    id: 2,
    name: "Sara Ali",
    role: "Marketing Manager",
    business: "Pizza Max",
    rating: 5,
    review:
      "Needed custom fabric woven tags for our outlets on a tight deadline and they delivered incredibly fast. The premium weaving quality adds a perfect luxury feel to our packaging.",
    image: "/images/testimonials/sara-ali.png",
  },
  {
    id: 3,
    name: "Usman Tariq",
    role: "Owner",
    business: "Unique Sports",
    rating: 5,
    review:
      "We urgently required corporate smart diaries on a very short notice and received them right on time. The exceptional build quality and professional finishing completely met our benchmarks.",
    image: "/images/testimonials/usman-tariq.png",
  },
  {
    id: 4,
    name: "Hassan Raza",
    role: "Manager",
    business: "California Pizza",
    rating: 5,
    review:
      "The customized gift bags, water bottles, tea coasters, and notebooks were executed with crisp, uniform branding. Outstanding bulk material quality and seamless, professional delivery.",
    image: "/images/testimonials/hassan-raza.png",
  },
];