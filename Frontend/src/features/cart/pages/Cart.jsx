import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart.js";
import { Link } from "react-router";

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const Cart = () => {
  const {
    handleGetCart,
    handleIncrementUpdateCartQuantity,
    handleDecrementUpdateCartQuantity,
  } = useCart();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    handleGetCart();
  }, []);

  const currencySymbol = symbols[cart.currency] || "$";
  const isEmpty = !cart.items || cart.items.length === 0;

  // ✅ FIX: safe fallback so no crash
  const items = Array.isArray(cart.items) ? cart.items : [];

  // ✅ FIX: live total calculation (NO UI CHANGE)
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = item.price?.amount || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [items]);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0a0a0a] min-h-screen font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800 pt-24 md:pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase mb-16 text-center md:text-left">
          Shopping Bag
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-[#121212] rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm text-center">
            <h2 className="text-2xl font-serif tracking-wide mb-4">
              Your bag is empty
            </h2>
            <p className="text-stone-500 text-[10px] mb-8 tracking-widest uppercase">
              Discover our collections
            </p>
            <Link
              to="/"
              className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] tracking-[0.2em] uppercase px-8 py-4 rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* ITEMS LIST */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {items.map((item) => {
                const product = item.product;

                const imageUrl =
                  product?.variants?.images?.[0]?.url ||
                  product?.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300";

                const variantSize =
                  product?.variants?.attributes?.size ||
                  product?.variants?.attributes?.color ||
                  "Standard";

                // ✅ FIX: always use correct price.amount
                const price = item.price?.amount || 0;

                return (
                  <div
                    key={item._id}
                    className="flex gap-6 pb-8 border-b border-stone-200 dark:border-stone-800 last:border-0 relative group"
                  >
                    <div className="w-28 md:w-36 bg-white dark:bg-stone-900 aspect-[3/4] flex items-center justify-center p-2 rounded-xl border border-stone-100 dark:border-stone-800">
                      <img
                        src={imageUrl}
                        alt={product?.title || "Product"}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-base md:text-lg font-serif tracking-widest uppercase">
                            {product?.title}
                          </h3>
                          <button className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors text-xl leading-none">
                            &times;
                          </button>
                        </div>
                        <p className="text-stone-500 text-[10px] tracking-widest uppercase mb-4">
                          Volume: {variantSize}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1.5 bg-stone-50/50 dark:bg-stone-900/50">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) return; // ❌ STOP at 1

                              handleDecrementUpdateCartQuantity({
                                productId: product?._id,
                                variantId: item.variant,
                              });
                            }}
                            className="text-stone-400 hover:text-stone-900 px-2"
                          >
                            -
                          </button>
                          <span className="mx-2 text-xs font-medium w-4 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => {
                              const stock = item.product?.variants?.stock || 0;

                              if (item.quantity >= stock) return; // ❌ STOP at stock

                              handleIncrementUpdateCartQuantity({
                                productId: product?._id,
                                variantId: item.variant,
                              });
                            }}
                            className="text-stone-400 hover:text-stone-900 px-2"
                          >
                            +
                          </button>
                        </div>

                        {/* ✅ FIX: live price update */}
                        <p className="font-sans font-medium tracking-wide">
                          {`${currencySymbol}${(price * item.quantity).toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white dark:bg-[#121212] rounded-3xl p-8 md:p-10 shadow-sm border border-stone-100 dark:border-stone-800 sticky top-32">
                <h2 className="text-lg font-serif tracking-widest uppercase mb-8 pb-4 border-b border-stone-100 dark:border-stone-800">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Subtotal</span>
                    <span className="font-medium tracking-wide">
                      {currencySymbol}
                      {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500">Shipping</span>
                    <span className="uppercase text-[10px] tracking-widest">
                      Complimentary
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-500">Tax</span>
                    <span className="uppercase text-[10px] tracking-widest">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-200 dark:border-stone-800 pt-6 mb-8 flex justify-between items-end">
                  <span className="font-serif tracking-widest uppercase">
                    Total
                  </span>
                  <span className="text-2xl font-sans font-light tracking-wide">
                    {currencySymbol}
                    {totalPrice.toFixed(2)}
                  </span>
                </div>

                <button className="w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-lg">
                  Secure Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
