import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
      setCurrency(safeData.price.currency);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  // PRICE LOGIC
  const activePrice =
    selectedVariant?.price?.amount ?? product.price.amount;

  const activeCurrency =
    selectedVariant?.price?.currency ?? product.price.currency;

  const convertedPrice = (
    activePrice *
    exchangeRates[currency] /
    exchangeRates[activeCurrency]
  ).toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>

            {/* MAIN IMAGE */}
            <div className="rounded-3xl overflow-hidden border bg-gray-100">
              <img
                src={
                  selectedVariant?.images?.[0]?.url ||
                  selectedImage
                }
                alt={product.title}
                className="w-full h-[650px] object-cover"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-4 mt-5">
              {product.images.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  onClick={() => {
                    setSelectedImage(image.url);
                    setSelectedVariant(null); // reset variant image override
                  }}
                  className="w-24 h-24 rounded-xl object-cover cursor-pointer border-2"
                />
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <h1 className="text-5xl font-bold mb-3">
              {product.title}
            </h1>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            {/* VARIANTS SECTION */}
            <div className="mb-8">
              <h3 className="font-bold mb-3">
                Available Variants
              </h3>

              {product.variants.length === 0 ? (
                <p className="text-gray-500">
                  No variants available
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-3">

                  {product.variants.map((variant) => (
                    <div
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border p-4 rounded-xl cursor-pointer transition ${
                        selectedVariant?._id === variant._id
                          ? "border-black bg-gray-100"
                          : "border-gray-300"
                      }`}
                    >

                      <img
                        src={variant?.images?.[0]?.url}
                        className="h-24 w-full object-cover rounded-lg mb-2"
                      />

                      <p className="font-semibold">
                        {variant.attributes?.color} /{" "}
                        {variant.attributes?.size}
                      </p>

                      <p className="text-sm text-gray-500">
                        Stock: {variant.stock}
                      </p>

                      <p className="text-sm font-bold">
                        {variant.price.amount}{" "}
                        {variant.price.currency}
                      </p>

                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* PRICE */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-8">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500 mb-2">
                    Price
                  </p>

                  <h2 className="text-5xl font-bold text-green-600">
                    {symbols[currency]}
                    {convertedPrice}
                  </h2>
                </div>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border p-3 rounded-xl"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>

              </div>

            </div>

            {/* QUANTITY */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    quantity > 1 && setQuantity(quantity - 1)
                  }
                  className="border w-12 h-12 rounded-xl"
                >
                  -
                </button>

                <span className="text-xl font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border w-12 h-12 rounded-xl"
                >
                  +
                </button>

              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-5 mb-10">

              <button onClick={() => handleAddToCart({productId: product._id, variantId: selectedVariant._id, quantity})} className="flex-1 bg-black text-white py-4 rounded-2xl">
                Add to Cart
              </button>

              <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl">
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailById;