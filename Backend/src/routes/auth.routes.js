import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);
authRouter.post("/login", loginValidator, loginUser);
authRouter.get("/getUser", authenticateUser, getUser);

export default authRouter;