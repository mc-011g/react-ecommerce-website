import { Product } from "../types/types";
import { fetchProducts } from "./fetchProducts";

describe("fetchProducts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch all products", async () => {

        const mockProducts: Product[] = [{
            imageURL: "testLink",
            _id: "680a198933eb81eef9aac66g",
            name: "Product 56",
            price: 80,
            category: "Shoes",
            colors: ["Black"],
            sizes: [{ size: "9", priceId: "" }],
            quantity: 16,
            images: ["testLink"]
        },
        {
            imageURL: "testLink",
            _id: "680a198933eb81eef9aac66f",
            name: "Product 78",
            price: 100,
            category: "Boots",
            colors: ["White"],
            sizes: [{ size: "8", priceId: "test" }],
            quantity: 12,
            images: ["testLink"]
        }];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: mockProducts })
            })
        ) as jest.Mock;

        const result = await fetchProducts();

        expect(result).toEqual(mockProducts);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`,
            { cache: "no-store" }
        );

    });
});