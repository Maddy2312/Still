import { useDispatch } from "react-redux";
import {
  addItemToCart,
  createOrder,
  decrementUpdateCartQuantity,
  getCart,
  incrementUpdateCartQuantity,
  verifyOrder,
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

  const handleCreateOrder = async () => {
    try {
      const response = await createOrder();
      return response.order;
    } catch (error) {
      throw error;
    }
  };

  const handleVerifyOrder = async({razorpayOrderId, razorpayPaymentId, razorpaySignature}) => {
    try {
      const response = await verifyOrder({razorpayOrderId, razorpayPaymentId, razorpaySignature})
      return response;
    } catch (error) {
      throw error;
    }
  }
  return {
    handleAddToCart,
    handleGetCart,
    handleIncrementUpdateCartQuantity,
    handleDecrementUpdateCartQuantity,
    handleCreateOrder,
    handleVerifyOrder,
  };
};

export default useCart;
