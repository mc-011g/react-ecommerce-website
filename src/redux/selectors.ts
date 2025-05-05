import { CartProduct, User } from "@/types/types";

export const getCart = (state: { cart: { value: CartProduct[] } }) => state.cart.value || [];

export const getUser = (state: { user: { value: User } }) => state.user?.value || null;