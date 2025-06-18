import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="relative group border p-4 rounded shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} width={200} height={200} />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;