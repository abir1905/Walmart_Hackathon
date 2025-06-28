// src/components/ProductCard.js
import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const numericPrice = typeof product.price === 'string' 
      ? parseFloat(product.price.replace("₹", "").replace("$", "").replace(",", "")) 
      : product.price;

    addToCart({
      ...product,
      price: numericPrice,
      quantity: 1
    });
  };

  return (
    <div className="product-card group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="font-bold text-gray-800">{product.price}</p>
        <div className="text-yellow-400 mt-1">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-brand-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;