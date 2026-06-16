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
        setSelectedImage(safeProduct.images?.[0]?.url || "");
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

      const createdVariant =
        res?.variant || res?.data?.variant || res;

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
        variants: prev.variants.filter(
          (v) => v._id !== variantId
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* PRODUCT */}
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={selectedImage}
            className="w-full h-[500px] object-cover rounded-xl"
          />

          <div className="flex gap-3 mt-4">
            {product?.images?.map((img) => (
              <img
                key={img._id}
                src={img.url}
                onClick={() => setSelectedImage(img.url)}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product?.title}</h1>
          <p className="text-gray-600">{product?.description}</p>
          <p className="text-3xl text-green-600 mt-4">
            {product?.price?.amount} {product?.price?.currency}
          </p>
        </div>
      </div>

      {/* VARIANT FORM */}
      <div className="mt-10 border p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Add Variant</h2>

        <form onSubmit={handleVariantSubmit} className="grid gap-4">

          <input name="stock" value={variantData.stock} onChange={handleChange} placeholder="Stock" className="border p-2" />
          <input name="priceAmount" value={variantData.priceAmount} onChange={handleChange} placeholder="Price" className="border p-2" />
          <input name="color" value={variantData.color} onChange={handleChange} placeholder="Color" className="border p-2" />
          <input name="size" value={variantData.size} onChange={handleChange} placeholder="Size" className="border p-2" />

          <select name="priceCurrency" value={variantData.priceCurrency} onChange={handleChange} className="border p-2">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>

          <input
            type="file"
            multiple
            onChange={(e) => setVariantImages(Array.from(e.target.files))}
          />

          <button className="bg-black text-white py-2 rounded">
            Create Variant
          </button>

        </form>
      </div>

      {/* VARIANTS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Variants</h2>

        {product?.variants?.length === 0 ? (
          <p>No variants</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">

            {product?.variants?.map((variant) => (
              <div key={variant._id} className="border p-4 rounded-xl">

                <img
                  src={variant?.images?.[0]?.url}
                  className="h-40 w-full object-cover rounded"
                />

                <p>Stock: {variant.stock}</p>
                <p>Color: {variant?.attributes?.color}</p>
                <p>Size: {variant?.attributes?.size}</p>
                <p>
                  Price: {variant?.price?.amount} {variant?.price?.currency}
                </p>

                <button
                  onClick={() => handleDeleteVariant(variant._id)}
                  className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;