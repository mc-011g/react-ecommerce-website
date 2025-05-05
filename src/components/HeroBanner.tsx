'use client';

import HeroBannerImageContainer from "./HeroBannerImageContainer";
import { useEffect, useState } from "react";

export default function HeroBanner() {
    const [containerIndex, setContainerIndex] = useState<number>(0);

    useEffect(() => {
        setInterval(() => {
            setContainerIndex((prevContainerIndex) => (prevContainerIndex !== 2 ? prevContainerIndex + 1 : 0));
        }, 10000);
    }, []);

    return (
        <div className="mb-5 h-full relative">

            <div className="relative h-120">
                <div className={`absolute top-0 left-0 w-full h-full transition duration-800 opacity-0 z-0 ${containerIndex === 0 && 'opacity-100 z-10'}`}>
                    <HeroBannerImageContainer
                        imageUrl={"https://reactecommerceapp.blob.core.windows.net/images/martin-katler-1kOIl9vu4cY-unsplash(1).jpg"}
                        productLink={"/products/category/athletic"}
                        productTitle={"Athletic Shoes"}
                        imageAlt={"Athletic shoes"}
                        isLCP={true} />
                </div>

                <div className={`absolute top-0 left-0 w-full h-full transition duration-800 opacity-0 z-0 ${containerIndex === 1 && 'opacity-100 z-10'}`}>
                    <HeroBannerImageContainer
                        imageUrl={"https://reactecommerceapp.blob.core.windows.net/images/pexels-1242304473-30156657.jpg"}
                        productLink={"/products/category/boots"}
                        productTitle={"Boots"}
                        imageAlt={"Boots"}
                        isLCP={false} />
                </div>


                <div className={`absolute top-0 left-0 w-full h-full transition duration-800 opacity-0 z-0 ${containerIndex === 2 && 'opacity-100 z-10'}`}>
                    <HeroBannerImageContainer
                        imageUrl={"https://reactecommerceapp.blob.core.windows.net/images/mojtaba-fahiminia-t4g1gctAaKk-unsplash(1).jpg"}
                        productLink={"/products/category/shoes"}
                        productTitle={"Shoes"}
                        imageAlt={"Shoes"}
                        isLCP={false} />
                </div>
            </div>

            <div className="absolute bottom-2 left-1/2 flex flex-row gap-2 z-10">
                <div className={`rounded-[100%] w-3 h-3 cursor-pointer border ${containerIndex === 0 ? 'bg-black border-gray-200' : 'bg-white border-black'} `} onClick={() => setContainerIndex(0)}></div>
                <div className={`rounded-[100%] w-3 h-3 cursor-pointer border ${containerIndex === 1 ? 'bg-black border-gray-200' : 'bg-white border-black'} `} onClick={() => setContainerIndex(1)}></div>
                <div className={`rounded-[100%] w-3 h-3 cursor-pointer border ${containerIndex === 2 ? 'bg-black border-gray-200' : 'bg-white border-black'} `} onClick={() => setContainerIndex(2)}></div>
            </div>
        </div>
    );
};