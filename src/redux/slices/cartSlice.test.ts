
import { cartSlice, addProductToCart, initializeCart, removeProductFromCart, updateProductFromCart } from "./cartSlice";
import { ObjectId } from "mongodb";
import { CartProduct } from "../../../src/types/types";


describe("cartSlice", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        Object.defineProperty(global, "localStorage", {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });
    });

    const initialState = { value: [] };

    it("adds a product to the cart", () => {

        const product: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product",
            price: 500,
            category: "Boots",
            quantity: 1,
            imageURL: "",
            selectedColor: "Red",
            selectedSize: "11.5",
            priceId: "",
        };

        const result = cartSlice.reducer(initialState, addProductToCart(product));
        expect(result.value).toEqual([product]);

    });

    it("removes a product from the cart", () => {

        const product: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product",
            price: 500,
            category: "Boots",
            quantity: 1,
            imageURL: "",
            selectedColor: "Red",
            selectedSize: "11.5",
            priceId: "",
        };

        const product2: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product2",
            price: 200,
            category: "Shoes",
            quantity: 3,
            imageURL: "",
            selectedColor: "Black",
            selectedSize: "12.5",
            priceId: "",
        };

        const initialState: { value: CartProduct[] } = { value: [product, product2] };

        const result = cartSlice.reducer(initialState,
            removeProductFromCart({ _id: product._id, selectedSize: "11.5" }));

        expect(result.value).toEqual([product2]);
    });


    it("updates a product's existing quantity in the cart", () => {
        const product: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product",
            price: 500,
            category: "Boots",
            quantity: 1,
            imageURL: "",
            selectedColor: "Red",
            selectedSize: "11.5",
            priceId: "",
        };

        const initialState: { value: CartProduct[] } = { value: [product] };

        const result = cartSlice.reducer(initialState,
            updateProductFromCart({ _id: product._id, quantity: 4, selectedSize: product.selectedSize }));
        expect(result.value).toEqual([{ ...product, quantity: 4 }])
    });


    it("initializes the cart with products", () => {
        const product1: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product1",
            price: 75,
            category: "Athletic",
            quantity: 6,
            imageURL: "",
            selectedColor: "Red",
            selectedSize: "11",
            priceId: "",
        };

        const product2: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product2",
            price: 50,
            category: "Shoes",
            quantity: 1,
            imageURL: "",
            selectedColor: "White",
            selectedSize: "10",
            priceId: "",
        };

        const product3: CartProduct = {
            _id: new ObjectId().toHexString(),
            name: "Test Product3",
            price: 350,
            category: "Boots",
            quantity: 3,
            imageURL: "",
            selectedColor: "Black",
            selectedSize: "12",
            priceId: "",
        };

        const result = cartSlice.reducer(initialState,
            initializeCart([product1, product2, product3]));

        expect(result.value).toEqual([product1, product2, product3]);
    });

});