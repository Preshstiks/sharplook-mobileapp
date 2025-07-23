import React, { createContext, useContext, useState, useCallback } from "react";
import { HttpClient } from "../api/HttpClient";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await HttpClient.get("/client/getMycart");
      setCartItems(res.data.data || []);
    } catch (err) {
      setError("Failed to load cart");
      console.log(err.response);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, fetchCart, loading, error }}
    >
      {children}
    </CartContext.Provider>
  );
};
