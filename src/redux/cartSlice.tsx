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
    deleteFromCart: (state, action) => {
      const itemIdToDelete = action.payload.id;
      const indexToDelete = state.findIndex((item:any) => item.id === itemIdToDelete);

      if (indexToDelete !== -1) {
        state.splice(indexToDelete, 1);
      }
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
