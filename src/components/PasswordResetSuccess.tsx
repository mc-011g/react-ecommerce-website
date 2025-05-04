import { useRouter } from "next/navigation";
import Button from "./Button";
import Card from "./Card";

export const PasswordResetSuccess = () => {
    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
            <Card>
                <div className="flex flex-col gap-3 place-items-center">
                    <h1 className="text-2xl" data-cy="passwordResetSuccessMessage">Password Reset Success</h1>
                    <p>
                        Your password has been reset, now please login with your new password.
                    </p>
                    <Button onClick={() => router.push('/login')} color={"dark"} size={"large"} outline={""} data-cy="passwordResetLoginButton">Log in</Button>
                </div>
            </Card>
        </div>
    );
}