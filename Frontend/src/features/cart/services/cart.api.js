import axios from "axios";

export const cartApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/cart",
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