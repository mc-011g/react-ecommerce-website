import { Product } from "../types/types";
import { fetchSearchResults } from "./fetchSearchResults";

describe("fetchSearchResults", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch all products that match a search query", async () => {

        const mockSearchQuery: string = "3";

        const mockSearchResultsProducts: Product[] = [{
            imageURL: "testLink",
            _id: "667197f9bdb811be15f18a9f",
            name: "Product 3",
            price: 80,
            category: "Shoes",
            colors: ["Black"],
            sizes: [{ size: "9", priceId: "" }],
            quantity: 16,
            images: ["testLink"]
        },
        {
            imageURL: "testLink",
            _id: "67a6b56b7ca7f8c364f831e2",
            name: "Product 13",
            price: 100,
            category: "Boots",
            colors: ["White"],
            sizes: [{ size: "8", priceId: "test" }],
            quantity: 12,
            images: ["testLink"]
        },
        {
            imageURL: "testLink",
            _id: "67a81a4d002744e338ec9949",
            name: "Product 30",
            price: 75,
            category: "Boots",
            colors: ["White"],
            sizes: [{ size: "8", priceId: "test" }],
            quantity: 12,
            images: ["testLink"]
        }];

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: mockSearchResultsProducts })
            })
        ) as jest.Mock;

        const result = await fetchSearchResults(mockSearchQuery);

        expect(result).toEqual(mockSearchResultsProducts);

        expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/search?search=${encodeURIComponent(mockSearchQuery)}`,
            { cache: "no-store" }
        );

    });

});