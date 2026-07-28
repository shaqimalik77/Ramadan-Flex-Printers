import bestSellingJson from "./bestSellingData.json";

export type CategoryItem = {
  id: string;
  name: string;
  image: string;
  href: string;
};

export const bestSellingProducts: CategoryItem[] = bestSellingJson.bestSellingProducts;
export const packagingProducts: CategoryItem[] = bestSellingJson.packagingProducts;