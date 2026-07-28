"use server";

import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fetchFileFromGithub, commitFileToGithub } from "@/lib/github";

const isDev = process.env.NODE_ENV === "development";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Ramdan123!";

// Helper to read JSON data (local in dev, GitHub in prod)
async function getJSONData(filename: string): Promise<{ data: any; sha?: string }> {
  const isArrayType = filename.includes("users") || filename.includes("bestSelling") || filename.includes("categoryProducts") || filename.includes("heroSlides");
  
  if (isDev) {
    const filePath = path.join(process.cwd(), "data", filename);
    if (!fs.existsSync(filePath)) {
      return { data: isArrayType ? [] : {} };
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return { data: JSON.parse(content) };
  } else {
    try {
      const { content, sha } = await fetchFileFromGithub(`data/${filename}`);
      return { data: JSON.parse(content), sha };
    } catch (error: any) {
      if (error.message && (error.message.includes("Not Found") || error.message.includes("404"))) {
        return { data: isArrayType ? [] : {}, sha: undefined };
      }
      throw error;
    }
  }
}

// Helper to write JSON data (local in dev, GitHub in prod)
async function writeJSONData(filename: string, data: any, sha?: string, message?: string) {
  const content = JSON.stringify(data, null, 2);
  if (isDev) {
    const filePath = path.join(process.cwd(), "data", filename);
    fs.writeFileSync(filePath, content, "utf-8");
  } else {
    if (!sha) {
      try {
        const fetched = await fetchFileFromGithub(`data/${filename}`);
        sha = fetched.sha;
      } catch (e) {
        sha = undefined; // File does not exist, commit with undefined sha (creates file)
      }
    }
    await commitFileToGithub(`data/${filename}`, content, sha || "", message || `Update ${filename} via Admin Panel`);
  }
}

// Authentication Actions
export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Incorrect password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

// Data Actions
export async function getAdminData() {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized");
  }

  const { data: categories } = await getJSONData("categoryProducts.json");
  const { data: products } = await getJSONData("productDetails.json");
  const { data: slides } = await getJSONData("heroSlides.json");
  
  let users = [];
  try {
    const { data } = await getJSONData("users.json");
    // Strip hashes before exposing to dashboard UI
    users = (data || []).map((u: any) => ({
      name: u.name,
      email: u.email,
      createdAt: u.createdAt
    }));
  } catch (e) {}

  return {
    categories,
    products,
    slides,
    users,
  };
}

export async function saveProduct(product: any) {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized");
  }

  const { data: categories, sha: catSha } = await getJSONData("categoryProducts.json");
  const { data: products, sha: prodSha } = await getJSONData("productDetails.json");

  // Validate slugs
  if (!product.slug || !product.category) {
    throw new Error("Slug and Category are required");
  }

  // 1. Update productDetails.json
  const prodIndex = products.findIndex((p: any) => p.slug === product.slug);
  const updatedProductDetails = {
    slug: product.slug,
    category: product.category,
    categoryName: product.categoryName || product.category.charAt(0).toUpperCase() + product.category.slice(1),
    title: product.title,
    images: product.images || [],
    shortDescription: product.shortDescription || "",
    longDescription: Array.isArray(product.longDescription) 
      ? product.longDescription 
      : [product.longDescription || ""],
    features: product.features || [],
    specifications: product.specifications || {},
    faq: product.faq || [],
  };

  if (prodIndex >= 0) {
    products[prodIndex] = updatedProductDetails;
  } else {
    products.push(updatedProductDetails);
  }

  // 2. Update categoryProducts.json
  // Remove product from old categories (in case category changed)
  categories.forEach((cat: any) => {
    cat.products = cat.products.filter((p: any) => p.slug !== product.slug);
  });

  // Find target category
  const targetCat = categories.find((cat: any) => cat.slug === product.category);
  if (targetCat) {
    targetCat.products.push({
      slug: product.slug,
      title: product.title,
      shortDescription: product.shortDescription || "",
      image: product.images?.[0] || "/images/logo/logo.png",
    });
  } else {
    // If category doesn't exist, create it
    categories.push({
      slug: product.category,
      name: product.categoryName || product.category.charAt(0).toUpperCase() + product.category.slice(1),
      seoDescription: [
        `Custom printed ${product.category} in Pakistan. High quality, premium finishes, and fast shipping.`
      ],
      products: [{
        slug: product.slug,
        title: product.title,
        shortDescription: product.shortDescription || "",
        image: product.images?.[0] || "/images/logo/logo.png",
      }]
    });
  }

  // Save both files
  await writeJSONData("productDetails.json", products, prodSha, `Add/Update product detail: ${product.title}`);
  await writeJSONData("categoryProducts.json", categories, catSha, `Sync category list for: ${product.title}`);

  return { success: true };
}

export async function deleteProduct(slug: string) {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized");
  }

  const { data: categories, sha: catSha } = await getJSONData("categoryProducts.json");
  const { data: products, sha: prodSha } = await getJSONData("productDetails.json");

  // Filter out product from list
  const updatedProducts = products.filter((p: any) => p.slug !== slug);

  // Filter out product from categories
  categories.forEach((cat: any) => {
    cat.products = cat.products.filter((p: any) => p.slug !== slug);
  });

  await writeJSONData("productDetails.json", updatedProducts, prodSha, `Delete product detail: ${slug}`);
  await writeJSONData("categoryProducts.json", categories, catSha, `Remove product from categories: ${slug}`);

  return { success: true };
}

export async function saveSlides(slides: any[]) {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized");
  }

  const { sha } = await getJSONData("heroSlides.json");
  await writeJSONData("heroSlides.json", slides, sha, "Update home slider banners");

  return { success: true };
}

export async function uploadImageToGithub(category: string, filename: string, base64Content: string) {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized");
  }

  const token = process.env.GITHUB_TOKEN;
  const cleanName = `${Date.now()}-${filename.toLowerCase().replace(/[^a-z0-9.]/g, "-")}`;
  const githubPath = `public/images/products/${category}/${cleanName}`;
  const relativePath = `/images/products/${category}/${cleanName}`;

  if (isDev) {
    const localDir = path.join(process.cwd(), "public/images/products", category);
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const buffer = Buffer.from(base64Content, "base64");
    fs.writeFileSync(path.join(localDir, cleanName), buffer);
    return { url: relativePath };
  } else {
    if (!token) {
      throw new Error("GITHUB_TOKEN is not configured in production.");
    }
    const OWNER = "shaqimalik77";
    const REPO = "Ramadan-Flex-Printers";
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${githubPath}`;

    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload product image: ${cleanName}`,
        content: base64Content,
        branch: "main",
      }),
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      throw new Error(`GitHub image upload failed: ${err.message || putRes.statusText}`);
    }

    return { url: relativePath };
  }
}

// User Authentication Actions
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function registerUserAction(name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: users, sha } = await getJSONData("users.json");
    
    // Normalize email
    const cleanEmail = email.toLowerCase().trim();
    if (users.some((u: any) => u.email === cleanEmail)) {
      return { success: false, error: "Email is already registered" };
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      passwordHash: hashPassword(pass),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Save back
    await writeJSONData("users.json", users, sha, `Register user: ${newUser.name}`);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("user_session", JSON.stringify({ name: newUser.name, email: newUser.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || "Failed to register" };
  }
}

export async function loginUserAction(email: string, pass: string): Promise<{ success: boolean; error?: string; name?: string }> {
  try {
    const { data: users } = await getJSONData("users.json");
    
    const cleanEmail = email.toLowerCase().trim();
    const user = users.find((u: any) => u.email === cleanEmail);
    if (!user || user.passwordHash !== hashPassword(pass)) {
      return { success: false, error: "Invalid email or password" };
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("user_session", JSON.stringify({ name: user.name, email: user.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return { success: true, name: user.name };
  } catch (e: any) {
    return { success: false, error: e.message || "Failed to login" };
  }
}

export async function logoutUserAction() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session");
  return { success: true };
}

export async function getCurrentUserAction(): Promise<{ name: string; email: string } | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session")?.value;
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch (e) {
    return null;
  }
}
