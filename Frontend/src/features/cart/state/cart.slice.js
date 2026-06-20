import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: null,
    currency: null,
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
      state.currency = action.payload.currency;
      state.items = action.payload.items;
    },

    incrementCartByOne: (state, action) => {
      state.items = state.items.map((item) => {
        if (
          item.product._id === action.payload.productId &&
          item.variant === action.payload.variantId
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    decrementCartByOne: (state, action) => {
      state.items = state.items.map((item) => {
        if (
          item.product._id === action.payload.productId &&
          item.variant === action.payload.variantId
        ) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});

export const { setCart, incrementCartByOne, decrementCartByOne } =
  cartSlice.actions;

  export default cartSlice.reducer
