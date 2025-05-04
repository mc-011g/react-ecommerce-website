'use client';

import Input from "@/components/Input";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import type { AppDispatch } from "@/components/ReduxProvider";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/thunks/loginUser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const onFormInputChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const user = await dispatch(loginUser(form.email, form.password));

            if (user && user.isVerified) {
                router.push("/");
            } else if (user && !user.isVerified) {
                router.push("/resendVerifyEmail");
            } else {
                setErrorMessage("Username or password is incorrect.");
            }
        } catch (error) {
            setErrorMessage(String(error));
        }
    };

    const handlePasswordVisibilityToggle = () => {
        if (passwordVisibilityToggle === false) {
            setPasswordVisibilityToggle(true);
        } else {
            setPasswordVisibilityToggle(false);
        }
    }

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">

            <Card>
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl text-center">Login</h1>

                    <form className="flex flex-col gap-3 mt-3" onSubmit={(e) => { e.preventDefault(); onSubmit(e); }}>
                        <div className="flex flex-col gap-3">

                            <label>
                                Email
                                <Input type="email" placeholder="Email" id="email" name="email" data-cy="emailInput"
                                    value={form.email} onChange={onFormInputChange} required maxLength={60} />
                            </label>

                            <div className="relative">
                                <label>
                                    Password
                                    <div className="relative flex align-items-center">
                                        <Input type={`${passwordVisibilityToggle === false ? 'password' : 'text'}`} placeholder="Password" id="password" name="password"
                                            value={form.password} onChange={onFormInputChange} required data-cy="passwordInput" minLength={8} />
                                    </div>
                                </label>
                                {passwordVisibilityToggle ?
                                    <EyeIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordVisibilityToggle()} />
                                    :
                                    <EyeSlashIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordVisibilityToggle()} />
                                }
                            </div>

                            {errorMessage &&
                                <div className="text-red-500" aria-live="polite" data-cy="errorMessage">                            
                                    {errorMessage}
                                </div>
                            }
                        </div>

                        <div className="flex justify-center gap-2 mt-4">
                            <div className="flex-1">
                                <Button type="submit" color="dark" size="" outline="" data-cy="loginButton">Login</Button>
                            </div>
                            <Link href="/register" className="flex-1">
                                <Button type="button" color="light" size="" outline="outline" data-cy="registerButton">Register</Button>
                            </Link>
                        </div>
                    </form>

                    <div className="d-flex justify-content-center text-center">
                        <Link href="/forgotPassword" className="font-semibold text-gray-600 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2" data-cy="forgotPasswordLink">
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};