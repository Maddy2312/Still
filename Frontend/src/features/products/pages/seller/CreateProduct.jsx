import { useState } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useNavigate } from "react-router";


const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "USD",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await handleCreateProduct(data);

      setFormData({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: "USD",
      });

      setImages([]);
      if(response.success){
        navigate("/seller/dashboard")
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0a0a0a] min-h-screen font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800 pt-24 md:pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-6 text-center">
           <h1 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">New Product</h1>
           <p className="text-stone-500 text-[10px] tracking-[0.2em] uppercase mt-4">Add to your collection</p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-[#121212] p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-400">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Noir Elegance"
                className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors placeholder:text-stone-300 dark:placeholder:text-stone-700"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-400">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Describe the product..."
                className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors resize-none placeholder:text-stone-300 dark:placeholder:text-stone-700"
                required
              />
            </div>

            {/* Price & Currency */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400">Price Amount</label>
                <input
                  type="number"
                  name="priceAmount"
                  step="0.01"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors placeholder:text-stone-300 dark:placeholder:text-stone-700"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400">Currency</label>
                <select
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  className="bg-transparent border-b border-stone-300 dark:border-stone-700 pb-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors cursor-pointer"
                >
                  <option className="bg-white dark:bg-stone-900" value="USD">USD</option>
                  <option className="bg-white dark:bg-stone-900" value="EUR">EUR</option>
                  <option className="bg-white dark:bg-stone-900" value="GBP">GBP</option>
                </select>
              </div>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-widest text-stone-400">Product Images</label>
              <div className="relative border border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-8 text-center hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="pointer-events-none">
                  <svg className="mx-auto h-8 w-8 text-stone-300 dark:text-stone-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path></svg>
                  <p className="text-sm font-medium">Click or drag images to upload</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-2">
                    {images.length > 0 ? `${images.length} file(s) selected` : "PNG, JPG up to 10MB"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
            
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default CreateProduct;