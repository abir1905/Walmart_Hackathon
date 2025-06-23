import React from "react";
import { useCart } from "../context/CartContext";

const Card = ({ id, image, title, price }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    // Convert price to float, not int
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace("₹", "").replace("$", "").replace(",", "")) 
      : price;

    const item = {
      id: id,
      title: title,
      name: title,
      price: numericPrice,
      image: image,
      quantity: 1  // Explicitly set quantity
    };
    addToCart(item);
  };

  return (
    <div className="flex flex-col items-center justify-center w-64 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-lg mb-1 text-center">{title}</h3>
      <p className="text-lg font-bold text-blue-600 mb-3">{price}</p>
      <button
        onClick={handleAdd}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;