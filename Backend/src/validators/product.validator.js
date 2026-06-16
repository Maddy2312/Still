import { body, validationResult } from "express-validator";

const valiadate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, errors: errors.array()});
    }
    next();
}

export const createProductValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").notEmpty().withMessage("Price amount is required"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),
    valiadate
]

export const createVariantValidator = [
    body("stock").notEmpty().withMessage("Stock is required"),
    body("priceAmount").notEmpty().withMessage("Price amount is required"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),
    body("attributes").notEmpty().withMessage("Attributes is required"),
    valiadate
]