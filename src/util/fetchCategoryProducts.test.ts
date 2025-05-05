import { Product } from '../types/types';
import { fetchCategoryProducts } from './fetchCategoryProducts';

describe("fetchCategoryProducts", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch products that are from a specific category", async () => {
        const mockCategory: string = "Shoes";

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

        const result = await fetchCategoryProducts(mockCategory);

        expect(result).toEqual(mockProducts);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/category/${mockCategory}`,
            { cache: "no-store" }
        );
    });
});