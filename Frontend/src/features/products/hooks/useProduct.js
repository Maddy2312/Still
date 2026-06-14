import { useDispatch } from "react-redux";
import { createProduct } from "../services/product.api.js";
import { setSellerProducts, setProducts, setLoading, setError } from "../state/product.state.js";


const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (productData) => {
        try {
            const data = await createProduct(productData);
            return data;
        } catch (error) {
            throw error;
        }
    }

    return {
        handleCreateProduct
    }
}

export default useProduct;