import { useContext, useEffect } from "react";
import './CartPage.css';
import { ProductContext } from "../CartContext/ProductContext.js";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`;

if (!stripePublishableKey) {
    console.error("Stripe Publishable Key is not defined");
} else {
    console.log(stripePublishableKey + ' -- api key');
}

const stripePromise = loadStripe(stripePublishableKey);

const Cart = () => {
    const { cart, setCart } = useContext(ProductContext);
    const { summaryInfo, setSummaryInfo } = useContext(ProductContext);

    useEffect(() => {
        let newSubtotal = 0;
        if (cart.length > 0) {
            cart.forEach(product => (
                newSubtotal += (product.price * product.quantity)
            ));
        }
        setSummaryInfo({ subtotal: newSubtotal, shipping: 0, taxes: 0 });
    }, [cart, setSummaryInfo])

    const handleProductQuanity = (index, newQuantity) => {
        const newCart = cart.map((product, i) => {
            if (i === index) {
                product.quantity = parseInt(newQuantity);
                return product;
            } else {
                return product;
            }
        });
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const handleRemoveItem = (selectedProduct) => {
        const newCart = cart.filter(product =>
            product._id !== selectedProduct._id
        );
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const handleCheckoutButtonClick = async () => {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems:
                cart.map((product) => {
                    return {
                        price: product.sizeInfo.priceId,
                        quantity: product.quantity
                    };
                }),
            mode: 'payment',
            successUrl: 'https://reactecommercewebsite-g3emhzfae3dkcnfj.westus2-01.azurewebsites.net/paymentSucceeded',
            cancelUrl: 'https://reactecommercewebsite-g3emhzfae3dkcnfj.westus2-01.azurewebsites.net/paymentCancelled'
        });
        if (error) {
            alert(error.message);
        }
    }

    return (
        <div className="container-sm mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <h4 className="mb-3 fw-bold">Cart</h4>
                    {cart.length > 0 ?
                        <>
                            {cart?.map((product, index) => (
                                <div key={product._id}>
                                    <div className={`cart-product-container ${(cart.length > 0) ? 'mb-3' : ''} `}>
                                        <Link to={`/product-page/${product._id}`}>
                                            <img src={product.imageURL} className="product-img-cart me-3" alt="Product" />
                                        </Link>
                                        <div className="d-flex w-100 flex-column justify-content-between">
                                            <div className="d-flex flex-column w-100">
                                                <div className="d-flex justify-content-between">
                                                    <div><b>{product.name}</b></div>
                                                    <div><b>${product.price * product.quantity}</b></div>
                                                </div>
                                                <div>Color: {product.color}</div>
                                                <div>Size: {product.sizeInfo.size}</div>
                                                <div className="d-inline-flex">
                                                    <div>Quantity</div>
                                                    <select className="form-select w-25 py-0 px-1 ms-2" value={product.quantity} onChange={(e) => handleProductQuanity(index, e.target.value)}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <i className="bi bi-trash removeProductFromCart" onClick={() => handleRemoveItem(product)}></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </> : <>There are no products in your cart.</>
                    }
                </div>
                <div className="col-lg-6 d-flex flex-column">
                    <h4 className="mb-3 summary fw-bold">Summary</h4>
                    <div className="summary-content">
                        <div>Subtotal</div>
                        <div>
                            ${summaryInfo.subtotal}
                        </div>
                    </div>
                    <div className="summary-content">
                        <div>Shipping</div>
                        <div>{summaryInfo.shipping === 0 ? <>Free</> : <>$summaryInfo.shipping</>}</div>
                    </div>
                    <div className="summary-content">
                        <div>Taxes</div>
                        0
                    </div>
                    <div className="summary-content fw-bold">
                        <div>Total</div>
                        <div>${cart.length > 0 ? summaryInfo.subtotal + summaryInfo.taxes : 0}</div>
                    </div>
                    {cart.length > 0 ?
                        <button type="button" role="link" className="btn btn-dark mt-3 w-100" onClick={handleCheckoutButtonClick}>
                            <div>Checkout</div>
                        </button>
                        :
                        <button type="button" className="btn btn-dark mt-3 w-100" disabled>
                            <div>Checkout</div>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;