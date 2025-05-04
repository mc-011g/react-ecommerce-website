import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CartProduct } from "@/types/types";

export default function CartProductCard({ product, handleUpdateProductQuanity, handleRemoveItem }: { product: CartProduct, handleUpdateProductQuanity: (_id: string, quantity: number, selectedSize: string) => void, index: number, handleRemoveItem: (_id: string, selectedSize: string) => void }) {
    return (
        <div className="bg-white flex flex-row shadow
         rounded-xl hover:shadow-lg transition-shadow 
         duration-200 ease-in-out py-4
         ">
            <div className="flex-shrink-0 relative w-[125px] h-[125px]">
                <Image
                    src={product.imageURL.trim()}
                    alt={product.name}
                    fill
                    sizes="85vh, 90vh, 95vh"
                    className="rounded-xl object-cover h-full w-full" />
            </div>

            <div className="flex flex-row justify-between px-4 w-full" aria-live="polite">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between w-contain">
                        <div className="font-bold">{product.name}</div>
                        <div className="font-bold" data-cy="cartProductPrice">${product.price * product.quantity}</div>
                    </div>
                    <div>Color: {product.selectedColor}</div>
                    <div>Size: {product.selectedSize}</div>

                    <div className="flex flex-row justify-between">
                        <fieldset>
                            <label>
                                <legend>Quantity:</legend>
                                <select className="form-select w-25 py-0 px-1 ms-2"
                                    value={product.quantity}
                                    onChange={(e) => handleUpdateProductQuanity(product._id, parseInt(e.target.value), product.selectedSize)} data-cy="cartProductSelectSizeList">
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
                            </label>
                        </fieldset>
                        <TrashIcon className="w-6 h-6 cursor-pointer top-0 right-5 mt-3" onClick={() => handleRemoveItem(product._id, product.selectedSize)} data-cy="cartProductRemoveIcon" aria-label="Remove product from cart button" />
                    </div>
                </div>
            </div>
        </div>
    );
}