import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state: any, action: any) {
            state.cartItems.push(action.payload);
        },
        updateCart(state:any , action: any) {
            state.cartItems = action.payload;
        },
        emptyCart(state:any , action: any) {
            state.cartItems = []
        }
    },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
