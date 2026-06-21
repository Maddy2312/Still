import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED"],
    default: "PENDING",
  },

  price: {
    type: priceSchema,
    required: true,
  },

  razorpay: {
    orderId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
      title: String,

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      variantId: {
        type: mongoose.Schema.Types.ObjectId,
      },

      quantity: Number,

      price: priceSchema,

      images: [
        {
          url: String,
        },
      ],

      description: String,
    },
  ],
});

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;