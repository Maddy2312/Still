import React, { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await handleGetProductById(id);

        setProduct(response);
        setSelectedImage(response.images[0]?.url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="border rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3 mt-4">
            {product.images.map((image) => (
              <img
                key={image._id}
                src={image.url}
                alt={product.title}
                onClick={() => setSelectedImage(image.url)}
                className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === image.url
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          <div className="text-3xl font-semibold text-green-600">
            {product.price.amount} {product.price.currency}
          </div>

          <p className="text-gray-600 leading-7">
            {product.description}
          </p>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">
              Product Information
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Product ID:</strong> {product._id}
              </p>

              <p>
                <strong>Currency:</strong> {product.price.currency}
              </p>

              <p>
                <strong>Price:</strong> {product.price.amount}
              </p>

              <p>
                <strong>Created At:</strong>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;