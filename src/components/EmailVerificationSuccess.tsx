import { useRouter } from "next/navigation";
import Button from "./Button";
import Card from "./Card";

export default function EmailVerificationSuccess() {

    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
            <Card>
                <p className="mb-4 text-center" data-cy="emailVerificationSuccessMessage">
                    Your email has been verified successfully. You can now log in to your account.
                </p>
                <Button size="large" color="dark" outline="" onClick={() => router.push("/login")}>
                    Login
                </Button>
            </Card>
        </div>
    )
}