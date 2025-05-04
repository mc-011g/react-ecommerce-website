import { fetchProducts } from "@/util/fetchProducts";
import ProductsList from "@/components/ProductsList";
import { Product } from "@/types/types";


export default async function ProductsPage() {

    try {
        const products: Product[] = await fetchProducts();

        return (
            <ProductsList products={products} heading={"All Products"} />
        );
    } catch (error) {
        console.error("Failed to load products: ", error);
    }
}