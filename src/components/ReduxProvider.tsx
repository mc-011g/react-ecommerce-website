"use client";

import { cartSlice, initializeCart } from "@/redux/slices/cartSlice";
import { userSlice } from "@/redux/slices/userSlice";
import { loadCartFromLocalStorage } from "@/util/loadCartFromLocalStorage";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function ReduxProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const cartFromLocalStorage = loadCartFromLocalStorage() || [];
    store.dispatch(initializeCart(cartFromLocalStorage));
  }, []);

  return <Provider store={store}>{children}</Provider>
}