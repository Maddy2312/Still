import { Router } from "express";
import { createProduct, createProductVariant, deleteProduct, deleteProductVariant, getAllProducts, getProductById, getSellerProducts } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createProductValidator, createVariantValidator } from "../validators/product.validator.js";

const productRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

productRouter.post(
  "/create",
  authenticateSeller,
  upload.array("images", 10),
  createProductValidator,
  createProduct,
);
productRouter.post("/:id/variants", authenticateSeller, upload.array("images", 10), createVariantValidator, createProductVariant)

productRouter.get("/getSellerProducts", authenticateSeller, getSellerProducts);
productRouter.get("/getProduct/:id", getProductById);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.delete("/deleteProduct/:id", authenticateSeller, deleteProduct);
productRouter.delete("/:id/variants/:variantId", authenticateSeller, deleteProductVariant)
export default productRouter;
