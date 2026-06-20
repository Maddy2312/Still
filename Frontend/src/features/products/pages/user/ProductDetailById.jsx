import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useProduct from "../../hooks/useProduct.js";
import useCart from "../../../cart/hooks/useCart.js";

const exchangeRates = {
  USD: 1,
  EUR: 0.87,
  GBP: 0.75,
};

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

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

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await handleGetProductById(id);

      const safeData = {
        ...data,
        images: data?.images ?? [],
        variants: data?.variants ?? [],
      };

      setProduct(safeData);
      setSelectedImage(safeData.images?.[0]?.url || "");
      setCurrency(safeData.price?.currency || "USD");
      if (safeData.variants.length > 0) {
        setSelectedVariant(safeData.variants[0]);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-stone-500 bg-[#FAF9F6] dark:bg-[#0a0a0a]">
        <div className="animate-pulse tracking-[0.2em] uppercase text-sm">Discovering...</div>
      </div>
    );
  }

  // PRICE LOGIC
  const activePrice = selectedVariant?.price?.amount ?? product.price?.amount ?? 0;
  const activeCurrency = selectedVariant?.price?.currency ?? product.price?.currency ?? "USD";
  const convertedPrice = (activePrice * (exchangeRates[currency] || 1) / (exchangeRates[activeCurrency] || 1)).toFixed(2);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0a0a0a] min-h-screen font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-20">
        
        {/* TOP SECTION: Image + Buy Card */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          
          {/* LEFT: Image Area */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex justify-center items-center h-[500px] md:h-[700px]">
              <img
                src={selectedVariant?.images?.[0]?.url || selectedImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"}
                alt={product.title}
                className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl"
              />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-6 mt-8">
                {product.images.map((image) => (
                  <button
                    key={image._id}
                    onClick={() => {
                      setSelectedImage(image.url);
                      setSelectedVariant(null);
                    }}
                    className={`w-16 h-20 bg-white dark:bg-stone-900 flex items-center justify-center p-2 border transition-all ${
                      selectedImage === image.url ? 'border-stone-900 dark:border-stone-100' : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img src={image.url} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Floating Buy Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white dark:bg-[#121212] rounded-3xl p-8 md:p-10 shadow-sm border border-stone-100 dark:border-stone-800 sticky top-32">
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-3xl font-serif tracking-wide text-stone-900 dark:text-stone-100">{product.title}</h1>
                  <p className="text-stone-500 text-xs tracking-widest uppercase mt-2">Eau de Parfum</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <h2 className="text-2xl font-sans font-light tracking-wide text-stone-900 dark:text-stone-100">
                    {symbols[currency]}{convertedPrice}
                  </h2>
                  <select 
                    value={currency} 
                    onChange={e => setCurrency(e.target.value)}
                    className="text-[10px] uppercase tracking-widest bg-transparent text-stone-400 focus:outline-none cursor-pointer mt-1"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-8 mt-6">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-3">Volume</p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant._id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-5 py-2.5 text-[10px] uppercase tracking-widest border rounded-full transition-all duration-300 ${
                          selectedVariant?._id === variant._id
                            ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                            : "border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-400"
                        }`}
                      >
                        {variant.attributes?.size || variant.attributes?.color || 'Standard'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Action */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => handleAddToCart({ productId: product._id, variantId: selectedVariant?._id, quantity })}
                  className="w-full h-full py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] tracking-[0.2em] uppercase rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-lg hover:shadow-xl dark:shadow-stone-900/50 cursor-pointer "
                >
                  Add to Cart
                </button>
              </div>

              {/* Accordions */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-2">
                <details className="group cursor-pointer py-4 border-b border-stone-100 dark:border-stone-800">
                  <summary className="flex justify-between items-center text-[10px] tracking-widest uppercase text-stone-600 dark:text-stone-400 list-none [&::-webkit-details-marker]:hidden">
                    How it works <span className="transition group-open:rotate-45 text-stone-400">+</span>
                  </summary>
                  <p className="text-sm text-stone-500 leading-relaxed pt-4 pb-2">
                    Spray generously onto pulse points. Avoid rubbing the fragrance into the skin as it alters the scent notes.
                  </p>
                </details>
                <details className="group cursor-pointer py-4 border-b border-stone-100 dark:border-stone-800">
                  <summary className="flex justify-between items-center text-[10px] tracking-widest uppercase text-stone-600 dark:text-stone-400 list-none [&::-webkit-details-marker]:hidden">
                    Shipping & Returns <span className="transition group-open:rotate-45 text-stone-400">+</span>
                  </summary>
                  <p className="text-sm text-stone-500 leading-relaxed pt-4 pb-2">
                    Complimentary standard shipping and returns. We also offer express and overnight shipping options at checkout.
                  </p>
                </details>
              </div>

            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Scent Intel & Composition Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          
          {/* Card 1: Scent Intel */}
          <div className="bg-white dark:bg-[#121212] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6">Scent Intel</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <span className="text-stone-400 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg> Brand</span>
                <span className="text-stone-800 dark:text-stone-200 text-right">Still</span>
              </li>
              <li className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <span className="text-stone-400 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg> Concentration</span>
                <span className="text-stone-800 dark:text-stone-200 text-right">Eau de Parfum</span>
              </li>
              <li className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <span className="text-stone-400 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg> Gender</span>
                <span className="text-stone-800 dark:text-stone-200 text-right">Unisex</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Composition */}
          <div className="bg-white dark:bg-[#121212] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 text-center flex flex-col items-center">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 self-start">Composition</h3>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-8 self-start text-left leading-relaxed">Warning: ingredients are updated regularly. This is a general olfactory pyramid.</p>
            
            <div className="flex flex-col items-center justify-center w-full max-w-[200px] mt-auto">
              <div className="w-full text-center border-b border-stone-100 dark:border-stone-800 pb-3 mb-3">
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">Top Notes</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">Cardamom</p>
              </div>
              <div className="w-full text-center border-b border-stone-100 dark:border-stone-800 pb-3 mb-3">
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">Heart Notes</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">Lavender, Iris</p>
              </div>
              <div className="w-full text-center pb-2">
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">Base Notes</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">Vanilla, Wood</p>
              </div>
            </div>
          </div>

          {/* Card 3: Reviews */}
          <div className="bg-white dark:bg-[#121212] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-6 mb-8 border-b border-stone-100 dark:border-stone-800 pb-6">
              <div className="text-5xl font-serif text-stone-900 dark:text-stone-100">4.5</div>
              <div>
                <div className="flex text-stone-800 dark:text-stone-200 mb-1">
                  ★★★★<span className="text-stone-300 dark:text-stone-700">★</span>
                </div>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest">128 Reviews</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#FAF9F6] dark:bg-[#0a0a0a] p-5 rounded-2xl">
                <div className="flex text-[10px] mb-3 text-stone-800 dark:text-stone-200">★★★★★</div>
                <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400 italic">"Absolutely stunning fragrance. It stays on my skin all day and the dry down is magical."</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-4">— Sophie T.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailById;