import React from "react";
import Card from "./Card";
import laptopImage from "../assets/laptop.png";
import costumeImage from "../assets/costume.jpg";
import jacketImage from "../assets/jacket.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

const Deals = () => {
  const products = [
    { photo: costumeImage, title: "Costume", price: "₹2500" },
    { photo: jacketImage, title: "Jacket", price: "₹3000" },
    { photo: img2, title: "Photo 2", price: "₹1500" },
    { photo: img3, title: "Photo 3", price: "₹1800" },
    { photo: costumeImage, title: "Costume", price: "₹2500" },
    { photo: jacketImage, title: "Jacket", price: "₹3000" },
    { photo: img2, title: "Photo 2", price: "₹1500" },
    { photo: img3, title: "Photo 3", price: "₹1800" },
    { photo: costumeImage, title: "Costume", price: "₹2500" },
    { photo: jacketImage, title: "Jacket", price: "₹3000" },
    { photo: img2, title: "Photo 2", price: "₹1500" },
    { photo: img3, title: "Photo 3", price: "₹1800" },
    { photo: costumeImage, title: "Costume", price: "₹2500" },
    { photo: jacketImage, title: "Jacket", price: "₹3000" },
    { photo: img2, title: "Photo 2", price: "₹1500" },
    { photo: img3, title: "Photo 3", price: "₹1800" },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {products.map((product, index) => (
        <Card key={index} {...product} />
      ))}
    </div>
  );
};

export default Deals;
