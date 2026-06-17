import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.schema.js";
import productModel from "../models/product.model.js";

export const addToCart = async () => {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cart =
      (await cartModel.findOne({
        user: req.user._id,
      })) ||
      (await cartModel.create({
        user: req.user._id,
      }));

    const isProductInCart = cart.items.some(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    );

    if (isProductInCart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId,
      ).quantity;
      if (
        quantityInCart + quantity >
        (await stockOfVariant(productId, variantId))
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Stock limit exceeded" });
      }

      await cartModel.updateOne(
        {
          user: req.user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        {
          $inc: {
            "items.$.quantity": quantity,
          },
        },
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
      });
    }
    if(quantity > (await stockOfVariant(productId, variantId))){
        return res.status(400).json({
            success: false,
            message: "Stock limit exceeded"
        })
    }

    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: product.price,
    })
    await cart.save();

    return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
    })
    
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal server error"
    })
  }
};
