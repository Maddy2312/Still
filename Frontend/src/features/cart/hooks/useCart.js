import { useDispatch } from "react-redux";
import {
  addItemToCart,
  decrementUpdateCartQuantity,
  getCart,
  incrementUpdateCartQuantity,
} from "../services/cart.api.js";
import {
  decrementCartByOne,
  incrementCartByOne,
  setCart,
} from "../state/cart.slice.js";

const useCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = async ({ productId, variantId, quantity }) => {
    try {
      const response = await addItemToCart({ productId, variantId, quantity });
    } catch (error) {
      throw error;
    }
  };

  const handleGetCart = async () => {
    try {
      const response = await getCart();
      dispatch(setCart(response.cart));
    } catch (error) {
      throw error;
    }
  };

  const handleIncrementUpdateCartQuantity = async ({
    productId,
    variantId,
  }) => {
    try {
      const response = await incrementUpdateCartQuantity({
        productId,
        variantId,
      });
      dispatch(incrementCartByOne({ productId, variantId }));
    } catch (error) {
      throw error;
    }
  };

  const handleDecrementUpdateCartQuantity = async ({
    productId,
    variantId,
  }) => {
    try {
      const response = await decrementUpdateCartQuantity({
        productId,
        variantId,
      });
      dispatch(decrementCartByOne({ productId, variantId }));
    } catch (error) {
      throw error;
    }
  };

  return {
    handleAddToCart,
    handleGetCart,
    handleIncrementUpdateCartQuantity,
    handleDecrementUpdateCartQuantity,
  };
};

export default useCart;
