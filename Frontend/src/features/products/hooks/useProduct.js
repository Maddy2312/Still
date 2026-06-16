import { useDispatch } from "react-redux";
import { createProduct, createProductVariant, deleteProduct, getAllProducts, getProductById, getSellerProducts } from "../services/product.api.js";
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

    const handleGetProductById = async (id) => {
        try {
            const data = await getProductById(id);
            return data.product;
        } catch (error) {
            throw error;
        }
    }

    const handleGetAllProducts = async () => {
        try {
            const data = await getAllProducts();
            dispatch(setProducts(data.products));
            return data.products;
        } catch (error) {
            throw error;
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            const data = await deleteProduct(id);
            return data.message;
        } catch (error) {
            throw error;
        }
    }

    const handleCreateProductVariant = async (id, variantData) => {
        try {
            const data = await createProductVariant(id, variantData);
            return data.product;
        } catch (error) {
            throw error;
        }
    }

    return {
        handleCreateProduct,
        handleGetSellerProducts,
        handleGetProductById,
        handleGetAllProducts,
        handleDeleteProduct,
        handleCreateProductVariant
    }
}

export default useProduct;