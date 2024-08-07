import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = ({ records }) => {

    const [products, setProducts] = useState([]);
    const [filterSizes, setFilterSizes] = useState([]);
    const [filterColors, setFilterColors] = useState([]);
    const [filterPrices, setFilterPrices] = useState([]);

    const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5",
        "12", "12.5", "13", "13.5", "14", "14.5", "15"];
    const priceRanges = [{ min: 0, max: 50 }, { min: 50, max: 100 }, { min: 100, max: 150 }, { min: 150, max: 200 }, { min: 200, max: 500 }];
    const colors = ["White", "Black", "Red", "Grey", "Green", "Beige"];


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

    const filtersSelected = () => {
        if (filterColors.length > 0 || filterPrices.length > 0 || filterSizes.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const filterList = () => {
        let newList = [...records];

        if (filterColors.length > 0 || filterPrices.length > 0 || filterSizes.length > 0) {
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
        }
        setProducts(newList);
    }

    useEffect(() => {
        filterList();
    }, [filterColors, filterPrices, filterSizes]);

    return (
        <div className="container mt-5">
            <div className="row">
                <h1 className="mb-5">Products ({((products.length === 0) && (filtersSelected === false)) ? records.length : products.length})</h1>
                <div className="col-3">
                    <h2 className="mb-5">Filters</h2>
                    <div className="mt-3">
                        <b>Price</b>
                        <div className="mt-3 d-flex flex-column">
                            {priceRanges.map(priceRange =>
                                <label key={priceRange}>
                                    <input type="checkbox" className="me-2" onChange={e => handlePriceRangeFilter(priceRange, e.target.checked)} />
                                    ${priceRange.min} - ${priceRange.max}
                                </label>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div>
                        <b>Size</b>
                        <div className="mt-3 d-flex flex-wrap gap-2">
                            {sizes.map(size =>
                                <div className={`sizeBox rounded ${filterSizes.find(item => item === size) && 'sizeBoxSelected'} `} key={size} onClick={e => handleSizeFilter(size)}>
                                    {size}
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div>
                        <b>Color</b>
                        <div className="mt-3 d-flex flex-column">
                            {colors.map(color =>
                                <label key={color}>
                                    <input type="checkbox" className="me-2" value={color} onChange={e => handleColorFilter(e.target.value, e.target.checked)} />
                                    {color}
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className="products col-9">
                    {filtersSelected() === false &&
                        records.map((product) => (
                            <Link to={`/product-page/${(product._id)}`}
                                key={product._id}
                                className='product my-3'>
                                <div className="product-img-container">
                                    <img src={product.imageURL} className="product-img" alt="" />
                                </div>
                                <span className="product-title">{product.name}</span>
                                <div className="product-price">${product.price}</div>
                            </Link>
                        ))}
                    {filtersSelected() === true &&
                        products.map((product) => (
                            <Link to={`/product-page/${(product._id)}`}
                                key={product._id}
                                className='product my-3'>
                                <div className="product-img-container">
                                    <img src={product.imageURL} className="product-img" alt="" />
                                </div>
                                <span className="product-title">{product.name}</span>
                                <div className="product-price">${product.price}</div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;