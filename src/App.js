import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Login from "./Components/Login/Login.js";
import Navbar from "./Components/Navbar/Navbar.js";
import Register from "./Components/Register/Register.js";
import Home from "./Components/Home/Home.js";
import ProductPage from "./Components/ProductPage/ProductPage.js";
import Cart from "./Components/CartPage/CartPage.js";
import { UserProvider } from "./Components/CartContext/UserContext.js";
import PrivateRoute from "./Components/PrivateRoute.js";
import Profile from "./Components/Profile/Profile.js";
import ResetPassword from "./Components/ResetPassword/ResetPassword.js";
import SearchPage from "./Components/SearchPage/SearchPage.js";
import PaymentCancelled from "./Components/PaymentCancelled/PaymentCancelled.js";
import PaymentSucceeded from "./Components/PaymentSucceeded/PaymentSucceeded.js";
import { ProductProvider } from "./Components/CartContext/ProductContext.js";
import ProductsPage from "./Components/ProductsPage/ProductsPage.js";

function App() {
  const [records, setRecords] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${baseURL}/record`);
      const records = await response.json();
      setRecords(records);
      return records;
    }
    getRecords();
    return;
  }, [records.length]);

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
            <Navbar products={records} />
            <Routes>
              <Route path="/" element={<Home records={records} />} />
              <Route path="/products" element={<ProductsPage records={records} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {records.map(product =>
                <Route
                  path={`/product-page/${(product._id)}`}
                  element={<ProductPage products={records} />}
                  key={product._id} />
              )
              }
              <Route path="/cart" element={<Cart />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/searchResults" element={<SearchPage products={records} />} />
              <Route path="/paymentCancelled" element={<PaymentCancelled />} />
              <Route path="/paymentSucceeded" element={<PaymentSucceeded />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
