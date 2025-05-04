import { Product } from "@/types/types";

export async function fetchCategoryProducts(categoryName: string): Promise<Product[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/category/${categoryName}`, {
        cache: "no-store",
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data;
}