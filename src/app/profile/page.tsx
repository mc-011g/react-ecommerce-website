'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { getUser } from "@/redux/selectors";
import { fetchUserProfile } from "@/redux/thunks/fetchUserProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/components/ReduxProvider";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/slices/userSlice";
import { getTokenPayload } from "../auth/getTokenPayload";
import { updateUserProfileThunk } from "@/redux/thunks/updateUserProfileThunk";
import { sendForgotPasswordEmail } from "@/util/sendForgotPasswordEmail";
import { User } from "@/types/types";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(getUser);
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const tokenPayload = getTokenPayload();

        if (!tokenPayload) {
            router.push("/");
        }

        if ((!user && tokenPayload) || (user && user.isVerified)) {
            try {
                dispatch(fetchUserProfile(tokenPayload._id));
            } catch (error) {
                console.error(error);
            }
        }
    }, [dispatch, router, user]);

    const [form, setForm] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setForm({ ...user });
        }
    }, [user]);

    const changesMade =
        form?.firstName !== user?.firstName
        || form?.lastName !== user?.lastName
        || form?.phoneNumber !== user?.phoneNumber
        || form?.email !== user?.email;

    const handleSaveChanges = () => {
        if (user) {
            if (form && user._id) {
                try {
                    dispatch(updateUserProfileThunk({ ...form, _id: user._id }));
                    setSuccessMessage("User profile updated.")
                } catch (error) {
                    setError("User profile failed to update: " + error);
                }
            }
        }
    };

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;

        if (form) {
            setForm({
                ...form,
                [name]: value
            }
            );
        }
    };

    const handleReset = () => {
        setForm({ ...user });
    }

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
        router.push("/");
    }

    const handleResetPassword = async () => {
        if (user.email) {
            try {
                await sendForgotPasswordEmail(user.email);
                setSuccessMessage("A password reset link has been sent to your email.");
            } catch (error) {
                setError("Error sending email: " + error);
            }
        }
    }

    return (

        <div className="mx-auto px-4 py-16 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">

            <Card>
                <div className="flex justify-content-center">
                    <div className="flex flex-col gap-4">
                        <h2 className="mb-3 text-center text-3xl">Account Information</h2>

                        <div className="flex flex-col my-3 gap-3">
                            <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); handleSaveChanges() }}>
                                <div className="text-truncate">

                                    <label>
                                        <b>Email: </b>
                                        <Input type="email" placeholder="Email" id="email" name="email"
                                            value={form?.email || ""} onChange={handleInputChange} maxLength={60} required data-cy="emailInput" />
                                    </label>
                                </div>

                                <label>
                                    <b>Phone: </b>
                                    <Input type="tel" placeholder="Phone number" id="phoneNumber" name="phoneNumber"
                                        value={form?.phoneNumber || ""} onChange={handleInputChange} maxLength={10} minLength={10} required data-cy="phoneNumberInput" />
                                </label>

                                <div className="flex gap-3 flex-wrap">
                                    <label className="flex-1">
                                        <b>First name:</b>
                                        <Input type="text" placeholder="First name" id="firstName" name="firstName" minLength={1}
                                            value={form?.firstName || ""} onChange={handleInputChange} maxLength={20} required data-cy="firstNameInput" />
                                    </label>
                                    <label className="flex-1">
                                        <b>Last name:</b>
                                        <Input type="text" placeholder="Last name" id="lastName" name="lastName" minLength={1}
                                            value={form?.lastName || ""} onChange={handleInputChange} maxLength={20} required data-cy="lastNameInput" />
                                    </label>
                                </div>

                                <div className="w-40">
                                    <Button type="button" color="light" size="" outline="outline" id="handleResetPassword" name="handleResetPassword" onClick={handleResetPassword} data-cy="resetPasswordButton">
                                        <div className="flex flex-row gap-4">
                                            <span>Reset Password</span>
                                        </div>
                                    </Button>
                                </div>

                                {successMessage && <p className="text-green-500" aria-live="polite" data-cy="successMessage">{successMessage}</p>}

                                {error && <p className="text-red-500" aria-live="polite" data-cy="errorMessage">{error}</p>}

                                <div className="mt-5 flex gap-6 flex-col place-items-center">
                                    <div className="flex flex-row gap-3 w-full sm:w-60">
                                        <Button type="button" color="light" size="" outline="outline" onClick={handleReset} data-cy="resetButton">
                                            Reset
                                        </Button>
                                        <Button type="submit" className="btn btn-dark mt-3"
                                            name="saveButton" id="saveButton" color={`${changesMade ? 'dark' : 'light'}`} size={""} outline={"outline"} disabled={!changesMade} data-cy="saveButton">Save</Button>
                                    </div>
                                    <div className="w-full sm:w-60">
                                        <Button type="button" color="light" size="" outline="outline" id="logoutButton" name="logoutButton" onClick={handleLogout} data-cy="logoutButton">
                                            Logout
                                        </Button>
                                    </div>
                                </div>

                            </form>
                        </div>

                    </div>
                </div >
            </Card>
        </div >
    );
}