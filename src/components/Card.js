import React from "react";
import { useCart } from "../context/CartContext";

const Card = ({ photo, title, price }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const item = {
      id: `${title}-${price}`, // ✅ unique ID
      title,
      price: parseInt(price.replace("₹", "").replace("$", "")),
      image: photo,
    };
    addToCart(item);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={photo} alt={title} className="w-52 h-56 rounded-[1rem]" />
      <div className="flex justify-between w-[13rem]">
        <p className="font-bold text-[13px]">
          {title + " Rapid Charger & Stylus Pen"}
        </p>
        <p className="font-bold">{price}</p>
      </div>
      <button
        onClick={handleAdd}
        className="mt-2 px-4 py-1 rounded bg-blue-500 text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
