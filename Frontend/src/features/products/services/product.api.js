import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "/api/products",
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

export const getAllProducts = async () => {
    const response = await productApiInstance.get("/getAllProducts");
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await productApiInstance.delete(`/deleteProduct/${id}`);
    return response.data;
}

export const createProductVariant = async (id, variantData) => {
    const response = await productApiInstance.post(`/${id}/variants`, variantData);
    return response.data;
}

export const deleteProductVariant = async (id, variantId) => {
    const response = await productApiInstance.delete(`/${id}/variants/${variantId}`);
    return response.data;
};