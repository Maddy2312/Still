import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useProduct from "../../hooks/useProduct.js";
import useCart from "../../../cart/hooks/useCart.js";

const LUXURY_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }
  details > summary { list-style: none; }
  details > summary::-webkit-details-marker { display: none; }
  details[open] .acc-icon { transform: rotate(45deg); }
  .acc-icon { transition: transform 0.3s; display: inline-block; }
`;

const exchangeRates = { USD: 1, EUR: 0.87, GBP: 0.75 };
const symbols = { USD: "$", EUR: "€", GBP: "£" };

const ProductDetailById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById } = useProduct();
  const { handleAddToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await handleGetProductById(id);
      const safeData = { ...data, images: data?.images ?? [], variants: data?.variants ?? [] };
      setProduct(safeData);
      setSelectedImage(safeData.images?.[0]?.url || "");
      setCurrency(safeData.price?.currency || "USD");
      if (safeData.variants.length > 0) setSelectedVariant(safeData.variants[0]);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0c0b09] flex flex-col items-center justify-center gap-6">
        <style>{LUXURY_STYLES}</style>
        <span className="text-stone-700 text-3xl animate-pulse">✦</span>
        <p className="font-sans-luxury text-[10px] tracking-[0.5em] uppercase text-stone-500 animate-pulse">
          Discovering...
        </p>
      </div>
    );
  }

  const activePrice = selectedVariant?.price?.amount ?? product.price?.amount ?? 0;
  const activeCurrency = selectedVariant?.price?.currency ?? product.price?.currency ?? "USD";
  const convertedPrice = (activePrice * (exchangeRates[currency] || 1) / (exchangeRates[activeCurrency] || 1)).toFixed(2);

  const handleAddAndAnimate = () => {
    handleAddToCart({ productId: product._id, variantId: selectedVariant?._id, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0c0b09] text-stone-100">
      <style>{LUXURY_STYLES}</style>

      {/* ─── BACK NAV ─── */}
      <div className="fixed top-20 left-8 z-50 hidden md:block">
        <button
          onClick={() => navigate(-1)}
          className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-600 hover:text-stone-300 transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-32">

        {/* ─── MAIN GRID ─── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-28">

          {/* LEFT — Image Gallery */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111009] flex items-center justify-center mb-4">
              <img
                src={selectedVariant?.images?.[0]?.url || selectedImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000"}
                alt={product.title}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-700"
              />
              {/* Subtle corner tag */}
              <div className="absolute top-5 left-5 font-sans-luxury text-[8px] tracking-widest uppercase text-stone-400 bg-[#0c0b09]/60 backdrop-blur-sm px-2 py-1">
                Eau de Parfum
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image) => (
                  <button
                    key={image._id}
                    onClick={() => { setSelectedImage(image.url); setSelectedVariant(null); }}
                    className={`w-16 h-20 overflow-hidden transition-all duration-300 ${
                      selectedImage === image.url
                        ? "opacity-100 ring-1 ring-white/30"
                        : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img src={image.url} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">

              {/* Title & Price */}
              <div className="mb-8 pb-8 border-b border-stone-800">
                <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-4">
                  Still · Maison de Parfum
                </p>
                <h1
                  className="font-serif-luxury text-4xl md:text-5xl uppercase text-white leading-tight mb-6"
                  style={{ fontWeight: 300 }}
                >
                  {product.title}
                </h1>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-sans-luxury text-2xl text-stone-100 tracking-wide">
                      {symbols[currency]}{convertedPrice}
                    </p>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="font-sans-luxury text-[9px] uppercase tracking-widest bg-transparent text-stone-500 hover:text-stone-300 focus:outline-none cursor-pointer border-b border-stone-800 pb-1 transition-colors"
                    style={{ background: "#0c0b09" }}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans-luxury text-stone-400 text-sm leading-relaxed tracking-wide mb-10">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="mb-10">
                  <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-4">Volume</p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant._id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`font-sans-luxury px-5 py-2.5 text-[9px] uppercase tracking-widest border transition-all duration-300 ${
                          selectedVariant?._id === variant._id
                            ? "border-white/60 text-white bg-white/5"
                            : "border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                        }`}
                      >
                        {variant.attributes?.size || variant.attributes?.color || "Standard"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddAndAnimate}
                className={`font-sans-luxury w-full py-5 text-[9px] tracking-[0.5em] uppercase border transition-all duration-500 mb-10 ${
                  added
                    ? "border-stone-300 text-white bg-stone-800/40"
                    : "border-stone-700 text-stone-300 hover:border-stone-300 hover:text-white hover:bg-stone-800/20"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              {/* Accordions */}
              <div className="border-t border-stone-800">
                {[
                  {
                    title: "How it works",
                    body: "Spray generously onto pulse points. Avoid rubbing the fragrance into the skin as it alters the scent notes. Reapply as desired throughout the day.",
                  },
                  {
                    title: "Shipping & Returns",
                    body: "Complimentary standard shipping and returns on all orders. Express and overnight options available at checkout.",
                  },
                  {
                    title: "Ingredients",
                    body: "All fragrances are crafted with the finest ethically sourced ingredients. Full ingredient list available on request.",
                  },
                ].map((item, i) => (
                  <details key={i} className="group border-b border-stone-800 py-4 cursor-pointer">
                    <summary className="flex justify-between items-center">
                      <span className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-400 group-hover:text-stone-200 transition-colors">
                        {item.title}
                      </span>
                      <span className="acc-icon text-stone-600 text-sm font-light group-hover:text-stone-300 transition-colors">+</span>
                    </summary>
                    <p className="font-sans-luxury text-stone-500 text-xs leading-relaxed tracking-wide pt-4 pb-1">
                      {item.body}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── SCENT PROFILE ROW ─── */}
        <div className="grid md:grid-cols-3 gap-px bg-stone-800">
          {/* Card 1: Scent Intel */}
          <div className="bg-[#0c0b09] p-10">
            <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-8">
              Fragrance Profile
            </p>
            <div className="space-y-5">
              {[
                { label: "Brand", value: "Still" },
                { label: "Concentration", value: "Eau de Parfum" },
                { label: "Gender", value: "Unisex" },
                { label: "Longevity", value: "8–12 hours" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-stone-800 pb-5">
                  <span className="font-sans-luxury text-[9px] tracking-widest uppercase text-stone-600">{row.label}</span>
                  <span className="font-sans-luxury text-xs text-stone-300">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Olfactory Pyramid */}
          <div className="bg-[#0c0b09] p-10 flex flex-col">
            <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-8">
              Olfactory Pyramid
            </p>
            <div className="flex-1 flex flex-col gap-6 justify-center">
              {[
                { label: "Top Notes", notes: "Cardamom, Bergamot" },
                { label: "Heart Notes", notes: "Lavender, Iris, Rose" },
                { label: "Base Notes", notes: "Vanilla, Sandalwood, Musk" },
              ].map((tier, i) => (
                <div key={i}>
                  <p className="font-sans-luxury text-[8px] tracking-[0.4em] uppercase text-stone-600 mb-1">{tier.label}</p>
                  <p className="font-serif-luxury text-base text-stone-300 italic" style={{ fontWeight: 300 }}>{tier.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Reviews */}
          <div className="bg-[#0c0b09] p-10">
            <div className="flex items-start gap-5 mb-8 pb-8 border-b border-stone-800">
              <p className="font-serif-luxury text-5xl text-white" style={{ fontWeight: 300 }}>4.5</p>
              <div>
                <div className="flex text-stone-300 text-sm mb-1">
                  ★★★★<span className="text-stone-700">★</span>
                </div>
                <p className="font-sans-luxury text-[9px] tracking-widest uppercase text-stone-600">128 Reviews</p>
              </div>
            </div>
            <div className="border border-stone-800 p-5 bg-[#0f0e0b]">
              <div className="flex text-[10px] text-stone-300 mb-3">★★★★★</div>
              <p className="font-sans-luxury text-xs leading-relaxed text-stone-400 italic mb-4">
                "Absolutely stunning fragrance. It stays on my skin all day and the dry down is magical."
              </p>
              <p className="font-sans-luxury text-[9px] uppercase tracking-widest text-stone-600">— Sophie T.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailById;