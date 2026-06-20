import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    handleGetProductById,
    handleCreateProductVariant,
    handleDeleteProductVariant,
  } = useProduct();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [variantData, setVariantData] = useState({
    stock: "",
    priceAmount: "",
    priceCurrency: "USD",
    color: "",
    size: "",
  });

  const [variantImages, setVariantImages] = useState([]);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await handleGetProductById(id);

        const safeProduct = {
          ...data,
          images: data?.images ?? [],
          variants: data?.variants ?? [],
        };

        setProduct(safeProduct);
        setSelectedImage(safeProduct.images?.[0]?.url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600");
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setVariantData({
      ...variantData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE VARIANT
  const handleVariantSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("stock", variantData.stock);
      formData.append("priceAmount", variantData.priceAmount);
      formData.append("priceCurrency", variantData.priceCurrency);

      formData.append(
        "attributes",
        JSON.stringify({
          color: variantData.color,
          size: variantData.size,
        })
      );

      variantImages.forEach((file) => {
        formData.append("images", file);
      });

      const res = await handleCreateProductVariant(id, formData);

      const createdVariant = res?.variant || res?.data?.variant || res;

      if (!createdVariant) return;

      setProduct((prev) => ({
        ...prev,
        variants: [...(prev?.variants ?? []), createdVariant],
      }));

      setVariantData({
        stock: "",
        priceAmount: "",
        priceCurrency: "USD",
        color: "",
        size: "",
      });

      setVariantImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE VARIANT
  const handleDeleteVariant = async (variantId) => {
    try {
      await handleDeleteProductVariant(id, variantId);

      setProduct((prev) => ({
        ...prev,
        variants: prev.variants.filter((v) => v._id !== variantId),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#FAF9F6] dark:bg-[#0a0a0a] text-stone-500">
        <div className="animate-pulse tracking-[0.2em] uppercase text-sm">Loading Workspace...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0a0a0a] min-h-screen font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800 pt-24 md:pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-6">
           <h1 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">Product Workspace</h1>
           <p className="text-stone-500 text-[10px] tracking-[0.2em] uppercase mt-2">Manage Details & Variants</p>
        </div>

        {/* TOP: PRODUCT INFO */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20 bg-white dark:bg-[#121212] p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
          
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-[3/4] bg-stone-50 dark:bg-stone-900 flex items-center justify-center rounded-2xl border border-stone-100 dark:border-stone-800 p-4">
              <img
                src={selectedImage}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                alt="Product"
              />
            </div>
            
            <div className="flex gap-4 mt-6">
              {product?.images?.map((img) => (
                <button
                  key={img._id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`w-16 h-20 border rounded-xl overflow-hidden p-1 bg-white dark:bg-stone-900 transition-all ${selectedImage === img.url ? 'border-stone-900 dark:border-stone-100' : 'border-stone-200 dark:border-stone-700'}`}
                >
                  <img src={img.url} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl font-serif tracking-wide mb-4">{product?.title}</h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-lg">{product?.description}</p>
            <div className="inline-block border border-stone-200 dark:border-stone-700 rounded-full px-6 py-2 text-sm tracking-widest">
              {product?.price?.currency || "$"} {product?.price?.amount || "0.00"}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: ADD VARIANT FORM */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#121212] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 sticky top-32">
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-8">Add New Variant</h3>

              <form onSubmit={handleVariantSubmit} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400">Stock</label>
                    <input name="stock" type="number" value={variantData.stock} onChange={handleChange} placeholder="e.g. 50" className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-2 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400">Price</label>
                    <input name="priceAmount" type="number" step="0.01" value={variantData.priceAmount} onChange={handleChange} placeholder="e.g. 120" className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-2 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400">Currency</label>
                    <select name="priceCurrency" value={variantData.priceCurrency} onChange={handleChange} className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-2 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors cursor-pointer">
                      <option className="bg-white dark:bg-stone-900" value="USD">USD</option>
                      <option className="bg-white dark:bg-stone-900" value="EUR">EUR</option>
                      <option className="bg-white dark:bg-stone-900" value="GBP">GBP</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400">Size / Volume</label>
                    <input name="size" value={variantData.size} onChange={handleChange} placeholder="e.g. 100ml" className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-2 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400">Color (Optional)</label>
                  <input name="color" value={variantData.color} onChange={handleChange} placeholder="e.g. Black" className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-2 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400">Variant Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setVariantImages(Array.from(e.target.files))}
                    className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 dark:file:bg-stone-800 dark:file:text-stone-300 dark:hover:file:bg-stone-700 transition-colors cursor-pointer"
                  />
                  {variantImages.length > 0 && (
                    <p className="text-[10px] text-stone-500 mt-2">{variantImages.length} file(s) selected</p>
                  )}
                </div>

                <button type="submit" className="mt-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-md">
                  Create Variant
                </button>

              </form>
            </div>
          </div>

          {/* RIGHT: EXISTING VARIANTS */}
          <div className="lg:col-span-7">
            <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-8 pl-2">Current Variants</h3>

            {!product?.variants || product.variants.length === 0 ? (
              <div className="p-12 border border-dashed border-stone-300 dark:border-stone-700 rounded-3xl text-center">
                <p className="text-stone-500 text-xs tracking-widest uppercase">No variants created yet</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {product.variants.map((variant) => (
                  <div key={variant._id} className="bg-white dark:bg-[#121212] p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 flex flex-col">
                    
                    <div className="w-full aspect-[3/4] mb-6 bg-stone-50 dark:bg-stone-900 rounded-xl flex items-center justify-center p-4 border border-stone-100 dark:border-stone-800">
                      <img
                        src={variant?.images?.[0]?.url || product?.images?.[0]?.url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600"}
                        className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        alt="Variant"
                      />
                    </div>

                    <div className="flex-1 space-y-3 mb-6">
                      <div className="flex justify-between items-end border-b border-stone-100 dark:border-stone-800 pb-2">
                        <span className="text-[10px] tracking-widest uppercase text-stone-400">Size/Vol</span>
                        <span className="text-sm font-medium">{variant?.attributes?.size || "-"}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-stone-100 dark:border-stone-800 pb-2">
                        <span className="text-[10px] tracking-widest uppercase text-stone-400">Color</span>
                        <span className="text-sm font-medium">{variant?.attributes?.color || "-"}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-stone-100 dark:border-stone-800 pb-2">
                        <span className="text-[10px] tracking-widest uppercase text-stone-400">Stock</span>
                        <span className="text-sm font-medium">{variant.stock}</span>
                      </div>
                      <div className="flex justify-between items-end pb-1">
                        <span className="text-[10px] tracking-widest uppercase text-stone-400">Price</span>
                        <span className="text-sm font-medium">{variant?.price?.currency || "$"} {variant?.price?.amount || "0"}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteVariant(variant._id)}
                      className="w-full text-center text-[10px] tracking-[0.2em] uppercase text-stone-500 hover:text-red-700 dark:hover:text-red-400 transition-colors border border-stone-200 dark:border-stone-700 hover:border-red-700 dark:hover:border-red-400 rounded-xl py-3"
                    >
                      Remove Variant
                    </button>
                    
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;