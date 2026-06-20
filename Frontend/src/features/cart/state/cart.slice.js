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
    }
})

export const { setCart } = cartSlice.actions;