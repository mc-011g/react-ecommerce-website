import { CartProduct } from '@/types/types';
import { saveCartToLocalStorage } from '@/util/loadCartFromLocalStorage';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: CartProduct[] } = {
    value: [],
};

export const cartSliceDef = {
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state: { value: CartProduct[]; }, action: { payload: CartProduct; }) => {
            const product = state.value.find(product => product._id === action.payload._id && product.selectedSize === action.payload.selectedSize);

            if (product && product.quantity < 11 && action.payload.quantity < 11) {
                product.quantity += action.payload.quantity;
            } else if (!product && state.value.length < 20) {
                state.value = [...state.value, action.payload];
            }

            saveCartToLocalStorage(JSON.parse(JSON.stringify(state.value)));
        },
        removeProductFromCart: (state: { value: CartProduct[]; }, action: { payload: { _id: string, selectedSize: string }; }) => {
            state.value = state.value.filter(product => product._id !== action.payload._id || product.selectedSize !== action.payload.selectedSize);
            saveCartToLocalStorage(state.value);
        },
        updateProductFromCart: (state: { value: CartProduct[]; }, action: { payload: { _id: string, quantity: number, selectedSize: string } }) => {
            const productIndex = state.value.findIndex(product => product._id === action.payload._id && product.selectedSize === action.payload.selectedSize);

            if (productIndex !== -1 && action.payload.quantity < 11) {
                state.value[productIndex] = {
                    ...state.value[productIndex],
                    quantity: action.payload.quantity,
                };
            } else {
                alert("Cannot add more than 10 of the same item to the cart.");
            }

            saveCartToLocalStorage(JSON.parse(JSON.stringify(state.value)));
        },
        initializeCart: (state: { value: CartProduct[] }, action: { payload: CartProduct[] }) => {
            state.value = action.payload;
            saveCartToLocalStorage(JSON.parse(JSON.stringify(state.value)));
        }
    }
};

export const cartSlice = createSlice(cartSliceDef);

export const { addProductToCart, removeProductFromCart, updateProductFromCart, initializeCart } = cartSlice.actions;