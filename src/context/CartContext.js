import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(50000); // Initial balance ₹50,000
  const [cartTotal, setCartTotal] = useState(0);

  // ✅ Automatically update cartTotal whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cartItems]);
  

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
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
