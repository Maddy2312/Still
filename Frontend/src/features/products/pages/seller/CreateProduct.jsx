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
    <div className="max-w-xl mx-auto p-6 shadow rounded bg-white">
      <h1 className="text-2xl font-bold mb-5">
        Create Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">
            Price
          </label>

          <input
            type="number"
            name="priceAmount"
            value={formData.priceAmount}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block mb-1">
            Currency
          </label>

          <select
            name="priceCurrency"
            value={formData.priceCurrency}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1">
            Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;