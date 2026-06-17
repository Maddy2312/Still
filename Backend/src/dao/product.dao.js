import productModel from "../models/product.model.js";

export const stockOfVariant = async (productId, variantId) => {
    try {
        const product = await productModel.find({
            _id: productId,
            "variants.": variantId
        });

        const stock = product.variants.find(variant => variant._id.toString() === variantId).stock;
        return stock
    } catch (error) {
        throw error
    }
}