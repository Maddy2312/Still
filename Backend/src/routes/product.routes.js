import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, getSellerProducts } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createProductValidator } from "../validators/product.validator.js";

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

productRouter.get("/getSellerProducts", authenticateSeller, getSellerProducts);
productRouter.get("/getProduct/:id", getProductById);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.delete("/deleteProduct/:id", authenticateSeller, deleteProduct);

export default productRouter;
