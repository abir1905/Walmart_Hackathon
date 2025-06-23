import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(50000);
  const [cartTotal, setCartTotal] = useState(0);

  // Safe calculation of cart total
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      
      if (isNaN(price) || isNaN(quantity)) return sum;
      
      return sum + price * quantity;
    }, 0);
    
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (product) => {
    // Ensure numeric values
    // In addToCart function
    const numericProduct = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10)
    };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === numericProduct.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === numericProduct.id
            ? { 
                ...item, 
                quantity: item.quantity + numericProduct.quantity 
              }
            : item
        );
      } else {
        return [...prevItems, numericProduct];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    
    // Validate quantity
    if (isNaN(quantity)) return;
    
    setCartItems(prevItems => {
      if (quantity < 1) {
        return prevItems.filter(item => item.id !== id);
      }
      
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const checkout = () => {
    if (walletBalance < cartTotal) {
      return { success: false, message: 'Insufficient wallet balance' };
    }
    
    setWalletBalance(prev => prev - cartTotal);
    setCartItems([]);
    return { success: true, message: 'Checkout successful' };
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        walletBalance,
        cartTotal,  // Only expose the value, not setter
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,  // Provide checkout function
        setWalletBalance
      }}
    >
      {children}
    </CartContext.Provider>
  );
};