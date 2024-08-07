import React, { useContext, useEffect, useState } from "react";
import './ProductPage.css';
import { ProductContext } from "../CartContext/ProductContext.js";
import { Link } from "react-router-dom";

const ProductPage = ({ products }) => {
    const { cart, setCart } = useContext(ProductContext);
    const [product, setProduct] = useState("");
    const [selectedProductSizeInfo, setSelectedProductSizeInfo] = useState("");
    const [selectedProductColor, setSelectedProductColor] = useState('');
    const [mainProductImage, setMainProductImage] = useState('');
    const [sizeSelected, setSizeSelected] = useState("");

    let url = new URL(document.location.href);
    let urlString = url.toString();
    let lastIndexBeforeId = urlString.lastIndexOf('/');
    let urlProductId = urlString.substring(lastIndexBeforeId + 1);

    useEffect(() => {
        let product = products.find((product) => (product._id === urlProductId));
        setProduct(product);
        setSelectedProductColor(product.colors[0]);
        setMainProductImage('');
        setSelectedProductSizeInfo('');
    }, [urlProductId, products]);

    const changeMainProductImage = (value) => {
        setMainProductImage(value);
    }

    const handleAddProduct = (newProduct) => {
        if (selectedProductSizeInfo === "") {
            setSizeSelected(false);
        } else {
            setSizeSelected(true);
            const existingProduct = cart.find((product) => newProduct._id === product._id);
            let newCart = [];

            if (existingProduct && existingProduct.quantity < 10) {
                newCart = cart.map((product) => {
                    if (existingProduct === product) {
                        product.quantity += 1;
                        return product;
                    } else {
                        return product;
                    }
                });
            } else if (!existingProduct) {
                newCart = [...cart, newProduct];
            } else {
                alert("You cannot add more than 10 of the same products to the cart.");
            }
            if (newCart.length > 0) {
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
            }
        }
    }

    return (
        <div className="container-sm mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3 topProductInformation">
                        <h2>{product.name}</h2>
                        <b>${product.price}</b>
                    </div>

                    <div className="d-flex">
                        <div className="productExtraImages gap-2">
                            <div className="productExtraImage">
                                <img src={product.imageURL} onMouseOver={() => changeMainProductImage(product.imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                            <div className="productExtraImage">
                                <img src={products[2].imageURL} onMouseOver={() => changeMainProductImage(products[2].imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                            <div className="productExtraImage">
                                <img src={products[3].imageURL} onMouseOver={() => changeMainProductImage(products[3].imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                            <div className="productExtraImage">
                                <img src={products[4].imageURL} onMouseOver={() => changeMainProductImage(products[4].imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                            <div className="productExtraImage">
                                <img src={products[5].imageURL} onMouseOver={() => changeMainProductImage(products[5].imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                            <div className="productExtraImage">
                                <img src={products[6].imageURL} onMouseOver={() => changeMainProductImage(products[6].imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                            <div className="productExtraImage">
                                <img src={products[7].imageURL} onMouseOver={() => changeMainProductImage(products[7].imageURL)} className="product-img-large rounded" alt="Product" />
                            </div>
                        </div>
                        <div>
                            <img src={mainProductImage !== '' ? mainProductImage : product.imageURL} className="product-img-large rounded" alt="Product" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column">
                    <div className="rightProductInformation">
                        <h2>{product.name}</h2>
                        <b>${product.price}</b>
                    </div>
                    <div className="my-3">
                        <div className="my-3">
                            <b>Color: </b><span>{selectedProductColor}</span>
                            <div className="d-flex flex-row gap-2 mt-2">
                                {product.colors?.map(color =>
                                    <div className={`productExtraImage productColorSelect rounded ${selectedProductColor === color && 'border border-black'}`}>
                                        <img src={product.imageURL} onClick={() => setSelectedProductColor(color)} className="product-img-large rounded" alt="Product" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <b>Select size (US): </b>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {product.sizes?.map(product =>
                                    <div className={`sizeBox rounded ${(selectedProductSizeInfo.size === product.size) && 'sizeBoxSelected'}`} onClick={() => setSelectedProductSizeInfo({ size: product.size, priceId: product.priceId })}>{product.size}</div>
                                )}
                            </div>
                            {sizeSelected === false &&
                                <div className="text-danger mt-2">
                                    Please select a size.
                                </div>
                            }
                        </div>
                    </div>
                    <button onClick={() => handleAddProduct({ _id: selectedProductSizeInfo.priceId, name: product.name, price: product.price, category: product.category, quantity: product.quantity, imageURL: product.imageURL, color: selectedProductColor, sizeInfo: selectedProductSizeInfo })} type="button" className="btn btn-dark mt-3" name="addToCart">
                        Add to cart
                    </button>
                </div>
            </div>
            <div className="row my-5">
                <h2>Related products</h2>
                <div className="row mt-3">
                    <Link to={`/product-page/${products[3]._id}`} onClick={() => setMainProductImage('')} className="relatedProduct col">
                        <img src={products[3].imageURL} className="product-img-large rounded" alt="Product" />
                        <div className="fw-bold mt-2">
                            <div>{products[3].name}</div>
                            <div>${products[3].price}</div>
                        </div>
                    </Link>
                    <Link to={`/product-page/${products[4]._id}`} onClick={() => setMainProductImage('')} className="relatedProduct col">
                        <img src={products[4].imageURL} className="product-img-large rounded" alt="Product" />
                        <div className="fw-bold mt-2">
                            <div>{products[4].name}</div>
                            <div>${products[4].price}</div>
                        </div>
                    </Link>
                    <Link to={`/product-page/${products[5]._id}`} onClick={() => setMainProductImage('')} className="relatedProduct col">
                        <img src={products[5].imageURL} className="product-img-large rounded" alt="Product" />
                        <div className="fw-bold mt-2">
                            <div>{products[5].name}</div>
                            <div>${products[5].price}</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;