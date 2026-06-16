import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const { handleGetProductById, handleCreateProductVariant } = useProduct();

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

  // SUBMIT VARIANT
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

      const newVariant = await handleCreateProductVariant(id, formData);

      console.log("NEW VARIANT RESPONSE:", newVariant);

      const createdVariant =
        newVariant?.variant || newVariant?.data?.variant || newVariant;

      if (!createdVariant) {
        console.error("Variant not returned from API");
        return;
      }

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

      alert("Variant created successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  // LOADING STATE
  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* PRODUCT SECTION */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGES */}
        <div>
          <div className="border rounded-xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product?.title}
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {product?.images?.map((image) => (
              <img
                key={image._id}
                src={image.url}
                alt=""
                onClick={() => setSelectedImage(image.url)}
                className="w-24 h-24 object-cover rounded cursor-pointer border-2"
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">{product?.title}</h1>

          <p className="text-gray-600">{product?.description}</p>

          <div className="text-3xl font-bold text-green-600">
            {product?.price?.amount} {product?.price?.currency}
          </div>
        </div>
      </div>

      {/* VARIANT FORM */}
      <div className="mt-12 border rounded-xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-5">Add Variant</h2>

        <form onSubmit={handleVariantSubmit} className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={variantData.stock}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              name="priceAmount"
              placeholder="Price"
              value={variantData.priceAmount}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="color"
              placeholder="Color"
              value={variantData.color}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="size"
              placeholder="Size"
              value={variantData.size}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

          </div>

          <select
            name="priceCurrency"
            value={variantData.priceCurrency}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <input
            type="file"
            multiple
            onChange={(e) =>
              setVariantImages(Array.from(e.target.files))
            }
            className="border p-3 rounded-lg w-full"
          />

          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Create Variant
          </button>

        </form>
      </div>

      {/* VARIANTS LIST */}
      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-5">Product Variants</h2>

        {product?.variants?.length === 0 ? (
          <p>No variants available</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">

            {product?.variants?.map((variant) => {
              if (!variant) return null;

              return (
                <div
                  key={variant._id}
                  className="border rounded-xl p-5 shadow"
                >
                  <img
                    src={variant?.images?.[0]?.url}
                    className="h-40 w-full object-cover rounded-lg"
                    alt=""
                  />

                  <div className="mt-3 space-y-2">

                    <p>
                      <strong>Stock:</strong> {variant.stock}
                    </p>

                    <p>
                      <strong>Color:</strong>{" "}
                      {variant?.attributes?.color}
                    </p>

                    <p>
                      <strong>Size:</strong>{" "}
                      {variant?.attributes?.size}
                    </p>

                    <p>
                      <strong>Price:</strong>{" "}
                      {variant?.price?.amount} {variant?.price?.currency}
                    </p>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;