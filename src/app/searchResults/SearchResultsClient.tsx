"use client";

import { useEffect, useState } from "react";
import ProductsList from "@/components/ProductsList";
import { fetchSearchResults } from "@/util/fetchSearchResults";
import { Product } from "@/types/types";

export default function SearchResultsClient({ searchQuery, initialProducts, }: { searchQuery: string; initialProducts: Product[]; }) {

    const [products, setProducts] = useState<Product[]>(initialProducts);

    useEffect(() => {
        if (searchQuery) {
            const getSearchResults = async () => {
                const searchResults = await fetchSearchResults(searchQuery);
                setProducts(searchResults);
            };
            getSearchResults();
        }
    }, [searchQuery]);

    return (
        <ProductsList products={products} heading={`Search results for ${searchQuery}`} />
    );
}