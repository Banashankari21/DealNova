// src/contexts/CartContext.js
import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();


export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems([...cartItems, item]);
  const removeFromCart = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

