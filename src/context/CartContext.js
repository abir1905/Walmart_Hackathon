import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(50000);
  const [cartTotal, setCartTotal] = useState(0);

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
        // Add the product with all necessary properties
        return [...prevItems, { 
          id: product.id,
          name: product.title || product.name, // Use both for compatibility
          price: product.price,
          image: product.image,
          quantity: 1 
        }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        walletBalance,
        setWalletBalance,
        cartTotal,
        setCartTotal,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};