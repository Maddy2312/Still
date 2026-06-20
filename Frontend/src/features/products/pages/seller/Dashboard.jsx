import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct.js";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { handleGetSellerProducts, handleDeleteProduct } = useProduct();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await handleDeleteProduct(id);
      // Refresh products after deleting
      handleGetSellerProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0a0a0a] min-h-screen font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800 pt-24 md:pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-stone-200 dark:border-stone-800 pb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase text-stone-900 dark:text-stone-100">
              Atelier
            </h1>
            <p className="text-stone-500 text-[10px] tracking-[0.2em] uppercase mt-4">
              Manage your creations
            </p>
          </div>
          {/* A sleek placeholder button if the seller needs to add products. Assuming the route is /seller/product/new or similar, you can hook this up later. */}
          <button className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-md hover:shadow-lg dark:shadow-stone-900/50">
            Create Product
          </button>
        </div>

        {/* Content */}
        {!products || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-stone-200 dark:border-stone-800 rounded-3xl bg-white dark:bg-[#121212] shadow-sm text-center">
            <h2 className="text-2xl font-serif tracking-widest uppercase mb-4 text-stone-900 dark:text-stone-100">
              The atelier is empty
            </h2>
            <p className="text-stone-500 text-xs tracking-[0.2em] uppercase mb-8">
              Begin your creative journey
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col items-center text-center"
              >
                {/* Product Image */}
                <div className="w-full aspect-[3/4] mb-6 overflow-hidden bg-white dark:bg-stone-900 flex items-center justify-center p-4 border border-stone-100 dark:border-stone-800 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={product.images[0]?.url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600"}
                    alt={product.title}
                    className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Product Details */}
                <h3 className="text-base font-serif tracking-widest uppercase mb-2 group-hover:text-stone-500 transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-stone-500 dark:text-stone-400 text-[10px] tracking-[0.2em] uppercase mb-3 line-clamp-1 px-4">
                  {product.description}
                </p>
                
                <p className="text-sm font-light tracking-widest text-stone-800 dark:text-stone-200">
                  {product.price?.currency || "$"} {product.price?.amount || "0"}
                </p>

                {/* Mobile-Safe Actions */}
                <div className="flex gap-6 mt-6 w-full justify-center border-t border-stone-200 dark:border-stone-800 pt-4">
                  <button
                    onClick={() => navigate(`/seller/product/${product._id}`)}
                    className="text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    Edit Form
                  </button>
                  <span className="text-stone-300 dark:text-stone-700">|</span>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-red-800 dark:hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
