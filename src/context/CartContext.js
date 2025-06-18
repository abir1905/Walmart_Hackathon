import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(50000); // Initial balance ₹50,000
  const [cartTotal, setCartTotal] = useState(0);

  // ✅ Automatically update cartTotal whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const payNow = () => {
    if (walletBalance >= cartTotal) {
      setWalletBalance((prev) => prev - cartTotal);
      clearCart();
      alert("Payment successful!");
    } else {
      alert("Not enough balance.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        walletBalance,
        setWalletBalance,
        cartTotal,       // ✅ now correctly tracked
        setCartTotal,    // ✅ only needed if external updates required
        addToCart,
        clearCart,
        payNow
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
