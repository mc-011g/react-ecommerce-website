import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [currentProduct, setCurrentProduct] = useState([]);
    const [summaryInfo, setSummaryInfo] = useState({ subtotal: 0, shipping: 0, taxes: 0 });
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cart"))) {
            setCart(JSON.parse(localStorage.getItem("cart")));
        }
    }, [])

    return <ProductContext.Provider value={{
        currentProduct, setCurrentProduct,
        summaryInfo, setSummaryInfo,
        cart, setCart
    }}>
        {children}
    </ProductContext.Provider>
}