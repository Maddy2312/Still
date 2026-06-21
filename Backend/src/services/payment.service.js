import Razorpay from "razorpay";
import { config } from "../config/config.js";
const razorpay = new Razorpay({
    key_id : config.Razorpay_API_KEY,
    key_secret: config.Razorpay_KEY_SECRET,
})

export const createOrder = async ({ amount, currency = "USD"}) => {
try {
    const options = {
        amount: amount*100,
        currency: currency,
        receipt: `receipt_order_${Date.now()}`,
        payment_capture: '1', // 1 for auto capture, 0 for manual
    };
    
    const order = await razorpay.orders.create(options);
    return order;

} catch (error) {
    throw error;
}
}