import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdminLogin = user?.user?.email.includes("aryan") ? true : false;

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: isAdminLogin,
    }),
  devTools: true,
});