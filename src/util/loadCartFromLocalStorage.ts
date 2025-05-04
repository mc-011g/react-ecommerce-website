import { CartProduct } from "@/types/types";
import debounce from "lodash.debounce";

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

export const saveCartToLocalStorage = debounce((cart: CartProduct[]) => {
    try {
        const cartString = JSON.stringify(cart);
        localStorage.setItem("cart", cartString);
    } catch (error) {
        console.error(error);
    }
}, 200);