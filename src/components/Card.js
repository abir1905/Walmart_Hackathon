import React from "react";
import { useCart } from "../context/CartContext";
import laptopImage from "../assets/laptop.png";

const Card = ({ photo, title, price }) => {
  const { addToCart } = useCart(); // ✅ Hook used inside component

  const handleAdd = () => {
    const item = {
      name: title,
      price: parseInt(price.replace("₹", "").replace("$", "")),
      image: photo,
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <img src={photo} alt="" className="w-52 h-56 rounded-[1rem]" />
      <div className="flex justify-between w-[13rem]">
        <p className="font-bold text-[13px] ">
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
