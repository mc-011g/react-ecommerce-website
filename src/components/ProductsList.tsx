"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LargeProductCard from "@/components/LargeProductCard";
import { Product } from "@/types/types";

export default function ProductsList({ products, heading }: { products: Product[], heading: string }) {

    const [updatedProducts, setUpdatedProducts] = useState<Product[]>(products);

    useEffect(() => {
        setUpdatedProducts(products);
    }, [products]);

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filterSizes, setFilterSizes] = useState<string[]>([]);
    const [filterColors, setFilterColors] = useState<string[]>([]);
    const [filterPrices, setFilterPrices] = useState<{ min: number; max: number; }[]>([]);
    const [filterCategories, setFilterCategories] = useState<string[]>([]);
    const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5",
        "12", "12.5", "13", "13.5", "14", "14.5", "15"];
    const priceRanges = [{ min: 0, max: 50 }, { min: 50, max: 100 }, { min: 100, max: 150 }, { min: 150, max: 200 }, { min: 200, max: 500 }];
    const colors = ["White", "Black", "Red", "Grey", "Green", "Beige", "Blue", "Brown", "Orange", "Yellow"];
    const categories = ["shoes", "athletic", "boots"];

    const handlePriceRangeFilter = (value: { min: number; max: number; }, checked: boolean) => {
        let selectedPrices = [...filterPrices];
        if (checked === true) {
            selectedPrices = [...selectedPrices, value];
        } else {
            selectedPrices = selectedPrices.filter(price => price.min !== value.min);
        }
        setFilterPrices(selectedPrices);
    }

    const handleSizeFilter = (value: string) => {
        let selectedSizes = [...filterSizes];
        const checked = selectedSizes.find(item => item === value);

        if (!checked) {
            selectedSizes = [...selectedSizes, value];
        } else {
            selectedSizes = selectedSizes.filter(size => size !== value);
        }

        setFilterSizes(selectedSizes);
    }

    const handleColorFilter = (value: string, checked: boolean) => {
        let selectedColors = [...filterColors];
        if (checked === true) {
            selectedColors = [...selectedColors, value];
        } else {
            selectedColors = selectedColors.filter(color => color !== value);
        }
        setFilterColors(selectedColors);
    }

    const handleCategoryFilter = (value: string, checked: boolean | unknown) => {
        let selectedCategories = [...filterCategories];
        checked = selectedCategories.find(item => item === value);

        if (!checked) {
            selectedCategories = [...selectedCategories, value];
        } else {
            selectedCategories = selectedCategories.filter(category => category !== value);
        }
        setFilterCategories(selectedCategories);
    }

    const filtersSelected = () => {
        if (filterColors.length > 0 || filterPrices.length > 0 || filterSizes.length > 0 || filterCategories.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (updatedProducts && updatedProducts.length > 0) {
            let newList = [...updatedProducts];

            if (filterColors.length > 0 || filterPrices.length > 0 || filterSizes.length > 0
                || filterCategories.length > 0
            ) {
                if (filterColors.length > 0) {
                    newList = newList.filter(product => filterColors.some(color => product.colors.includes(color)));
                }
                if (filterSizes.length > 0) {
                    newList = newList.filter(product => filterSizes.some(size => product.sizes.some(product => product.size === size)));
                }
                if (filterPrices.length > 0) {
                    newList = newList.filter(product => filterPrices.some(priceRange =>
                        ((product.price >= priceRange.min) && (product.price <= priceRange.max))
                    ));
                }
                if (filterCategories.length > 0) {
                    newList = newList.filter(product => filterCategories.some(category => product.category === category));
                }

                setFilteredProducts(newList);
            } else {
                setFilteredProducts(updatedProducts);
            }
        }
    }, [filterColors, filterPrices, filterSizes, filterCategories, updatedProducts]);

    return (
        <div className="container mx-auto px-4">

            <h1 className="my-5 d-flex text-2xl">
                <div className="me-2 text-2xl">
                    {heading}
                </div>
                ({updatedProducts.length})
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-5 w-full">
                <div className="flex flex-col gap-4 w-full sm:w-1/4">
                    <h2 className="text-lg">Filters</h2>
                    <hr />

                    <div className="mt-4 mb-5 flex sm:flex-col gap-4 flex-wrap">
                        {!heading.startsWith("All") || !heading.startsWith("Search") &&
                            <fieldset className="flex flex-col">
                                <legend className="font-bold">Category</legend>
                                <div className="flex mt-3 flex-col" data-cy="categoryFilters">
                                    {categories.map(category =>
                                        <label key={category}>
                                            <input
                                                type="checkbox"
                                                className="me-2"
                                                onChange={e => handleCategoryFilter(category, e.target.checked)}
                                                aria-label={`Category filter for ${category}`}
                                            />
                                            {category.charAt(0).toUpperCase().concat(category.slice(1))}
                                        </label>
                                    )}
                                </div>
                            </fieldset>
                        }
                        <fieldset className="flex flex-col">
                            <legend className="font-bold">Price</legend>
                            <div className="flex mt-3 flex-col" data-cy="priceFilters">
                                {priceRanges.map((priceRange, index) =>
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            className="me-2"
                                            onChange={e => handlePriceRangeFilter(priceRange, e.target.checked)}
                                            aria-label={`Price filter for ${priceRange}`}
                                        />
                                        ${priceRange.min} - ${priceRange.max}
                                    </label>
                                )}
                            </div>
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <legend className="font-bold">Size</legend>
                            <div className="flex mt-3 flex-wrap gap-2" data-cy="sizeFilters">
                                {sizes.map(size =>
                                    <button
                                        key={size}
                                        data-cy="sizeDiv"
                                        className={`border w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 
                                            ${filterSizes.find(item => item === size) && 'bg-black text-white'}`}
                                        onClick={() => handleSizeFilter(size)}
                                        aria-label={`Sizes filter for ${size}`}
                                    >
                                        {size}
                                    </button>
                                )}
                            </div>
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <legend className="font-bold">Color</legend>
                            <div className="flex mt-3 flex-col" data-cy="colorFilters">
                                {colors.map(color =>
                                    <label key={color}>
                                        <input
                                            type="checkbox"
                                            className="me-2"
                                            value={color}
                                            onChange={e => handleColorFilter(e.target.value, e.target.checked)}
                                            aria-label={`Color filter for ${color}`}
                                        />
                                        {color}
                                    </label>
                                )}
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div className="pb-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:w-3/4 h-min" aria-live="polite">
                    {(!filtersSelected() && updatedProducts.length > 0) && updatedProducts.map((product: Product) => (
                        <Link href={`/products/${(product._id)}`}
                            key={product._id}
                            className='product my-3' data-cy="searchResultsPageProduct">
                            <LargeProductCard
                                name={product.name}
                                price={product.price}
                                imageURL={product.images[0]}
                                alt={product.name}
                            />
                        </Link>
                    ))}

                    {(filtersSelected() && filteredProducts.length > 0) && filteredProducts.map((product: Product) => (
                        <Link href={`/products/${(product._id)}`}
                            key={product._id}
                            className='product my-3'>
                            <LargeProductCard
                                name={product.name}
                                price={product.price}
                                imageURL={product.images[0]}
                                alt={product.name}
                            />
                        </Link>
                    ))}

                    {(filtersSelected() && filteredProducts.length === 0) && <p aria-live="polite">No products matching the selected filters.</p>}
                </div>
            </div>
        </div >
    );
}