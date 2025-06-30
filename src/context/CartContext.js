import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(50000);
  const [cartTotal, setCartTotal] = useState(0);

  // Calculate cart total
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (product) => {
  const newItem = {
    ...product,
    quantity: product.quantity || 1
  };

  setCartItems(prevItems => {
    const existingIndex = prevItems.findIndex(item => item.id === newItem.id);
    
    if (existingIndex >= 0) {
      const updatedItems = [...prevItems];
      updatedItems[existingIndex].quantity += newItem.quantity;
      return updatedItems;
    } else {
      return [...prevItems, {
        ...newItem,
        // Preserve all properties including description
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        image: newItem.image
      }];
    }
  });
};

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    const quantity = parseInt(newQuantity, 10) || 0;
    
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
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
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        setWalletBalance
      }}
    >
      {children}
    </CartContext.Provider>
  );
};