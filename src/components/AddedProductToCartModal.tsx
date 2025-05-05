import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Button from "./Button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AddedProductToCartModal({ name, price, size, color, imageUrl, imageAlt, handleShowProductAddedModal }: { name: string, price: number, size: string, color: string, imageUrl: string, imageAlt: string, handleShowProductAddedModal: (value: boolean) => void }) {

    const [linkClicked, setLinkClicked] = useState<boolean>(false);

    useEffect(() => {
        if (linkClicked) {
            document.body.style.overflow = "auto";
        }
    }, [linkClicked]);

    return (
        <div
            className="bg-white w-full sm:w-120 h-150 sm:h-100 absolute z-51 right-0 top-[64px] p-8 shadow-xl fixed"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            aria-live="assertive"
        >
            <div className="relative h-full w-full flex flex-col justify-between">

                <div>
                    <div className="flex justify-between">
                        <div className="flex gap-4 place-items-center mb-4">
                            <CheckCircleIcon className="w-8 h-8 text-green-600"></CheckCircleIcon>
                            <span className="text-2xl" id="modal-title" aria-live="polite">Added product to cart</span>
                        </div>
                        <XMarkIcon
                            className="w-8 h-8 cursor-pointer top-0 right-5"
                            aria-label="Close Modal"
                            onClick={() => handleShowProductAddedModal(false)
                            } data-cy="addedProductCloseButton" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative aspect-square h-30 w-30">
                            <Image src={imageUrl} alt={imageAlt} fill className="rounded-xl object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">{name}</span>
                            <span>Color: {color}</span>
                            <span>Size: {size}</span>
                            <span className="text-gray-500">${price}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Link href={"/cart"} onClick={() => setLinkClicked(true)}>
                        <Button
                            color={"dark"}
                            size={"large"}
                            outline={""}
                            aria-label="View Cart"
                        >View Cart</Button>
                    </Link>

                    <Button
                        color={"light"}
                        size={"large"}
                        outline={"outline"}
                        aria-label="Continue Shopping"
                        onClick={() => handleShowProductAddedModal(false)
                        }>Continue Shopping</Button>
                </div>
            </div>
        </div>
    );
};