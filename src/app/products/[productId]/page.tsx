import { fetchProduct } from "@/util/fetchProduct";
import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";
import { Product } from "@/types/types";

export const dynamic = 'force-dynamic';

type Params = {
    productId: string;
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {

    const { productId } = await params;

    try {
        const product: Product = await fetchProduct(productId);

        return (
            <ProductDetails initialProduct={product} />
        );
    } catch (error) {
        console.error(error);
        notFound();     
    }
}