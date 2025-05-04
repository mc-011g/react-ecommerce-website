import Link from "next/link";
import Button from "./Button";
import Image from "next/image";

export default function HeroBannerImageContainer({ imageUrl, productLink, productTitle, imageAlt, isLCP }: { imageUrl: string, productLink: string, productTitle: string, imageAlt: string, isLCP: boolean }) {

    return (
        <div className="relative h-full">
            <div className="relative w-full h-full">
                <Image
                    className='object-cover'
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    priority={isLCP}
                />
            </div>

            <div className="absolute top-1/2 left-1/2 sm:left-6/9 transform -translate-x-1/2 -translate-y-1/2 text-center text-white ">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{productTitle}</h1>

                <div className="flex flex-wrap gap-2 justify-center">
                    <Link href={productLink}>
                        <Button color="light" size="large" outline="">Browse</Button>
                    </Link>
                    <Link href="/products">
                        <Button color="dark" size="large" outline="">Shop all</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};