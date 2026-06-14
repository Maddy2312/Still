import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;
    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency,
      },
      images,
      seller: seller.id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
