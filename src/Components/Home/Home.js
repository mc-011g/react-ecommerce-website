import './Home.css';
import { Link } from "react-router-dom";

const Home = ({ records }) => {
    return (
        <div className="container mt-5">
            <div className="shopImage my-5 position-relative">
                <img className='landingPageImage' src="https://reactecommerceapp.blob.core.windows.net/images/martin-katler-1kOIl9vu4cY-unsplash(1).jpg" alt="Shoes" />
                <Link to="/products">
                    <button type="button" className="btn btn-light btn-lg shopButton position-absolute ms-4 mb-4">
                        Shop
                    </button>
                </Link>
            </div>
            <div className="mb-5">
                <h1 className="">Trending</h1>
                <div className="products">
                    {records.slice(0, 3).map(product => (
                        <Link to={`/product-page/${(product._id)}`}
                            key={product._id}
                            className='product my-3'>
                            <img src={product.imageURL} className="product-img" alt="" />
                            <span className="product-title">{product.name}</span>
                            <div className="product-price">${product.price}</div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mb-5">
                <h1 className="">New Products</h1>
                <div className="products">
                    {records.slice(3, 6).map(product => (
                        <Link to={`/product-page/${(product._id)}`}
                            key={product._id}
                            className='product my-3'>
                            <img src={product.imageURL} className="product-img" alt="" />
                            <span className="product-title">{product.name}</span>
                            <div className="product-price">${product.price}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

