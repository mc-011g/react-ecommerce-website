import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SearchPage = ({ products }) => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let searchText = params.get("search");

        if (searchText) {
            const searchedProducts = products.filter((product) =>
                ((product.name).toLowerCase()).includes(searchText.toLowerCase())
            );

            setSearchResults(searchedProducts);
        }
    }, [products, location.search])

    return (
        <div className="container mt-5">
            <h1>Search Results</h1>
            <div className="products my-3">
                {searchResults.length > 0 ?
                    <>
                        {searchResults.map((product) => (
                            <>
                                <Link to={`/product-page/${(product._id)}`} className="product">
                                    <img src={product.imageURL} className="product-img" alt="Product" />
                                    <div className="m-3">
                                        <span className="product-title">{product.name}</span>
                                        <div className="product-price">${product.price}</div>
                                    </div>
                                </Link>
                            </>
                        ))}
                    </>
                    :
                    <>
                        No products found.
                    </>
                }
            </div>
        </div>
    );
};

export default SearchPage;