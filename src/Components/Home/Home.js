import './Home.css';
import { Link } from "react-router-dom";

const Home = ({ records }) => {
    return (
        <div className="container-fluid">
            <div className="shopImage mb-5 position-relative">
                <img className='landingPageImage' src="https://reactecommerceapp.blob.core.windows.net/images/martin-katler-1kOIl9vu4cY-unsplash(1).jpg" alt="Shoes" />
                <Link to="/products">
                    <button type="button" className="btn btn-lg shopButton position-absolute ms-4 mb-4">
                        Shop products
                    </button>
                </Link>
            </div>
            <div className="container">
                <h2 className="text-center">Shop by Category</h2>

                <div className="category-container mt-4 mb-5">
                    <Link to="/products/Shoes" className="category"><h3>Shoes</h3></Link>
                    <Link to="/products/Boots" className="category"><h3>Boots</h3></Link>
                    <Link to="/products/Athletic" className="category"><h3>Athletic Shoes</h3></Link>
                </div>

                <div className="">
                    <h2 className="text-center">Trending</h2>
                    <div className="products mt-4 mb-5">
                        {records.slice(0, 4).map(product => (
                            <Link to={`/product-page/${(product._id)}`}
                                key={product._id}
                                className='product'>
                                <img src={product.imageURL} className="product-img" alt="Product" />
                                <div className='m-3'>
                                    <span className="product-title">{product.name}</span>
                                    <div className="product-price">${product.price}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-center">New Products</h2>
                    <div className="products mt-4">
                        {records.slice(4, 8).map(product => (
                            <Link to={`/product-page/${(product._id)}`}
                                key={product._id}
                                className='product'>
                                <img src={product.imageURL} className="product-img" alt="" />
                                <div className='m-3'>
                                    <span className="product-title">{product.name}</span>
                                    <div className="product-price">${product.price}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

