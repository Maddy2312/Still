import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
})

export const registerUser = async (userData) => {
    const response = await authApiInstance.post("/register", userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await authApiInstance.post("/login", userData);
    return response.data;
}