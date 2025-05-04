import { Product } from '../types/types';
import { fetchProduct } from './fetchProduct';

describe("fetchProduct", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch a product by id", async () => {
        const mockProduct: Product = {
            imageURL: "testLink",
            _id: "680a198933eb81eef9aac66g",
            name: "Product 56",
            price: 80,
            category: "Shoes",
            colors: ["Black"],
            sizes: [{ size: "9", priceId: "" }],
            quantity: 16,
            images: ["testLink"]
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: mockProduct })
            })
        ) as jest.Mock;

        const result = await fetchProduct(mockProduct._id);

        expect(result).toEqual(mockProduct);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${mockProduct._id}`,
            { cache: "no-store" }
        );

    });
});