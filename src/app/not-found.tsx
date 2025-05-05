import Button from "@/components/Button";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="flex flex-col right-1/2 text-center gap-4 h-fit w-60">
                <h1 className="text-5xl mb-2">404</h1>
                <p className="text-gray-500">This page does not exist.</p>
                <Link href={"/"}>
                    <Button color={"dark"} size={"large"} outline={""}>Go back to home page</Button>
                </Link>
            </div>
        </div>
    );
}