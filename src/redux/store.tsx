import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdminLogin = user?.user?.email.toLowerCase().includes("aryan") ? true : false;

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: isAdminLogin,
});