'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function PaymentCancelledPage() {

    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">

            <Card>
                <div className="flex flex-col place-items-center text-center">
                    <h1 className="text-3xl" data-cy="paymentStatusTitle">Payment Cancelled</h1>
                    <p className="text-gray-600 mt-3">You cancelled your purchase.</p>

                    <XCircleIcon className="w-30 h-30 color-red text-red-600 my-5"></XCircleIcon>
                    <Button size="large" outline="" color="dark" className="" onClick={() => router.push("/")} data-cy="homePageButton">
                        Go back to home page
                    </Button>
                </div>
            </Card>
        </div>
    );
};