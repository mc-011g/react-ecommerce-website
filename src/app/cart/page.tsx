'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";
import CartProductCard from "@/components/CartProduct";
import { getCart } from "@/redux/selectors";
import { removeProductFromCart, updateProductFromCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublishableKey as string);

export default function CartPage() {
    const cart = useSelector(getCart) || [];
    const dispatch = useDispatch();

    const cartTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

    const handleCheckoutButtonClick = async () => {
        const stripe: Stripe | null = await stripePromise;

        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                lineItems:
                    cart.map((product) => {
                        return {
                            price: product.priceId,
                            quantity: product.quantity
                        };
                    }),
                mode: 'payment',
                successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentSucceeded`,
                cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentCancelled`
            });
            if (error) {
                alert(error.message);
            }
        }
    }

    const summaryInfo = {
        subtotal: 0,
        taxes: 0,
        shipping: 0,
    }

    const handleUpdateProductQuanity = (_id: string, quantity: number, selectedSize: string) => {
        dispatch(updateProductFromCart({ _id, quantity, selectedSize }));
    }

    const handleRemoveItem = (_id: string, selectedSize: string) => {
        dispatch(removeProductFromCart({ _id, selectedSize }));
    }

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100%-64px)] bg-gray-50">
            <div className="flex flex-col gap-4 h-full my-16 mx-auto md:flex-row w-full justify-center">

                <div className="w-full md:w-[500px]">
                    <Card>
                        <div className="flex flex-col gap-3" aria-live="polite">
                            <h4 className="mb-3 text-2xl"><b>Cart</b> ({cart.length} items)</h4>
                            <hr />
                            {cart.length > 0 ?
                                <>
                                    {cart?.map((product, index) => (
                                        <div className={`mt-5 ${(cart.length > 0) ? 'mb-3' : ''} `} key={product._id + product.selectedSize} data-cy="cartProduct">
                                            <CartProductCard
                                                product={product}
                                                handleUpdateProductQuanity={handleUpdateProductQuanity}
                                                index={index}
                                                handleRemoveItem={handleRemoveItem} />
                                        </div>
                                    ))}
                                </> : <>There are no products in your cart.</>
                            }
                        </div>
                    </Card>
                </div>

                <div className="w-full md:w-[300px]">
                    <Card>
                        <div className="flex flex-col">
                            <h4 className="mb-3 text-2xl font-bold">Summary</h4>
                            <hr />

                            <div>
                                <div className="my-5">
                                    <div className="flex justify-between">
                                        <div>Subtotal:</div>
                                        <div>
                                            ${summaryInfo.subtotal}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>Shipping:</div>
                                        <div>{summaryInfo.shipping === 0 ? <>Free</> : <>{summaryInfo.shipping}</>}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>Taxes:</div>
                                        $0
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <div aria-live="polite">Total:</div>
                                        <div data-cy="cartTotal">${cartTotal}</div>
                                    </div>
                                </div>

                                <Button color="dark" size="" outline="" className="" onClick={handleCheckoutButtonClick}
                                    disabled={cart.length === 0 ? true : false}
                                    aria-disabled={cart.length === 0 ? true : false}
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}