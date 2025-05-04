import { fetchSearchResults } from "@/util/fetchSearchResults";
import SearchResultsClient from "./SearchResultsClient";
import { Product } from "@/types/types";

type Params = {
    search: string;
}

export default async function SearchResultsPage({ searchParams }: { searchParams: Promise<Params> }) {

    const searchQuery = (await searchParams).search;

    if (!searchQuery) {
        return (
            <div>
                <h1>No search query provided</h1>
            </div>
        );
    }

    const initialProducts: Product[] = await fetchSearchResults(searchQuery);

    return (
        <SearchResultsClient searchQuery={searchQuery} initialProducts={initialProducts} />
    );
}