import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../services/product.api.js";
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

    const handleGetSellerProducts = async () => {
        try {
            const data = await getSellerProducts();
            dispatch(setSellerProducts(data.products));
            return data.products;
        } catch (error) {
            throw error;
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts
    }
}

export default useProduct;