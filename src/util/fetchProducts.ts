import { Product } from "@/types/types";

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`, {
        cache: "no-store",
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data;
}