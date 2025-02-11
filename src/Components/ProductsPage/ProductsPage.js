import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsPage = ({ records }) => {
    const { specifiedCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterSizes, setFilterSizes] = useState([]);
    const [filterColors, setFilterColors] = useState([]);
    const [filterPrices, setFilterPrices] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);

    const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5",
        "12", "12.5", "13", "13.5", "14", "14.5", "15"];
    const priceRanges = [{ min: 0, max: 50 }, { min: 50, max: 100 }, { min: 100, max: 150 }, { min: 150, max: 200 }, { min: 200, max: 500 }];
    const colors = ["White", "Black", "Red", "Grey", "Green", "Beige", "Blue", "Brown", "Orange", "Yellow"];
    const categories = ["Shoes", "Athletic", "Boots"];

    const handlePriceRangeFilter = (value, checked) => {
        let selectedPrices = [...filterPrices];
        if (checked === true) {
            selectedPrices = [...selectedPrices, value];
        } else {
            selectedPrices = selectedPrices.filter(price => price.min !== value.min);
        }
        setFilterPrices(selectedPrices);
    }

    const handleSizeFilter = (value) => {
        let selectedSizes = [...filterSizes];
        let checked = selectedSizes.find(item => item === value);

        if (!checked) {
            selectedSizes = [...selectedSizes, value];
        } else {
            selectedSizes = selectedSizes.filter(size => size !== value);
        }
        setFilterSizes(selectedSizes);
    }

    const handleColorFilter = (value, checked) => {
        let selectedColors = [...filterColors];
        if (checked === true) {
            selectedColors = [...selectedColors, value];
        } else {
            selectedColors = selectedColors.filter(color => color !== value);
        }
        setFilterColors(selectedColors);
    }

    const handleCategoryFilter = (value) => {
        let selectedCategories = [...filterCategories];
        let checked = selectedCategories.find(item => item === value);

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
        if (records && records.length > 0) {
            let newList = records;

            if (specifiedCategory) {
                newList = records.filter(product => product.category === specifiedCategory);          
            }

            setProducts(newList);
        }
    }, [records, specifiedCategory]);

    useEffect(() => {
        if (products && products.length > 0) {
            let newList = [...products];      

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
                setFilteredProducts(products);
            }
        }


    }, [filterColors, filterPrices, filterSizes, filterCategories]);

    return (
        <div className="container">
            <div className="row">
                <h1 className="my-5 d-flex">
                    <div className="me-2">
                        {specifiedCategory === "Athletic" && "Athletic Shoes"}
                        {specifiedCategory === "Shoes" && "Shoes"}
                        {specifiedCategory === "Boots" && "Boots"}
                        {specifiedCategory === undefined && "All Products"}
                    </div>
                    ({products.length})
                </h1>

                <div className="col-sm-3">
                    <h2>Filters</h2>
                    <hr />

                    <div className="filter-container mt-4 mb-5">
                        {!specifiedCategory &&
                            <div className="filter-section">
                                <b>Category</b>
                                <div className="d-flex mt-3 flex-column">
                                    {categories.map(category =>
                                        <label key={category}>
                                            <input type="checkbox" className="me-2" onChange={e => handleCategoryFilter(category, e.target.checked)} />
                                            {category}
                                        </label>
                                    )}
                                </div>
                            </div>
                        }

                        <div className="filter-section">
                            <b>Price</b>
                            <div className="d-flex mt-3 flex-column">
                                {priceRanges.map((priceRange, index) =>
                                    <label key={index}>
                                        <input type="checkbox" className="me-2" onChange={e => handlePriceRangeFilter(priceRange, e.target.checked)} />
                                        ${priceRange.min} - ${priceRange.max}
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="filter-section">
                            <b>Size</b>
                            <div className="d-flex mt-3 flex-wrap gap-2">
                                {sizes.map(size =>
                                    <div className={`sizeBox ${filterSizes.find(item => item === size) && 'sizeBoxSelected'} `} key={size} onClick={e => handleSizeFilter(size)}>
                                        {size}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="filter-section">
                            <b>Color</b>
                            <div className="d-flex mt-3 flex-column">
                                {colors.map(color =>
                                    <label key={color}>
                                        <input type="checkbox" className="me-2" value={color} onChange={e => handleColorFilter(e.target.value, e.target.checked)} />
                                        {color}
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="products col-sm-9">
                    {(!filtersSelected() && products.length > 0) && products.map((product) => (
                        <Link to={`/product-page/${(product._id)}`}
                            key={product._id}
                            className='product my-3'>

                            <img src={product.imageURL} className="product-img" alt="" />
                            <div className="m-3">
                                <span className="product-title">{product.name}</span>
                                <div className="product-price">${product.price}</div>
                            </div>
                        </Link>
                    ))}

                    {(filtersSelected() && filteredProducts.length > 0) && filteredProducts.map((product) => (
                        <Link to={`/product-page/${(product._id)}`}
                            key={product._id}
                            className='product my-3'>

                            <img src={product.imageURL} className="product-img" alt="" />
                            <div className="m-3">
                                <span className="product-title">{product.name}</span>
                                <div className="product-price">${product.price}</div>
                            </div>
                        </Link>
                    ))}

                    {(filtersSelected() && filteredProducts.length === 0) && <>No products matching the selected filters.</>}
                </div>
            </div>
        </div >
    );
}

export default ProductsPage;