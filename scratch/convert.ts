import fs from "fs";
import path from "path";
import { categoryProducts } from "../data/categoryProducts";
import { productDetails } from "../data/productDetails";
import { heroSlides } from "../data/heroSlides";
import { bestSellingProducts, packagingProducts } from "../data/bestSellingData";

const dataDir = path.join(__dirname, "../data");

// Write categoryProducts
fs.writeFileSync(
  path.join(dataDir, "categoryProducts.json"),
  JSON.stringify(categoryProducts, null, 2),
  "utf-8"
);
console.log("Converted categoryProducts to JSON!");

// Write productDetails
fs.writeFileSync(
  path.join(dataDir, "productDetails.json"),
  JSON.stringify(productDetails, null, 2),
  "utf-8"
);
console.log("Converted productDetails to JSON!");

// Write heroSlides
fs.writeFileSync(
  path.join(dataDir, "heroSlides.json"),
  JSON.stringify(heroSlides, null, 2),
  "utf-8"
);
console.log("Converted heroSlides to JSON!");

// Write bestSellingProducts and packagingProducts combined
fs.writeFileSync(
  path.join(dataDir, "bestSellingData.json"),
  JSON.stringify({ bestSellingProducts, packagingProducts }, null, 2),
  "utf-8"
);
console.log("Converted bestSellingData to JSON!");
