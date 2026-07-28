"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  LogOut, 
  Plus, 
  Trash, 
  Edit, 
  Sliders, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  X, 
  PlusCircle, 
  Loader2, 
  Search,
  Upload,
  Image as ImageIcon,
  User
} from "lucide-react";
import { 
  loginAdmin, 
  logoutAdmin, 
  checkAdminAuth, 
  getAdminData, 
  saveProduct, 
  deleteProduct, 
  saveSlides,
  uploadImageToGithub
} from "./actions";

// Category display mapping for nice names
const categoryNames: Record<string, string> = {
  ribbons: "Ribbons",
  stickers: "Stickers",
  "butter-paper": "Butter Paper",
  "jewellery-cards": "Jewellery Cards",
  polaroids: "Polaroids",
  "business-cards": "Business Cards",
  "label-and-hang-tags": "Label & Hang Tags",
  "thankyou-cards": "Thank You Cards",
  "fabric-tags": "Fabric Tags",
  "ecommerce-boxes": "Ecommerce Boxes",
  "standup-pouches": "Standup Pouches",
  "hard-drawer-boxes": "Hard Drawer Boxes",
  "ziplock-frosted-bags": "Ziplock Frosted Bags",
  "courier-flyer-poly-bags": "Courier Flyer Poly Bags",
  "wedding-cards": "Wedding Cards",
  mugs: "Mugs",
  shirts: "Shirts",
  "neon-signs": "Neon Signs",
  "3d-boards": "3D Boards",
  "flex-designs": "Flex Designs",
  "promotional-products": "Promotional Products"
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "slides" | "users">("products");

  // Data State
  const [loadingData, setLoadingData] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>({
    slug: "",
    category: "ribbons",
    title: "",
    images: [], // List of uploaded image paths
    shortDescription: "",
    longDescription: "", // Stored as textarea text, split on save
    featuresText: "", // One feature per line text
    specifications: [{ key: "", value: "" }],
    faq: [{ question: "", answer: "" }]
  });

  useEffect(() => {
    async function checkAuth() {
      const auth = await checkAdminAuth();
      setIsAuthenticated(auth);
      if (auth) {
        loadData();
      }
    }
    checkAuth();
  }, []);

  async function loadData() {
    setLoadingData(true);
    try {
      const res = await getAdminData();
      setProducts(res.products);
      setCategories(res.categories);
      setSlides(res.slides);
      setUsers(res.users || []);
    } catch (err: any) {
      showMsg("Failed to load website data", "error");
    } finally {
      setLoadingData(false);
    }
  }

  function showMsg(text: string, type: "success" | "error") {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");
    try {
      const res = await loginAdmin(password);
      if (res.success) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setAuthError(res.error || "Login failed");
      }
    } catch (err) {
      setAuthError("Server communication error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    await logoutAdmin();
    setIsAuthenticated(false);
    setProducts([]);
    setSlides([]);
    setUsers([]);
  }

  // Slide CRUD Handlers
  function handleAddSlide() {
    setSlides([...slides, { id: `slide-${Date.now()}`, src: "", alt: "" }]);
  }

  function handleRemoveSlide(id: string) {
    setSlides(slides.filter((slide) => slide.id !== id));
  }

  function handleSlideChange(index: number, field: string, value: string) {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  }

  // Handle uploading slide image from computer
  async function handleSlideImageUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const res = await uploadImageToGithub("hero", file.name, base64);
        handleSlideChange(index, "src", res.url);
        showMsg("Banner image uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showMsg(err.message || "Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSaveSlides() {
    setIsSubmitting(true);
    try {
      await saveSlides(slides);
      showMsg("Hero banners updated successfully! Redeployment triggered.", "success");
    } catch (err: any) {
      showMsg(err.message || "Failed to update banners", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Image Upload handler for product details
  async function handleProductImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const res = await uploadImageToGithub(currentProduct.category, file.name, base64);
        
        // Add to image list
        setCurrentProduct((prev: any) => ({
          ...prev,
          images: [...prev.images, res.url]
        }));
        showMsg("Product image uploaded successfully!", "success");
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showMsg(err.message || "Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
    }
  }

  function handleRemoveProductImage(idxToRemove: number) {
    setCurrentProduct((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, idx: number) => idx !== idxToRemove)
    }));
  }

  function handleFieldChange(field: string, value: any) {
    setCurrentProduct((prev: any) => ({ ...prev, [field]: value }));
  }

  // Specifications key-value handlers
  function handleSpecChange(index: number, keyOrValue: "key" | "value", val: string) {
    const specs = [...currentProduct.specifications];
    specs[index][keyOrValue] = val;
    setCurrentProduct({ ...currentProduct, specifications: specs });
  }

  function addSpecField() {
    setCurrentProduct({
      ...currentProduct,
      specifications: [...currentProduct.specifications, { key: "", value: "" }]
    });
  }

  function removeSpecField(index: number) {
    const specs = currentProduct.specifications.filter((_: any, i: number) => i !== index);
    setCurrentProduct({
      ...currentProduct,
      specifications: specs.length ? specs : [{ key: "", value: "" }]
    });
  }

  // FAQ handlers
  function handleFaqChange(index: number, field: "question" | "answer", val: string) {
    const faqs = [...currentProduct.faq];
    faqs[index][field] = val;
    setCurrentProduct({ ...currentProduct, faq: faqs });
  }

  function addFaqField() {
    setCurrentProduct({
      ...currentProduct,
      faq: [...currentProduct.faq, { question: "", answer: "" }]
    });
  }

  function removeFaqField(index: number) {
    const faqs = currentProduct.faq.filter((_: any, i: number) => i !== index);
    setCurrentProduct({
      ...currentProduct,
      faq: faqs.length ? faqs : [{ question: "", answer: "" }]
    });
  }

  // Save / Edit Product
  function startAddProduct() {
    setCurrentProduct({
      slug: "",
      category: "ribbons",
      title: "",
      images: [],
      shortDescription: "",
      longDescription: "",
      featuresText: "",
      specifications: [
        { key: "Material", value: "" },
        { key: "Minimum Order", value: "" },
        { key: "Turnaround Time", value: "" }
      ],
      faq: [{ question: "", answer: "" }]
    });
    setIsEditingProduct(true);
  }

  function startEditProduct(prod: any) {
    // Map specifications object to key-value array
    const specsArray = Object.entries(prod.specifications || {}).map(([key, value]) => ({
      key,
      value: value as string
    }));

    setCurrentProduct({
      slug: prod.slug,
      category: prod.category,
      title: prod.title,
      images: prod.images || [],
      shortDescription: prod.shortDescription || "",
      longDescription: Array.isArray(prod.longDescription) 
        ? prod.longDescription.join("\n\n") 
        : prod.longDescription || "",
      featuresText: (prod.features || []).join("\n"),
      specifications: specsArray.length ? specsArray : [{ key: "", value: "" }],
      faq: prod.faq && prod.faq.length ? prod.faq : [{ question: "", answer: "" }]
    });
    setIsEditingProduct(true);
  }

  async function handleProductSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Auto-compute slug from title
      const computedSlug = currentProduct.slug || currentProduct.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "") // remove special chars
        .replace(/\s+/g, "-");     // replace spaces with hyphens

      // Map specs array back to object
      const specsObj: Record<string, string> = {};
      currentProduct.specifications.forEach((spec: any) => {
        if (spec.key.trim()) {
          specsObj[spec.key.trim()] = spec.value.trim();
        }
      });

      // Split features by line
      const featuresList = currentProduct.featuresText
        .split("\n")
        .map((f: string) => f.trim())
        .filter((f: string) => f !== "");

      // Split long description paragraphs
      const longDescParagraphs = currentProduct.longDescription
        .split("\n\n")
        .map((p: string) => p.trim())
        .filter((p: string) => p !== "");

      const filteredFaq = currentProduct.faq.filter((f: any) => f.question.trim() !== "" && f.answer.trim() !== "");

      const payload = {
        slug: computedSlug,
        category: currentProduct.category,
        categoryName: categoryNames[currentProduct.category] || currentProduct.category,
        title: currentProduct.title.trim(),
        images: currentProduct.images.length ? currentProduct.images : ["/images/logo/logo.png"],
        shortDescription: currentProduct.shortDescription.trim(),
        longDescription: longDescParagraphs,
        features: featuresList,
        specifications: specsObj,
        faq: filteredFaq
      };

      await saveProduct(payload);
      showMsg(`Product "${payload.title}" saved successfully! Auto-deploy started.`, "success");
      setIsEditingProduct(false);
      loadData();
    } catch (err: any) {
      showMsg(err.message || "Failed to save product", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleProductDelete(slug: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }
    setIsSubmitting(true);
    try {
      await deleteProduct(slug);
      showMsg(`Product "${title}" deleted successfully!`, "success");
      loadData();
    } catch (err: any) {
      showMsg(err.message || "Failed to delete product", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Filter products based on search
  const filteredProducts = products.filter((prod) => {
    const q = searchQuery.toLowerCase();
    const catName = categoryNames[prod.category] || prod.category;
    return (
      prod.title.toLowerCase().includes(q) ||
      catName.toLowerCase().includes(q) ||
      prod.slug.toLowerCase().includes(q)
    );
  });

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-950">
        <Loader2 className="h-8 w-8 animate-spin text-[#E41F26]" />
      </div>
    );
  }

  // --- LOGIN PAGE ---
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-12 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00AEEF]/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-[#E41F26]/20 blur-3xl" />

        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              RAMDAN <span className="text-[#E41F26]">PRINTERS</span>
            </h1>
            <p className="mt-2 text-sm text-neutral-400">Admin Control Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Console Security Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-lg border border-white/10 bg-black/40 py-3 pl-10 pr-3 text-sm text-white placeholder-neutral-500 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] transition"
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-500/20 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-[#E41F26] py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-600 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Unlock Console"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ADMIN CONSOLE DASHBOARD ---
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-12">
      {/* Top Banner Message */}
      {message && (
        <div className={`fixed top-4 right-4 z-[9999] flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-xl backdrop-blur-md animate-[slideIn_0.2s_ease-out] ${
          message.type === "success" 
            ? "bg-green-950/85 border-green-500/30 text-green-400" 
            : "bg-red-950/85 border-red-500/30 text-red-400"
        }`}>
          {message.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-black tracking-wider text-white">
              RAMDAN <span className="text-[#E41F26]">PRINTERS</span>
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#00AEEF]">Management Console</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        {!isEditingProduct && (
          <div className="mb-8 flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === "products" 
                  ? "border-[#E41F26] text-white" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Package className="h-4 w-4" />
              Manage Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("slides")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === "slides" 
                  ? "border-[#E41F26] text-white" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Sliders className="h-4 w-4" />
              Home Banners ({slides.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === "users" 
                  ? "border-[#E41F26] text-white" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <User className="h-4 w-4" />
              Registered Users ({users.length})
            </button>
          </div>
        )}

        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#00AEEF] mb-4" />
            <p className="text-sm text-neutral-400">Fetching database from GitHub...</p>
          </div>
        ) : (
          <div>
            {/* ================= TAB 1: PRODUCTS ================= */}
            {activeTab === "products" && (
              <div>
                {!isEditingProduct ? (
                  /* --- Products List View --- */
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      {/* Search Bar */}
                      <div className="relative w-full sm:max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-neutral-400" />
                        </span>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search product by name or category..."
                          className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-black/40 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
                      </div>

                      {/* Add Product Button */}
                      <button
                        onClick={startAddProduct}
                        className="flex items-center gap-1.5 rounded-lg bg-[#E41F26] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-600 active:scale-98 transition cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Add New Product
                      </button>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredProducts.map((prod) => (
                        <div 
                          key={prod.slug} 
                          className="group relative rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between hover:border-white/20 transition duration-200"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-flex items-center rounded-full bg-[#00AEEF]/10 px-2.5 py-0.5 text-xs font-bold text-[#00AEEF]">
                                {categoryNames[prod.category] || prod.category}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-[#00AEEF] transition">
                              {prod.title}
                            </h3>
                            <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2">
                              {prod.shortDescription}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-white/5 flex gap-3">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-white/10 text-xs font-bold hover:bg-white/15 hover:text-white transition cursor-pointer"
                            >
                              <Edit className="h-3.5 w-3.5" />
                              Edit Item
                            </button>
                            <button
                              onClick={() => handleProductDelete(prod.slug, prod.title)}
                              className="flex items-center justify-center p-2 rounded-lg bg-red-950/40 border border-red-500/10 text-red-400 hover:bg-red-950/70 hover:border-red-500/30 transition cursor-pointer"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredProducts.length === 0 && (
                      <div className="text-center py-12 rounded-xl border border-dashed border-white/10">
                        <Package className="mx-auto h-10 w-10 text-neutral-500 mb-2" />
                        <p className="text-sm text-neutral-400">No products found matching &quot;{searchQuery}&quot;</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* --- Add/Edit Product Form View --- */
                  <form onSubmit={handleProductSave} className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-8 animate-[fadeIn_0.2s_ease-out]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          {currentProduct.slug ? `Edit Product: ${currentProduct.title}` : "Add New Product"}
                        </h2>
                        <p className="text-xs text-neutral-400">Provide details. Data saves directly to GitHub and auto-rebuilds the website.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditingProduct(false)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Product Name (Title)
                        </label>
                        <input
                          type="text"
                          required
                          value={currentProduct.title}
                          onChange={(e) => handleFieldChange("title", e.target.value)}
                          placeholder="E.g., Matte Business Cards"
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
                      </div>

                      {/* Category Selection */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Product Category
                        </label>
                        <select
                          value={currentProduct.category}
                          onChange={(e) => handleFieldChange("category", e.target.value)}
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition cursor-pointer"
                        >
                          {Object.entries(categoryNames).map(([slug, name]) => (
                            <option key={slug} value={slug}>{name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Short Description */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Short Description (1-2 sentences shown on grids)
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={currentProduct.shortDescription}
                          onChange={(e) => handleFieldChange("shortDescription", e.target.value)}
                          placeholder="E.g., High-quality business cards printed on premium cardstock with smooth matte laminate."
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
                      </div>

                      {/* Image Upload Block */}
                      <div className="md:col-span-2 space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                          Product Images
                        </label>
                        
                        {/* Drag/Drop Box */}
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-xl cursor-pointer bg-black/20 hover:bg-black/35 hover:border-white/20 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {uploadingImage ? (
                                <>
                                  <Loader2 className="w-8 h-8 animate-spin text-[#00AEEF] mb-2" />
                                  <p className="text-xs text-neutral-400">Uploading file to GitHub...</p>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                                  <p className="text-xs text-neutral-300"><span className="font-bold">Click to upload image</span> from computer</p>
                                  <p className="text-[10px] text-neutral-500 mt-1">PNG, JPG, JPEG supported</p>
                                </>
                              )}
                            </div>
                            <input 
                              type="file" 
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={handleProductImageUpload}
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Images Thumbnails Preview Grid */}
                        {currentProduct.images && currentProduct.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 mt-4">
                            {currentProduct.images.map((img: string, idx: number) => (
                              <div key={idx} className="group relative aspect-square border border-white/10 rounded-lg overflow-hidden bg-black/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={img} 
                                  alt="Product Preview" 
                                  className="w-full h-full object-contain"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProductImage(idx)}
                                  className="absolute top-1 right-1 p-1 rounded bg-red-950/80 text-red-400 border border-red-500/20 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Long Description */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Detailed Description (Para text. Press Enter twice to start a new paragraph)
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={currentProduct.longDescription}
                          onChange={(e) => handleFieldChange("longDescription", e.target.value)}
                          placeholder="Write long description here. Double line breaks make clean paragraphs."
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
                      </div>

                      {/* Features text area (Single text area split by line) */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Key Features (Write one feature per line)
                        </label>
                        <textarea
                          rows={4}
                          value={currentProduct.featuresText}
                          onChange={(e) => handleFieldChange("featuresText", e.target.value)}
                          placeholder="E.g.:&#10;Premium matte laminate finish&#10;Durable 350gsm cardstock&#10;Dual-side high resolution printing"
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition font-mono leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Specifications table */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-sm font-bold text-neutral-200">Specification Details (Properties)</h3>
                        <button
                          type="button"
                          onClick={addSpecField}
                          className="flex items-center gap-1 text-xs text-[#00AEEF] font-bold hover:underline cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Property
                        </button>
                      </div>
                      <div className="space-y-2">
                        {currentProduct.specifications.map((spec: any, idx: number) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={spec.key}
                              onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                              placeholder="Property (e.g., Sizes)"
                              className="block w-1/3 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                              placeholder="Details (e.g., 2 x 3.5 inches)"
                              className="block flex-grow rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                            />
                            <button
                              type="button"
                              onClick={() => removeSpecField(idx)}
                              className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-500/10 hover:bg-red-950/70 transition cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQs list */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-sm font-bold text-neutral-200">Customer FAQs</h3>
                        <button
                          type="button"
                          onClick={addFaqField}
                          className="flex items-center gap-1 text-xs text-[#00AEEF] font-bold hover:underline cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add FAQ
                        </button>
                      </div>
                      <div className="space-y-4">
                        {currentProduct.faq.map((faq: any, idx: number) => (
                          <div key={idx} className="p-4 border border-white/10 rounded-lg bg-black/20 relative space-y-2">
                            <button
                              type="button"
                              onClick={() => removeFaqField(idx)}
                              className="absolute top-2 right-2 p-1 rounded bg-red-950/40 text-red-400 border border-red-500/10 hover:bg-red-950/70 transition cursor-pointer"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <div className="pr-8">
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                                placeholder="Question (e.g., What is the minimum order?)"
                                className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                              />
                            </div>
                            <div>
                              <textarea
                                rows={2}
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                                placeholder="Answer details..."
                                className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 border-t border-white/10 pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#E41F26] py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-600 active:scale-98 transition disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          "Save Product & Publish"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProduct(false)}
                        className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ================= TAB 2: SLIDES BANNERS ================= */}
            {activeTab === "slides" && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Hero Slider Banners</h2>
                  <p className="text-xs text-neutral-400 mb-6">Upload full-bleed banner images for the homepage slider. Slide order matches list order.</p>
                </div>

                <div className="space-y-4">
                  {slides.map((slide, idx) => (
                    <div key={slide.id} className="relative p-5 border border-white/10 rounded-xl bg-black/40 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveSlide(slide.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/40 text-red-400 border border-red-500/10 hover:bg-red-950/70 transition cursor-pointer"
                      >
                        <Trash className="h-4 w-4" />
                      </button>

                      {/* Index display */}
                      <div className="md:col-span-2 flex items-center gap-1.5">
                        <span className="text-xs font-black uppercase text-[#00AEEF]">Slide #{idx + 1}</span>
                      </div>

                      {/* Left: Image Upload & Preview */}
                      <div className="space-y-4">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                          Upload Banner Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-black/20 hover:bg-black/35 hover:border-white/20 transition">
                            <div className="flex flex-col items-center justify-center pt-2">
                              {uploadingImage ? (
                                <Loader2 className="w-6 h-6 animate-spin text-[#00AEEF]" />
                              ) : (
                                <>
                                  <Upload className="w-6 h-6 text-neutral-400 mb-1" />
                                  <span className="text-[10px] text-neutral-300 font-bold">Upload Slide Image</span>
                                </>
                              )}
                            </div>
                            <input 
                              type="file" 
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={(e) => handleSlideImageUpload(e, idx)}
                              className="hidden" 
                            />
                          </label>
                        </div>
                        {slide.src && (
                          <div className="relative aspect-[1672/941] w-full border border-white/10 rounded-lg overflow-hidden bg-black/60">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={slide.src} alt="Slide Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      {/* Right: Manual Input Paths & Alt */}
                      <div className="space-y-4 self-end">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                            Image Path (Alternative URL)
                          </label>
                          <input
                            type="text"
                            required
                            value={slide.src}
                            onChange={(e) => handleSlideChange(idx, "src", e.target.value)}
                            placeholder="/images/hero/slide-x.png"
                            className="block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                            Image Description (Alt tag)
                          </label>
                          <input
                            type="text"
                            required
                            value={slide.alt}
                            onChange={(e) => handleSlideChange(idx, "alt", e.target.value)}
                            placeholder="Describe slide contents..."
                            className="block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {slides.length === 0 && (
                    <div className="text-center py-12 rounded-xl border border-dashed border-white/10">
                      <Sliders className="mx-auto h-10 w-10 text-neutral-500 mb-2" />
                      <p className="text-sm text-neutral-400">No slides configured. Add at least one slide banner.</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleAddSlide}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-[#00AEEF]/20 bg-[#00AEEF]/10 px-4 py-2.5 text-sm font-bold text-[#00AEEF] hover:bg-[#00AEEF]/15 transition cursor-pointer"
                    >
                      <PlusCircle className="h-4 w-4" /> Add Slide
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting || slides.length === 0}
                      onClick={handleSaveSlides}
                      className="sm:ml-auto flex items-center justify-center gap-1.5 rounded-lg bg-[#E41F26] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-600 active:scale-98 transition disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Save Banners & Publish"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 3: REGISTERED USERS ================= */}
            {activeTab === "users" && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Registered Customer Accounts</h2>
                  <p className="text-xs text-neutral-400 mb-6">List of all customers who have created an account/logged in on the site.</p>
                </div>

                <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/20">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                        <th className="px-6 py-4">Customer Name</th>
                        <th className="px-6 py-4">Email Address</th>
                        <th className="px-6 py-4">Registration Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {users.map((u, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition">
                          <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                          <td className="px-6 py-4 text-neutral-300">{u.email}</td>
                          <td className="px-6 py-4 text-neutral-400">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            }) : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {users.length === 0 && (
                    <div className="text-center py-12">
                      <User className="mx-auto h-10 w-10 text-neutral-500 mb-2" />
                      <p className="text-sm text-neutral-400">No registered customers yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateY(-1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
