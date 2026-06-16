import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const variantSchema = new mongoose.Schema(
  {
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    attributes: {
      type: Map,
      of: String,
    },
    price: {
      type: priceSchema,
    },
  },
);

export default variantSchema;
