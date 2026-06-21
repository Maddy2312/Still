import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct.js";
import { useNavigate } from "react-router";

const LUXURY_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }
  .dash-card:hover .dash-line { width: 100%; }
  .dash-line { width: 0; height: 1px; background: rgba(255,255,255,0.2); transition: width 0.5s cubic-bezier(.4,0,.2,1); }
`;

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
      handleGetSellerProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b09] text-stone-100 font-sans">
      <style>{LUXURY_STYLES}</style>

      {/* ─── PAGE HEADER ─── */}
      <div className="border-b border-stone-800 bg-[#0c0b09] pt-28 pb-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-3">
              Maison de Parfum · Seller Portal
            </p>
            <h1
              className="font-serif-luxury text-5xl md:text-6xl uppercase text-white leading-none"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              Atelier
            </h1>
            <p className="font-sans-luxury text-stone-500 text-[10px] tracking-[0.3em] uppercase mt-4">
              {products?.length ?? 0} Creation{products?.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => navigate("/seller/create-product")}
            className="font-sans-luxury text-[9px] tracking-[0.45em] uppercase border border-stone-700 hover:border-stone-300 text-stone-300 hover:text-white px-8 py-4 transition-all duration-300 hover:bg-stone-800/30"
          >
            + New Creation
          </button>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">

        {!products || products.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-40 border border-stone-800 bg-[#0f0e0b] text-center">
            <span className="text-stone-700 text-4xl mb-8">◈</span>
            <h2
              className="font-serif-luxury text-3xl uppercase text-stone-400 mb-4"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              The atelier is empty
            </h2>
            <p className="font-sans-luxury text-stone-600 text-[10px] tracking-[0.3em] uppercase mb-10">
              Begin your creative journey
            </p>
            <button
              onClick={() => navigate("/seller/create-product")}
              className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase border-b border-stone-600 hover:border-stone-300 text-stone-400 hover:text-white pb-1 transition-all"
            >
              Create your first fragrance
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product, idx) => (
              <div key={product._id} className="dash-card group flex flex-col">

                {/* Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#161410] mb-5">
                  <img
                    src={product.images[0]?.url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600"}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 left-3 bg-[#0c0b09]/80 backdrop-blur-sm px-2 py-1 font-sans-luxury text-[8px] tracking-widest uppercase text-stone-400">
                    Live
                  </div>
                </div>

                {/* Info */}
                <p className="font-sans-luxury text-[8px] tracking-[0.4em] uppercase text-stone-600 mb-2">
                  Eau de Parfum
                </p>
                <h3
                  className="font-serif-luxury text-lg uppercase text-stone-200 mb-2 leading-tight group-hover:text-white transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  {product.title}
                </h3>
                <div className="dash-line mb-3" />
                <p className="font-sans-luxury text-xs text-stone-500 mb-1 line-clamp-1">
                  {product.description}
                </p>
                <p className="font-sans-luxury text-xs text-stone-400 mb-5">
                  {product.price?.currency || "USD"} {product.price?.amount || "—"}
                </p>

                {/* Actions */}
                <div className="flex gap-5 border-t border-stone-800 pt-4 mt-auto">
                  <button
                    onClick={() => navigate(`/seller/product/${product._id}`)}
                    className="font-sans-luxury text-[9px] tracking-[0.3em] uppercase text-stone-500 hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <span className="text-stone-800">·</span>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="font-sans-luxury text-[9px] tracking-[0.3em] uppercase text-stone-500 hover:text-red-400 transition-colors"
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
