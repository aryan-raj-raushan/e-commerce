import { createSlice } from "@reduxjs/toolkit";
const storedCart = localStorage.getItem("cart");
const initialState = storedCart ? JSON.parse(storedCart) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const serializedCartItem = {
        ...action.payload,
      };
      state.push(serializedCartItem);
    },
    deleteFromCart(state, action) {
      return state.filter((item: any) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
