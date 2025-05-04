import Card from "./Card";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function PasswordResetFail() {

    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
            <Card>
                <div className="flex flex-col gap-3 place-items-center">
                    <h1 className="text-2xl">Password Reset Failed</h1>
                    <p>
                        Something went wrong while trying to reset your password.
                    </p>
                    <Button size="large" color="dark" outline="" onClick={() => router.push("/login")}>
                        Back to Login
                    </Button>
                </div>
            </Card>
        </div>
    );
}