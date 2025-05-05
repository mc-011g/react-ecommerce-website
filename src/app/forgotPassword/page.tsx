'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { sendForgotPasswordEmail } from "@/util/sendForgotPasswordEmail";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const result = await sendForgotPasswordEmail(email);
            setSuccess(result);
        } catch (error) {
            setErrorMessage("Error sending email." + error);
        }

    }

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
            <Card>
                <div className="flex flex-col gap-3 place-items-center">
                    {success ? (
                        <>
                            <h1 className="text-2xl" data-cy="linkSentTitle">Password Reset Link Sent</h1>
                            <p>Check your email for a reset link</p>
                            <Button size="large" color="dark" outline="" onClick={() => { router.push("/login") }}>
                                Back to Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl">Forgot Password</h1>
                            <p>Please enter your email address to get a password reset email link.</p>

                            <label className="w-full">
                                Email
                                <Input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} data-cy="emailInput" required />
                            </label>

                            <Button size="large" color="dark" outline=""
                                onClick={() => handleSubmit()} disabled={!email} data-cy="sendResetLink">
                                Send Reset Link
                            </Button>

                            {errorMessage && <p className="text-red-500" aria-live="polite">{errorMessage}</p>}
                        </>
                    )}
                </div>
            </Card >
        </div>
    );
}