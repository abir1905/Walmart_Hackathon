import React, {useEffect } from "react";
import { useCart } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const {
    cartItems,
    setCartItems,
    walletBalance,
    setWalletBalance,
    cartTotal,
    setCartTotal,
  } = useCart();

  const [rechargeAmount, setRechargeAmount] = React.useState(100);

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
      toast.success("Payment successful! Items will be delivered soon.");
    } else {
      toast.error("Insufficient wallet balance!");
    }
  };

  const handleRecharge = async (amount) => {
    if (!amount || amount < 1) {
      toast.error("Enter a valid recharge amount!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const order = await res.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_MwTuikwzHxwNrg",
        amount: order.amount,
        currency: "INR",
        name: "Recharge Wallet",
        description: "Recharge your shopping wallet",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:5000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setWalletBalance(prev => prev + amount);
            toast.success("Wallet recharged successfully!");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#0071dc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Recharge Error:", err);
      toast.error("Recharge failed. Please try again.");
    }
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
  };

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-center" />
      {cartItems.length > 0 && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 animate-pulse">
          You have {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart.
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
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
          <div className="mb-4">
            <p className="text-gray-600">Available Balance</p>
            <p className="text-2xl font-bold">₹{walletBalance}</p>
          </div>
          <div className="mb-6">
  <label className="block text-gray-600 mb-1">Recharge Amount (₹)</label>
  <input
    type="number"
    min="1"
    value={rechargeAmount}
    onChange={(e) => setRechargeAmount(parseInt(e.target.value) || 0)}
    className="w-full mb-2 px-4 py-2 border rounded"
  />
  <button
    onClick={() => handleRecharge(rechargeAmount)}
    className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Recharge ₹{rechargeAmount}
  </button>
</div>


          <div className="mb-4">
            <p className="text-gray-600">Cart Total</p>
            <p className="text-2xl font-bold">₹{cartTotal}</p>
          </div>
          <button
            onClick={handlePayment}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              cartItems.length === 0
                ? "bg-gray-400"
                : "bg-[#0071dc] hover:bg-[#06529a]"
            }`}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
