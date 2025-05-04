'use client';

import EmailVerificationFail from "@/components/EmailVerificationFail";
import EmailVerificationSuccess from "@/components/EmailVerificationSuccess";
import { AppDispatch } from "@/components/ReduxProvider";
import { verifyEmailThunk } from "@/redux/thunks/verifyEmailThunk";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function VerifyEmailLandingPage() {

    const { verificationString } = useParams() as { verificationString: string };

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const verifyEmail = async () => {
            if (!verificationString) {
                setIsLoading(false);
                setIsSuccess(false);
                return;
            }

            try {
                await dispatch(verifyEmailThunk(verificationString as string));
                setIsLoading(false);
                setIsSuccess(true);
                localStorage.removeItem("userId");
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setIsSuccess(false);
            }
        }

        verifyEmail();
    }, [dispatch, verificationString]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isSuccess) {
        return <EmailVerificationSuccess />
    } else {
        return <EmailVerificationFail />
    }
}