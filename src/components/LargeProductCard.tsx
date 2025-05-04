import Image from "next/image";

export default function LargeProductCard({ name, price, imageURL, alt }:
    { name: string, price: number, imageURL: string, alt: string }) {
    return (
        <div
            className="bg-white
         flex flex-col shadow rounded-xl
         hover:shadow-xl transition-shadow duration-200
          ease-in-out min-w-[100px]" data-cy="largeProductCard">
            <div className="relative aspect-square">
                <Image
                    src={imageURL.trim()}
                    alt={alt}
                    fill
                    sizes="85vw, 90vw, 95vw"
                    className="rounded-xl object-cover h-full w-full" />
            </div>
            <div className="p-4">
                <div className="font-bold font-semibold">{name}</div>
                <div className="text-gray-600">${price}</div>
            </div>
        </div>
    );
}