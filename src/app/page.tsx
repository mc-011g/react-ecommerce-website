import Link from "next/link";
import { fetchProduct } from "@/util/fetchProduct";
import LargeProductCard from "@/components/LargeProductCard";
import CategoryBlock from "@/components/CategoryBlock";
import HeroBanner from "@/components/HeroBanner";

export default async function HomePage() {

    const products = [
        await fetchProduct("66719759bdb811be15f18a9c"),
        await fetchProduct("667197f9bdb811be15f18a9f"),
        await fetchProduct("667199d2bdb811be15f18aa1"),
        await fetchProduct("667197d6bdb811be15f18a9e"),
        await fetchProduct("667199e9bdb811be15f18aa2"),
        await fetchProduct("66719a03bdb811be15f18aa3"),
        await fetchProduct("66719a19bdb811be15f18aa4"),
        await fetchProduct("66719a29bdb811be15f18aa5"),
    ];

    return (
        <>
            <HeroBanner />

            <div className="container mx-auto">
                <h1 className="text-center text-2xl">Shop by Category</h1>
                <div className="flex flex-wrap gap-4 justify-center mt-4 mb-5">
                    <CategoryBlock categoryName="athletic" content="Athletic Shoes" imageURL="https://reactecommerceapp.blob.core.windows.net/images/martin-katler-1kOIl9vu4cY-unsplash(1).jpg" />
                    <CategoryBlock categoryName="boots" content="Boots" imageURL="https://reactecommerceapp.blob.core.windows.net/images/pexels-1242304473-30156657.jpg" />
                    <CategoryBlock categoryName="shoes" content="Shoes" imageURL="https://reactecommerceapp.blob.core.windows.net/images/mojtaba-fahiminia-t4g1gctAaKk-unsplash(1).jpg" />
                </div>

                <div>
                    <h2 className="text-center text-2xl">Trending</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-5">
                        {products.slice(0, 4).map(product => (
                            <Link href={`/products/${(product._id)}`}
                                key={product._id}
                                className='product'>
                                <LargeProductCard
                                    name={product.name}
                                    price={product.price}
                                    imageURL={product.images[0]}
                                    alt={product.name}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-center text-2xl">New Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-5">
                        {products.slice(4, 8).map(product => (
                            <Link href={`/products/${(product._id)}`}
                                key={product._id}
                                className='product'>
                                <LargeProductCard
                                    name={product.name}
                                    price={product.price}
                                    imageURL={product.images[0]}
                                    alt={product.name}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
