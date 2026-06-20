import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { quantityValidator, validateAddToCart } from "../validators/cart.validator.js";
import { addToCart, decrementUpdateCartQuantity, getCart, incrementUpdateCartQuantity } from "../controllers/cart.controller.js";

const cartRouter = Router();


cartRouter.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)
cartRouter.get("/getCart", authenticateUser, getCart)
cartRouter.patch("/quantity/increment/:productId/:variantId", authenticateUser, quantityValidator, incrementUpdateCartQuantity)
cartRouter.patch("/quantity/decrement/:productId/:variantId", authenticateUser, quantityValidator, decrementUpdateCartQuantity)

export default cartRouter;