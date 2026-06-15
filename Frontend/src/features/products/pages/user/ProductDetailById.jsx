import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct.js";

const ProductDetailById = () => {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await handleGetProductById(id);
      setProduct(data);
      setSelectedImage(data.images?.[0]?.url);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">

        {/* Images */}
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full rounded-3xl shadow-lg object-cover"
          />

          <div className="flex gap-4 mt-4">
            {product.images.map((image) => (
              <img
                key={image._id}
                src={image.url}
                alt=""
                className="w-24 h-24 rounded-xl object-cover cursor-pointer border-2 hover:border-black"
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-500 text-lg mb-6">
            {product.description}
          </p>

          <div className="text-3xl font-bold mb-8">
            {product.price.currency} {product.price.amount}
          </div>

          <div className="flex gap-4">
            <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
              Add to Cart
            </button>

            <button className="border border-black px-8 py-3 rounded-xl hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailById;