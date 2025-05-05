import { CartProduct } from "@/types/types";

export const loadCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        }
    } catch (error) {
        console.error(error);
    }
}

export const saveCartToLocalStorage = (cart: CartProduct[]) => {
    try {
        const cartString = JSON.stringify(cart);
        localStorage.setItem("cart", cartString);
    } catch (error) {
        console.error(error);
    }
};