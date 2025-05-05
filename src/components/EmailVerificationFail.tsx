
import Card from "./Card";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function EmailVerificationFail() {

    const router = useRouter();

    return (
        <div className="mx-auto px-4 flex flex-col items-center text-center justify-center h-[calc(100vh-64px)] bg-gray-100">
            <Card>
                <p className="mb-4 text-center" data-cy="emailVerificationFailMessage">
                    There was an error verifying your email.
                </p>
                <div>
                    <Button size="large" color="dark" outline="" onClick={() => router.push("/")} data-cy="backToLoginButton">
                        Back to login
                    </Button>
                </div>
            </Card>
        </div>
    )
}