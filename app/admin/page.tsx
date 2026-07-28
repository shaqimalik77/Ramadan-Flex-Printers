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
  ChevronDown
} from "lucide-react";
import { 
  loginAdmin, 
  logoutAdmin, 
  checkAdminAuth, 
  getAdminData, 
  saveProduct, 
  deleteProduct, 
  saveSlides 
} from "./actions";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "slides">("products");

  // Data State
  const [loadingData, setLoadingData] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>({
    slug: "",
    category: "ribbons",
    categoryName: "Ribbons",
    title: "",
    images: [""],
    shortDescription: "",
    longDescription: "",
    features: [""],
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

  // Product Form helper handlers
  function handleFieldChange(field: string, value: any) {
    setCurrentProduct({ ...currentProduct, [field]: value });
  }

  function handleNestedChange(field: "images" | "features", index: number, value: string) {
    const arr = [...currentProduct[field]];
    arr[index] = value;
    setCurrentProduct({ ...currentProduct, [field]: arr });
  }

  function addNestedField(field: "images" | "features") {
    setCurrentProduct({ ...currentProduct, [field]: [...currentProduct[field], ""] });
  }

  function removeNestedField(field: "images" | "features", index: number) {
    const arr = currentProduct[field].filter((_: any, i: number) => i !== index);
    setCurrentProduct({ ...currentProduct, [field]: arr.length ? arr : [""] });
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
      categoryName: "Ribbons",
      title: "",
      images: [""],
      shortDescription: "",
      longDescription: "",
      features: [""],
      specifications: [{ key: "", value: "" }],
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
      categoryName: prod.categoryName,
      title: prod.title,
      images: prod.images && prod.images.length ? prod.images : [""],
      shortDescription: prod.shortDescription || "",
      longDescription: Array.isArray(prod.longDescription) 
        ? prod.longDescription.join("\n\n") 
        : prod.longDescription || "",
      features: prod.features && prod.features.length ? prod.features : [""],
      specifications: specsArray.length ? specsArray : [{ key: "", value: "" }],
      faq: prod.faq && prod.faq.length ? prod.faq : [{ question: "", answer: "" }]
    });
    setIsEditingProduct(true);
  }

  async function handleProductSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map specs array back to object
      const specsObj: Record<string, string> = {};
      currentProduct.specifications.forEach((spec: any) => {
        if (spec.key.trim()) {
          specsObj[spec.key.trim()] = spec.value.trim();
        }
      });

      // Filter empty inputs
      const filteredImages = currentProduct.images.filter((img: string) => img.trim() !== "");
      const filteredFeatures = currentProduct.features.filter((f: string) => f.trim() !== "");
      const filteredFaq = currentProduct.faq.filter((f: any) => f.question.trim() !== "" && f.answer.trim() !== "");

      // Split paragraphs
      const longDescParagraphs = currentProduct.longDescription
        .split("\n\n")
        .map((p: string) => p.trim())
        .filter((p: string) => p !== "");

      // Category auto-formatting mapping
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

      const payload = {
        slug: currentProduct.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-"),
        category: currentProduct.category,
        categoryName: categoryNames[currentProduct.category] || currentProduct.category,
        title: currentProduct.title.trim(),
        images: filteredImages.length ? filteredImages : ["/images/logo/logo.png"],
        shortDescription: currentProduct.shortDescription.trim(),
        longDescription: longDescParagraphs,
        features: filteredFeatures,
        specifications: specsObj,
        faq: filteredFaq
      };

      await saveProduct(payload);
      showMsg(`Product "${payload.title}" saved successfully! Auto-deploy triggered.`, "success");
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
    return (
      prod.title.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q) ||
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
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
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
                          placeholder="Search product name, slug, or category..."
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
                                {prod.categoryName || prod.category}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-mono">
                                /{prod.slug}
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
                          {currentProduct.slug ? "Edit Product Details" : "Add New Product"}
                        </h2>
                        <p className="text-xs text-neutral-400">Provide product details. Saved updates will auto-compile.</p>
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
                          Product Title
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

                      {/* Slug */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          URL Slug (Unique identifier)
                        </label>
                        <input
                          type="text"
                          required
                          disabled={!!currentProduct.slug}
                          value={currentProduct.slug}
                          onChange={(e) => handleFieldChange("slug", e.target.value)}
                          placeholder="E.g., matte-business-cards"
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Category Selection */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Category Slug
                        </label>
                        <select
                          value={currentProduct.category}
                          onChange={(e) => handleFieldChange("category", e.target.value)}
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition cursor-pointer"
                        >
                          <option value="ribbons">Ribbons</option>
                          <option value="stickers">Stickers</option>
                          <option value="butter-paper">Butter Paper</option>
                          <option value="jewellery-cards">Jewellery Cards</option>
                          <option value="polaroids">Polaroids</option>
                          <option value="business-cards">Business Cards</option>
                          <option value="label-and-hang-tags">Label & Hang Tags</option>
                          <option value="thankyou-cards">Thank You Cards</option>
                          <option value="fabric-tags">Fabric Tags</option>
                          <option value="ecommerce-boxes">Ecommerce Boxes</option>
                          <option value="standup-pouches">Standup Pouches</option>
                          <option value="hard-drawer-boxes">Hard Drawer Boxes</option>
                          <option value="ziplock-frosted-bags">Ziplock Frosted Bags</option>
                          <option value="courier-flyer-poly-bags">Courier Flyer Poly Bags</option>
                          <option value="wedding-cards">Wedding Cards</option>
                          <option value="mugs">Mugs</option>
                          <option value="shirts">Shirts</option>
                          <option value="neon-signs">Neon Signs</option>
                          <option value="3d-boards">3D Boards</option>
                          <option value="flex-designs">Flex Designs</option>
                          <option value="promotional-products">Promotional Products</option>
                        </select>
                      </div>

                      {/* Short Description */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Short Summary Description (Shown on card grids)
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={currentProduct.shortDescription}
                          onChange={(e) => handleFieldChange("shortDescription", e.target.value)}
                          placeholder="Provide a 1-2 sentence quick highlight of the product..."
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
                      </div>

                      {/* Long Description */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          Long Description Copy (Separate paragraphs with double Enter / blank line)
                        </label>
                        <textarea
                          required
                          rows={8}
                          value={currentProduct.longDescription}
                          onChange={(e) => handleFieldChange("longDescription", e.target.value)}
                          placeholder="Write long form copy paragraphs. Press Enter twice to start a new paragraph..."
                          className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
                      </div>
                    </div>

                    {/* Image URL list */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-sm font-bold text-neutral-200">Product Images (URLs or local paths)</h3>
                        <button
                          type="button"
                          onClick={() => addNestedField("images")}
                          className="flex items-center gap-1 text-xs text-[#00AEEF] font-bold hover:underline cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Image
                        </button>
                      </div>
                      <div className="space-y-2">
                        {currentProduct.images.map((img: string, idx: number) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={img}
                              onChange={(e) => handleNestedChange("images", idx, e.target.value)}
                              placeholder="E.g., /images/products/cards/card-1.png"
                              className="block flex-grow rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                            />
                            <button
                              type="button"
                              onClick={() => removeNestedField("images", idx)}
                              className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-500/10 hover:bg-red-950/70 transition cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-sm font-bold text-neutral-200">Key Features List</h3>
                        <button
                          type="button"
                          onClick={() => addNestedField("features")}
                          className="flex items-center gap-1 text-xs text-[#00AEEF] font-bold hover:underline cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {currentProduct.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleNestedChange("features", idx, e.target.value)}
                              placeholder="E.g., Durable matte double-sided coating"
                              className="block flex-grow rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                            />
                            <button
                              type="button"
                              onClick={() => removeNestedField("features", idx)}
                              className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-500/10 hover:bg-red-950/70 transition cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specifications table */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h3 className="text-sm font-bold text-neutral-200">Product Specifications Table</h3>
                        <button
                          type="button"
                          onClick={addSpecField}
                          className="flex items-center gap-1 text-xs text-[#00AEEF] font-bold hover:underline cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Row
                        </button>
                      </div>
                      <div className="space-y-2">
                        {currentProduct.specifications.map((spec: any, idx: number) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={spec.key}
                              onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                              placeholder="Key: E.g., Card Weight"
                              className="block w-1/3 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                              placeholder="Value: E.g., 350 GSM Art Card"
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
                        <h3 className="text-sm font-bold text-neutral-200">FAQs List</h3>
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
                              className="absolute top-2 right-2 p-1 rounded-lg bg-red-950/40 text-red-400 border border-red-500/10 hover:bg-red-950/70 transition cursor-pointer"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <div className="pr-8">
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                                placeholder="Question: E.g., What is the minimum order quantity?"
                                className="block w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                              />
                            </div>
                            <div>
                              <textarea
                                rows={2}
                                value={faq.answer}
                                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                                placeholder="Answer: E.g., Our minimum order starts at 100 cards..."
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
                          "Save Changes & Push to GitHub"
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
                  <p className="text-xs text-neutral-400 mb-6">Manage full-bleed images on the homepage hero slider. Slide order matches list order.</p>
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

                      {/* Image path */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                          Image Source URL (E.g. /images/hero/slide-1.png)
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

                      {/* Alt text */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                          Accessibility description (Alt tag text)
                        </label>
                        <input
                          type="text"
                          required
                          value={slide.alt}
                          onChange={(e) => handleSlideChange(idx, "alt", e.target.value)}
                          placeholder="Describe the image content..."
                          className="block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:border-[#00AEEF] transition"
                        />
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
                        "Save Banners & Push to GitHub"
                      )}
                    </button>
                  </div>
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
