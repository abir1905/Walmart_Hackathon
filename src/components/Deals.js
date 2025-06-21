import React from "react";
import Card from "./Card";
import costumeImage from "../assets/costume.jpg";
import jacketImage from "../assets/jacket.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
// Import additional images as needed
// import newProduct1 from "../assets/new-product1.jpg";
// import newProduct2 from "../assets/new-product2.jpg";

const Deals = () => {
  const products = [
    { 
      id: "costume-1",
      title: "Costume", 
      price: "₹2500",
      image: costumeImage,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Black", "White"]
    },
    { 
      id: "jacket-1",
      title: "Jacket", 
      price: "₹3000",
      image: jacketImage,
      sizes: ["S", "M", "L"],
      colors: ["Black", "Brown", "Navy"]
    },
    { 
      id: "photo-2",
      title: "Photo Frame", 
      price: "₹1500",
      image: img2,
      sizes: ["One Size"],
      colors: ["Silver", "Gold", "Black"]
    },
    { 
      id: "photo-3",
      title: "Wall Art", 
      price: "₹1800",
      image: img3,
      sizes: ["One Size"],
      colors: ["Multicolor"]
    },
    // Add new products here:
    // { 
    //   id: "new-product-1",
    //   title: "Winter Coat", 
    //   price: "₹4500",
    //   image: newProduct1,  // Imported above
    //   sizes: ["S", "M", "L", "XL"],
    //   colors: ["Black", "Gray", "Navy"]
    // },
    // { 
    //   id: "new-product-2",
    //   title: "Designer Hat", 
    //   price: "₹1200",
    //   image: newProduct2,  // Imported above
    //   sizes: ["One Size"],
    //   colors: ["Red", "Blue", "Black"]
    // },
    // Add more products as needed
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {products.map((product) => (
        <Card 
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Deals;