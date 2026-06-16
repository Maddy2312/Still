import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct";

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

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await handleGetProductById(id);

      setProduct(data);
      setSelectedImage(data.images?.[0]?.url);
      setCurrency(data.price.currency);
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

  const convertedPrice = (
    product.price.amount *
    exchangeRates[currency] /
    exchangeRates[product.price.currency]
  ).toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>

            {/* Main image */}
            <div className="rounded-3xl overflow-hidden border bg-gray-100">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-[650px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-5">
              {product.images.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt=""
                  onClick={() => setSelectedImage(image.url)}
                  className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 transition ${
                    selectedImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <h1 className="text-5xl font-bold mb-3">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              ⭐⭐⭐⭐⭐
              <span className="text-gray-500">
                (125 Reviews)
              </span>
            </div>

            <p className="text-gray-600 leading-8 text-lg mb-8">
              {product.description}
            </p>

            {/* Price Card */}
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

            {/* Quantity */}
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

            {/* Buttons */}
            <div className="flex gap-5 mb-10">

              <button className="flex-1 bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition">
                Add to Cart
              </button>

              <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition">
                Buy Now
              </button>

            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-5">

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold mb-3">
                  Shipping
                </h3>

                <p className="text-gray-500">
                  Free delivery within 3-5 business days.
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold mb-3">
                  Returns
                </h3>

                <p className="text-gray-500">
                  30-day hassle-free returns.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailById;
