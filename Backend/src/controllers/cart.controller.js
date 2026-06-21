import mongoose from "mongoose";
import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.schema.js";
import productModel from "../models/product.model.js";
import { getCartDao } from "../dao/cart.dao.js";
import paymentModel from "../models/payment.model.js";
import { createOrder } from "../services/payment.service.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    console.log(productId, variantId);
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
    if (quantity > (await stockOfVariant(productId, variantId))) {
      return res.status(400).json({
        success: false,
        message: "Stock limit exceeded",
      });
    }

    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
      price: product.price,
    });
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = req.user;
    let cart = await getCartDao(user._id);
    if (!cart) {
      cart = await cartModel.create({
        user: user._id,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const incrementUpdateCartQuantity = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const stock = await stockOfVariant(productId, variantId);

    const itemQuantityInCart =
      cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId,
      )?.quantity || 0;

    if (!itemQuantityInCart) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (itemQuantityInCart + 1 > stock) {
      return res.status(400).json({
        success: false,
        message: "Stock limit exceeded",
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      {
        $inc: {
          "items.$.quantity": 1,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Item quantity incremented successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const decrementUpdateCartQuantity = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await cartModel.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemQuantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId,
    )?.quantity;

    if (!itemQuantityInCart) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (itemQuantityInCart - 1 < 1) {
      return res.status(400).json({
        success: false,
        message: "Item quantity should be at least 1",
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      {
        $inc: {
          "items.$.quantity": -1,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createOrderController = async (req, res) => {
  try {
    const cart = await getCartDao(req.user._id);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const order = await createOrder({
      amount: cart.totalPrice,
      currency: cart.currency,
    });
    await paymentModel.create({
      user: req.user._id,
      price: {
        amount: cart.totalPrice,
        currency: cart.currency,
      },
      razorpay: {
        orderId: order.id,
      },
      orderItems: cart.items.map((item) => {
        return {
          title: item.product.title,
          productId: item.product._id,
          variantId: item.variant._id,
          quantity: item.quantity,
          price: {
            amount: item.product.variants.price.amount || item.product.price.amount,
            currency: item.product.variants.price.currency || item.product.price.currency,
          },
          images: item.product.variants.images || item.product.images,
          description: item.product.description,
        };
      }),
    });

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyOrderController = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const order = await paymentModel.findOne({
      "razorpay.orderId": razorpayOrderId,
      status: "PENDING",
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isValid = validatePaymentVerification({
      order_id: razorpayOrderId,
      payment_id: razorpayPaymentId,
    }, razorpaySignature, config.Razorpay_KEY_SECRET)

    if(!isValid) {
      order.status = "FAILED"
      await order.save()
      return res.status(400).json({
        success: false,
        message: "Invalid payment",
      });
    }

    order.status = "COMPLETED"
    order.razorpay.paymentId = razorpayPaymentId
    order.razorpay.signature = razorpaySignature
    await order.save()
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}