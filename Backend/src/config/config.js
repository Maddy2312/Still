import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Please provide MONGO_URI in .env file");
}
if(!process.env.PORT){
    throw new Error("Please provide PORT in .env file");
}
if(!process.env.JWT_SECRET){
    throw new Error("Please provide JWT_SECRET in .env file");
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("Please provide IMAGEKIT_PRIVATE_KEY in .env file");
}
if(!process.env.Razorpay_API_KEY){
    throw new Error("Please provide Razorpay_API_KEY in .env file");
}
if(!process.env.Razorpay_KEY_SECRET){
    throw new Error("Please provide Razorpay_KEY_SECRET in .env file");
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    Razorpay_API_KEY: process.env.Razorpay_API_KEY,
    Razorpay_KEY_SECRET: process.env.Razorpay_KEY_SECRET,
}