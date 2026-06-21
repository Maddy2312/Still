import { useState } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useNavigate } from "react-router";

const LUXURY_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }
  .luxury-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: #e7e5e4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    padding-bottom: 12px;
    outline: none;
    width: 100%;
    transition: border-color 0.3s;
    letter-spacing: 0.05em;
  }
  .luxury-input::placeholder { color: rgba(255,255,255,0.18); }
  .luxury-input:focus { border-bottom-color: rgba(255,255,255,0.5); }
  .luxury-select {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: #e7e5e4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    padding-bottom: 12px;
    outline: none;
    width: 100%;
    cursor: pointer;
    letter-spacing: 0.05em;
  }
  .luxury-select option { background: #0c0b09; color: #e7e5e4; }
  .drop-zone { border: 1px dashed rgba(255,255,255,0.12); transition: all 0.3s; }
  .drop-zone:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.02); }
`;

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      images.forEach((image) => data.append("images", image));
      const response = await handleCreateProduct(data);
      setFormData({ title: "", description: "", priceAmount: "", priceCurrency: "USD" });
      setImages([]);
      if (response.success) navigate("/seller/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b09] text-stone-100">
      <style>{LUXURY_STYLES}</style>

      {/* ─── HEADER ─── */}
      <div className="border-b border-stone-800 pt-28 pb-12 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/seller/dashboard")}
            className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-600 hover:text-stone-300 transition-colors mb-8 flex items-center gap-2"
          >
            ← Back to Atelier
          </button>
          <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-3">
            Seller Portal
          </p>
          <h1
            className="font-serif-luxury text-5xl md:text-6xl uppercase text-white leading-none"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            New Creation
          </h1>
          <p className="font-sans-luxury text-stone-500 text-[10px] tracking-[0.3em] uppercase mt-4">
            Add to your collection
          </p>
        </div>
      </div>

      {/* ─── FORM ─── */}
      <div className="max-w-2xl mx-auto px-8 md:px-0 py-16">
        <form onSubmit={handleSubmit} className="flex flex-col gap-14">

          {/* Title */}
          <div className="flex flex-col gap-3">
            <label className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500">
              Fragrance Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Midnight Orchid"
              className="luxury-input"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <label className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500">
              Story & Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the fragrance story, notes, and character..."
              className="luxury-input resize-none"
              required
            />
          </div>

          {/* Price & Currency */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <label className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500">
                Price
              </label>
              <input
                type="number"
                name="priceAmount"
                step="0.01"
                value={formData.priceAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="luxury-input"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500">
                Currency
              </label>
              <select
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleChange}
                className="luxury-select"
              >
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
              </select>
            </div>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-4">
            <label className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500">
              Product Images
            </label>
            <div className="relative drop-zone rounded-none p-12 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="pointer-events-none flex flex-col items-center gap-4">
                <span className="text-stone-700 text-2xl">✦</span>
                <p className="font-sans-luxury text-sm text-stone-400">
                  Click or drag images here
                </p>
                <p className="font-sans-luxury text-[9px] tracking-widest uppercase text-stone-600">
                  {images.length > 0
                    ? `${images.length} image${images.length > 1 ? "s" : ""} selected`
                    : "PNG, JPG — up to 10MB each"}
                </p>
              </div>
            </div>

            {/* Preview thumbnails */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-2">
                {Array.from(images).map((file, i) => (
                  <div key={i} className="aspect-square bg-[#161410] overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-stone-800" />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="font-sans-luxury w-full border border-stone-700 hover:border-stone-300 text-stone-300 hover:text-white text-[9px] tracking-[0.5em] uppercase py-5 transition-all duration-300 hover:bg-stone-800/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Publish Creation"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;