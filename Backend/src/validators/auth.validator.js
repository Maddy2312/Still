import { body, validationResult } from "express-validator";
import userModel from "../models/user.model.js";

const valiadate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, errors: errors.array()});
    }
    next();
}

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body("contact").notEmpty().withMessage("Contact is required").isLength({min: 10}).withMessage("Contact must be at least 10 digits long"),
    body("role").notEmpty().withMessage("Role is required").isIn(["buyer", "seller"]).withMessage("Invalid role"),
    valiadate
]

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    valiadate
]