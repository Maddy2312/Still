import React, { useEffect } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const products = useSelector((state) => state.product.products) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Featured Products
        </h1>
        <p className="text-gray-500 mb-8">
          Discover the latest collection
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
            onClick={() => navigate(`/product/${product._id}`)}
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Details */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.title}
                </h2>

                <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <div>
                    <p className="text-2xl font-bold text-black">
                      {product.price.currency} {product.price.amount}
                    </p>
                  </div>

                  <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;