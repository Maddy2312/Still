import axios from "axios";

export const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true,
})

export const addItemToCart = async({productId, variantId, quantity}) => {
    try {
        const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, { quantity: 1, })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCart = async() => {
    try {
        const response = await cartApiInstance.get("/getCart", {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const incrementUpdateCartQuantity = async({productId, variantId}) => {
    try {
        const response = await cartApiInstance.patch(`/quantity/increment/${productId}/${variantId}`, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const decrementUpdateCartQuantity = async({productId, variantId}) => {
    try {
        const response = await cartApiInstance.patch(`/quantity/decrement/${productId}/${variantId}`, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async() => {
    try {
        const response = await cartApiInstance.post("/payment/create/order", {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const verifyOrder = async({razorpayOrderId, razorpayPaymentId, razorpaySignature}) => {
    try {
        const response = await cartApiInstance.post("/payment/verify/order", {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
        }, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}