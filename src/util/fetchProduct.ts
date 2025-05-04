import { Product } from "@/types/types";

export async function fetchProduct(_id: string): Promise<Product> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${_id}`, {
        cache: "no-store",
    });

    const { data, message } = await response.json();

    if (!response.ok) {
        throw new Error(message);
    }

    return data;
}