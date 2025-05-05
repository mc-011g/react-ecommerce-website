import { Product } from "@/types/types";

export async function fetchSearchResults(searchQuery: string): Promise<Product[]> {

    if (!searchQuery.trim()) {
        return []; // Return an empty array if the search query is empty
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/search?search=${encodeURIComponent(searchQuery)}`, {
        cache: "no-store",
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data;
}

