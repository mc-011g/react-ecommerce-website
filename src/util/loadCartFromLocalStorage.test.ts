import { CartProduct } from "../types/types";
import { loadCartFromLocalStorage } from "./loadCartFromLocalStorage";

describe("loadCartFromLocalStorage", () => {
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

    it("should fetch cart when it exists in localStorage", async () => {

        const mockCart: CartProduct[] = [{
            _id: "1",
            name: "Product 3",
            price: 50,
            category: "Shoes",
            selectedSize: "10.5",
            selectedColor: "Beige",
            quantity: 1,
            imageURL: "test",
            priceId: ""
        },
        {
            _id: "2",
            name: "Product 26",
            price: 100,
            category: "Boots",
            selectedSize: "11",
            selectedColor: "Black",
            quantity: 3,
            imageURL: "test",
            priceId: ""
        }
        ]

        localStorage.getItem = jest.fn(() => JSON.stringify(mockCart));

        const result = loadCartFromLocalStorage();

        expect(result).toEqual(mockCart);

        expect(localStorage.getItem).toHaveBeenCalledWith("cart");

    });
});