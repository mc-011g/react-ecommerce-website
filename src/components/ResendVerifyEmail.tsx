import Image from "next/image";

export default function ResendVerifyEmail({ name, price, imageURL, alt }:
    { name: string, price: number, imageURL: string, alt: string }) {
    return (
        <div className="flex flex-col shadow rounded-xl hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <div className="relative w-full h-[200px]">
                <Image
                    src={imageURL.trimEnd()}
                    alt={alt}
                    width={400}
                    height={400}
                    className="rounded-xl object-cover h-full" />
            </div>
            <div className="p-4">
                <div className="font-bold font-semibold">{name}</div>
                <div className="text-gray-600">${price}</div>
            </div>
        </div>
    );
}