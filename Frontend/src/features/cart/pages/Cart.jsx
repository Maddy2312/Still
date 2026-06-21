import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart.js";
import { Link, useNavigate } from "react-router";

const LUXURY_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }
`;

const symbols = { USD: "$", EUR: "€", GBP: "£" };

const Cart = () => {
  const { handleGetCart, handleIncrementUpdateCartQuantity, handleDecrementUpdateCartQuantity } = useCart();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => { handleGetCart(); }, []);

  const currencySymbol = symbols[cart.currency] || "$";
  const isEmpty = !cart.items || cart.items.length === 0;
  const items = Array.isArray(cart.items) ? cart.items : [];

  const totalPrice = useMemo(() =>
    items.reduce((acc, item) => acc + (item.price?.amount || 0) * item.quantity, 0),
    [items]
  );

  return (
    <div className="min-h-screen bg-[#0c0b09] text-stone-100">
      <style>{LUXURY_STYLES}</style>

      {/* ─── HEADER ─── */}
      <div className="border-b border-stone-800 pt-28 pb-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-3">
            Still · Maison de Parfum
          </p>
          <h1
            className="font-serif-luxury text-5xl md:text-6xl uppercase text-white leading-none"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            Your Selection
          </h1>
          <p className="font-sans-luxury text-stone-500 text-[10px] tracking-[0.3em] uppercase mt-4">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">

        {isEmpty ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-40 border border-stone-800 bg-[#0f0e0b] text-center">
            <span className="text-stone-700 text-4xl mb-8">◈</span>
            <h2
              className="font-serif-luxury text-3xl uppercase text-stone-400 mb-4"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              Your selection is empty
            </h2>
            <p className="font-sans-luxury text-stone-600 text-[10px] tracking-[0.3em] uppercase mb-10">
              Discover our collections
            </p>
            <Link
              to="/"
              className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-400 hover:text-white border-b border-stone-600 hover:border-white pb-1 transition-all"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* ─── ITEMS ─── */}
            <div className="lg:col-span-7 flex flex-col">
              {items.map((item, idx) => {
                const product = item.product;
                const imageUrl = product?.variants?.images?.[0]?.url || product?.images?.[0]?.url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300";
                const variantSize = product?.variants?.attributes?.size || product?.variants?.attributes?.color || "Standard";
                const price = item.price?.amount || 0;

                return (
                  <div key={item._id} className={`flex gap-6 py-8 ${idx < items.length - 1 ? "border-b border-stone-800" : ""}`}>

                    {/* Image */}
                    <div
                      className="w-24 md:w-32 aspect-[3/4] overflow-hidden bg-[#161410] flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/product/${product?._id}`)}
                    >
                      <img
                        src={imageUrl}
                        alt={product?.title}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-sans-luxury text-[8px] tracking-[0.4em] uppercase text-stone-600 mb-1">
                              Eau de Parfum
                            </p>
                            <h3
                              className="font-serif-luxury text-xl uppercase text-stone-100 leading-tight"
                              style={{ fontWeight: 300 }}
                            >
                              {product?.title}
                            </h3>
                          </div>
                          <button className="text-stone-700 hover:text-stone-300 transition-colors text-lg leading-none ml-4">
                            ×
                          </button>
                        </div>
                        <p className="font-sans-luxury text-stone-600 text-[9px] tracking-widest uppercase mt-2">
                          Volume: {variantSize}
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        {/* Qty Controls */}
                        <div className="flex items-center border border-stone-800 hover:border-stone-600 transition-colors">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) return;
                              handleDecrementUpdateCartQuantity({ productId: product?._id, variantId: item.variant });
                            }}
                            className="font-sans-luxury px-4 py-2 text-stone-500 hover:text-white transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="font-sans-luxury px-3 py-2 text-xs text-stone-300 min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              const stock = item.product?.variants?.stock || 99;
                              if (item.quantity >= stock) return;
                              handleIncrementUpdateCartQuantity({ productId: product?._id, variantId: item.variant });
                            }}
                            className="font-sans-luxury px-4 py-2 text-stone-500 hover:text-white transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-sans-luxury text-stone-200 text-sm tracking-wide">
                          {currencySymbol}{(price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─── ORDER SUMMARY ─── */}
            <div className="lg:col-span-5">
              <div className="border border-stone-800 p-8 md:p-10 sticky top-28 bg-[#0f0e0b]">
                <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-8">
                  Order Summary
                </p>

                <div className="space-y-5 mb-8">
                  {[
                    { label: "Subtotal", value: `${currencySymbol}${totalPrice.toFixed(2)}` },
                    { label: "Shipping", value: "Complimentary" },
                    { label: "Tax", value: "Calculated at checkout" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-stone-800 pb-5">
                      <span className="font-sans-luxury text-[9px] tracking-widest uppercase text-stone-600">{row.label}</span>
                      <span className="font-sans-luxury text-xs text-stone-300">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end mb-10">
                  <span
                    className="font-serif-luxury text-2xl uppercase text-white"
                    style={{ fontWeight: 300 }}
                  >
                    Total
                  </span>
                  <span className="font-sans-luxury text-xl text-stone-100">
                    {currencySymbol}{totalPrice.toFixed(2)}
                  </span>
                </div>

                <button className="font-sans-luxury w-full border border-stone-700 hover:border-stone-300 text-stone-300 hover:text-white text-[9px] tracking-[0.5em] uppercase py-5 transition-all duration-300 hover:bg-stone-800/20 mb-4">
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <Link
                    to="/"
                    className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-600 hover:text-stone-300 transition-colors"
                  >
                    Continue shopping
                  </Link>
                </div>

                {/* Assurances */}
                <div className="mt-10 pt-8 border-t border-stone-800 space-y-3">
                  {["Complimentary shipping & returns", "Secure & encrypted checkout", "Satisfaction guaranteed"].map((text, i) => (
                    <p key={i} className="font-sans-luxury text-[9px] tracking-widest uppercase text-stone-600 flex items-center gap-3">
                      <span className="text-stone-700">✦</span> {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
