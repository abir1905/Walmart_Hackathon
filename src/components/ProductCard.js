import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
        {product.isSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{product.category || product.type}</p>
          {product.brand && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {product.brand}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="font-bold text-gray-800">{product.displayPrice}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">{product.displayOriginalPrice}</p>
            )}
          </div>
          
          <div className="text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="fas fa-star text-sm"></i>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleAdd}
          className="mt-4 w-full bg-brand-pink text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;