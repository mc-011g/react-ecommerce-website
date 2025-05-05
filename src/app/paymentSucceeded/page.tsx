'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PaymentSucceededPage() {

    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">

            <Card>
                <div className="flex flex-col place-items-center text-center">
                    <h1 className="text-3xl" data-cy="paymentStatusTitle">Payment Succeeded</h1>
                    <p className="text-gray-600 mt-3">Thank you for your order.</p>
                    <CheckCircleIcon className="w-30 h-30 color-red text-green-600 my-5"></CheckCircleIcon>
                    <Button size="large" outline="" color="dark" className="" onClick={() => router.push("/")} data-cy="homePageButton">
                        Go back to home page
                    </Button>
                </div>
            </Card>
        </div>
    );
};