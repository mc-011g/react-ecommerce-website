import ProductsList from "@/components/ProductsList";
import { Product } from "@/types/types";
import { fetchCategoryProducts } from "@/util/fetchCategoryProducts";
import { notFound } from "next/navigation";

type Params = {
    categoryName: string;
}

export default async function ProductCategoryPage({ params }: { params: Promise<Params> }) {
    const { categoryName } = await params;

    try {
        const products: Product[] = await fetchCategoryProducts(categoryName);

        let heading = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

        if (heading.startsWith("Athletic")) {
            heading = "Athetic Shoes";
        };

        return (
            <ProductsList products={products} heading={heading} />
        );

    } catch (error) {
        console.error(error);
        notFound();
    }
}