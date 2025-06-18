import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    walletBalance,
    setWalletBalance,
    cartTotal,
    setCartTotal,
  } = useCart();

  // Automatically update cart total based on cart items
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setCartTotal(total);
  }, [cartItems, setCartTotal]);

  const handlePayment = () => {
    if (walletBalance >= cartTotal) {
      setWalletBalance(prev => prev - cartTotal);
      setCartItems([]);
      setCartTotal(0);
      alert("Payment successful! Items will be delivered soon.");
    } else {
      alert("Insufficient balance in wallet!");
    }
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price} × {item.quantity || 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Qty: {item.quantity || 1}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Wallet</h2>
          <div className="mb-6">
            <p className="text-gray-600">Available Balance</p>
            <p className="text-2xl font-bold">₹{walletBalance}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">Cart Total</p>
            <p className="text-2xl font-bold">₹{cartTotal}</p>
          </div>
          <button
            onClick={handlePayment}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-lg text-white font-medium ${cartItems.length === 0 ? 'bg-gray-400' : 'bg-[#0071dc] hover:bg-[#06529a]'}`}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
