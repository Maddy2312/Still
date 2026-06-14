import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct.js";

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();

  const products = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={product.images[0]?.url}
                alt={product.title}
                className="w-full h-60 object-cover"
              />

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>

                <p className="text-gray-600 mt-2">{product.description}</p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    {product.price.amount} {product.price.currency}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
