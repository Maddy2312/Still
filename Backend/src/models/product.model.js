import mongoose from "mongoose";
import priceSchema from "./price.schema.js";
import variantSchema from "./variants.schema.js";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: priceSchema,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            alt: {
                type: String
            }
        }
    ],
    variants: {
        type: [variantSchema],
        default: []
    }  
}, {
    timestamps: true
})

const productModel = mongoose.model("Product", productSchema);

export default productModel;