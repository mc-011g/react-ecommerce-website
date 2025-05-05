'use client';

import Button from "@/components/Button";
import LargeProductCard from "@/components/LargeProductCard";
import { addProductToCart } from "@/redux/slices/cartSlice";
import { fetchProduct } from "@/util/fetchProduct";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddedProductToCartModal from "./AddedProductToCartModal";
import { getCart } from "@/redux/selectors";
import { CartProduct, Product } from "@/types/types";


export default function ProductDetails({ initialProduct }: { initialProduct: Product }) {

    const dispatch = useDispatch();
    const [product] = useState(initialProduct);

    const cart = useSelector(getCart);

    const [relatedProducts, setRelatedProducts] = useState<Product[]>();
    const [selectedProductSize, setSelectedProductSize] = useState<string>("");
    const [selectedProductColor, setSelectedProductColor] = useState('');
    const [selectedProductName, setSelectedProductName] = useState<string>('');
    const [selectedProductPrice, setSelectedProductPrice] = useState<number>(0);
    const [selectedProductImageURL, setSelectedProductImageURL] = useState<string>('');

    const [selectedPriceId, setSelectedPriceId] = useState('');
    const [mainProductImage, setMainProductImage] = useState('');
    const [showProductAddedModal, setShowProductAddedModal] = useState(false);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getRelatedProducts = async () => {
            const relatedProducts = [
                await fetchProduct("66719759bdb811be15f18a9c"),
                await fetchProduct("667197f9bdb811be15f18a9f"),
                await fetchProduct("667199d2bdb811be15f18aa1"),
                await fetchProduct("667197d6bdb811be15f18a9e"),
            ];
            setRelatedProducts(relatedProducts);
        }

        getRelatedProducts();
    }, [])

    useEffect(() => {
        setSelectedProductColor(product.colors[0]);
        setMainProductImage('');
        setSelectedProductSize('');

    }, [product._id, product.colors]);

    const changeMainProductImage = (value: SetStateAction<string>) => {
        setMainProductImage(value);
    }

    const handleAddProduct = (newProduct: CartProduct) => {

        if (!selectedProductSize) {
            setError('Please select a size.');
        } else {
            setSelectedProductName(newProduct.name);
            setSelectedProductPrice(newProduct.price);
            setSelectedProductImageURL(newProduct.imageURL);

            handleShowProductAddedModal(true);

            dispatch(addProductToCart(newProduct));
        }
    }

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (showProductAddedModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showProductAddedModal])

    const handleShowProductAddedModal = (show: boolean) => {
        if (show) {
            if (cart.length < 20) {
                setShowProductAddedModal(true);
            } else {
                setError("You cannot add more than 20 items to the cart.");
            }
        } else {
            setShowProductAddedModal(false);
        }
    }

    return (
        <>
            <Head>
                <title data-cy="productNameCollapsed">{product.name}</title>
                <meta name="description" content={`${product.name}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto px-4 my-12">
                {showProductAddedModal &&
                    <div className="">
                        <div className="w-[100vw] h-[100vw] opacity-50 bg-black top-0 left-0 z-10 absolute" onClick={() => handleShowProductAddedModal(false)}></div>
                        <AddedProductToCartModal
                            name={selectedProductName}
                            price={selectedProductPrice}
                            size={selectedProductSize}
                            color={selectedProductColor}
                            imageUrl={selectedProductImageURL}
                            imageAlt={selectedProductName}
                            handleShowProductAddedModal={handleShowProductAddedModal}
                        />
                    </div>
                }

                <div className="mb-3 lg:hidden">
                    <h2 className="text-3xl" data-cy="productName">{product.name}</h2>
                    <h4 className="text-2xl">${product.price}</h4>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-row gap-3 grow max-w-[650px]">
                        <div className="flex gap-2 flex-col">
                            {product.images.map((imageURL, index) =>
                                <div key={index}>
                                    <div className="relative w-[60px] h-[60px] cursor-pointer">
                                        <Image
                                            src={imageURL.trim()}
                                            onMouseOver={() => changeMainProductImage(imageURL.trim())}
                                            className="rounded-lg"
                                            alt={product.name}
                                            fill
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="grow">
                            <div className="relative min-w-[200px] aspect-square">
                                <Image
                                    src={mainProductImage !== '' ? mainProductImage : product.images[0].trimEnd()}
                                    className="rounded-lg" alt={product.name}
                                    fill
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="hidden lg:block mb-6">
                            <h2 className="text-3xl">{product.name}</h2>
                            <h4 className="text-2xl">${product.price}</h4>
                        </div>

                        <div className="flex flex-col gap-2 mb-4">
                            <div>
                                <b>Color: </b><span>{selectedProductColor}</span>
                                <div className="flex flex-row gap-2 mt-2">
                                    {product.colors?.map(color =>
                                        <button key={color} className={`rounded-lg w-[60px] h-[60px] ${selectedProductColor === color && 'border border-black'}`}>
                                            <Image src={product.images[0].trimEnd()} onClick={() => setSelectedProductColor(color)}
                                                className="rounded-lg w-full h-full object-cover" alt="Product" width={300} height={300} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <fieldset>
                                    <legend className="font-bold">Select size (US): </legend>
                                    <div className="flex flex-wrap gap-2 mt-2" aria-live="polite">
                                        {product.sizes.map(sizeInfo =>
                                            <button
                                                key={product._id + sizeInfo.size}
                                                className={`border border-black w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${(selectedProductSize === sizeInfo.size) ? 'bg-black text-white hover:bg-black' : 'hover:bg-gray-300'}`}
                                                onClick={() => { setSelectedProductSize(sizeInfo.size); setSelectedPriceId(sizeInfo.priceId); }}
                                                aria-label={`Sizes filter for size ${sizeInfo.size}`}
                                                data-cy="productSize"
                                            >
                                                {sizeInfo.size}
                                            </button>
                                        )}
                                    </div>
                                </fieldset>
                                {error &&
                                    <div className="text-red-500 mt-2" aria-live="polite">
                                        {error}
                                    </div>
                                }
                            </div>
                        </div>
                        <Button
                            size="large"
                            color=""
                            outline=""
                            onClick={() => handleAddProduct({ _id: product._id, name: product.name, price: product.price, category: product.category, quantity: product.quantity, imageURL: product.images[0], selectedColor: selectedProductColor, selectedSize: selectedProductSize, priceId: selectedPriceId })}
                            disabled={!selectedProductSize}
                            data-cy="addToCartButton">Add to Cart</Button>
                    </div>
                </div>

                <hr className="my-12" />

                <h2 className="text-2xl mb-4">Related products</h2>
                <div className="pb-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:w-3/4 h-min">
                    {relatedProducts?.map(product =>
                        <Link
                            key={product._id}
                            href={`/products/${product._id}`}
                            onClick={() => setMainProductImage('')}
                            aria-label={`View details for related product: ${product.name}`}>
                            <LargeProductCard
                                name={product.name}
                                price={product.price}
                                imageURL={product.images[0]}
                                alt={product.name}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}