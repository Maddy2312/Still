import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/products",
    withCredentials: true
})

export const createProduct = async (productData) => {
    const response = await productApiInstance.post("/create", productData);
    return response.data;
}

export const getSellerProducts = async () => {
    const response = await productApiInstance.get("/getSellerProducts");
    return response.data;
}

export const getProductById = async (id) => {
    const response = await productApiInstance.get(`/getProduct/${id}`);
    return response.data;
}