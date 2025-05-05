'use client';

import {
    useEffect,
    useState,
} from "react";

import Card from "@/components/Card";
import Button from "@/components/Button";
import { resendVerifyEmail } from "@/util/resendVerifyEmail";

export default function ResendVerifyEmail() {

    const [errorMessage, setErrorMessage] = useState("");
    const [showSentMessage, setShowSentMessage] = useState(false);

    const [localStorageUserId, setLocalStorageUserId] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setLocalStorageUserId(userId);
    }, []);

    const handleResendVerifyEmail = async () => {
        const userId: string | null = localStorageUserId;

        if (userId) {
            try {
                await resendVerifyEmail(userId);
                setShowSentMessage(true);
            } catch (error) {
                setErrorMessage("Error sending verification email: " + error);
            }
        } else {
            setErrorMessage("Error sending verification email.");
        }
    }

    return (
        <div className="mx-auto px-4 flex flex-col place-items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
            <Card>
                <div className="flex flex-col gap-3 place-items-center">
                    <h1 className="text-3xl text-center">Please verify your email</h1>

                    <p>To complete registration, please click the button below to get a email verification link sent to your inbox.</p>

                    {errorMessage &&
                        <div className="text-red-500" aria-live="polite">{errorMessage}</div>
                    }

                    {!showSentMessage ? (
                        <Button type="button" color="dark" size="" outline="" onClick={() => handleResendVerifyEmail()} data-cy="resendVerifyEmailButton">
                            Resend Verification Email
                        </Button>
                    ) : (
                        <p className="text-green-500" aria-live="polite" data-cy="sentVerifyEmailMessage">A new verification email was sent to your inbox.</p>
                    )}
                </div>
            </Card>
        </div>
    );
}