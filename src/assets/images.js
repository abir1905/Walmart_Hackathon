import laptopImage from "./laptop.png";
import logoImage from "./logo.png";
import logo1Image from "./logo1.png";
import costumeImage from "./costume.jpg";
import jacketImage from "./jacket.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import wallpaperImage from "./wallpaper.jpg";

// Define products array
export const products = [
  {
    id: "costume-1",
    name: "Costume",
    price: 2500,
    image: costumeImage,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Black", "White"]
  },
  {
    id: "jacket-1",
    name: "Jacket",
    price: 3000,
    image: jacketImage,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown", "Navy"]
  },
  {
    id: "photo-2",
    name: "Photo Frame",
    price: 1500,
    image: img2,
    sizes: ["One Size"],
    colors: ["Silver", "Gold", "Black"]
  },
  {
    id: "photo-3",
    name: "Wall Art",
    price: 1800,
    image: img3,
    sizes: ["One Size"],
    colors: ["Multicolor"]
  },
  {
    id: "laptop-1",
    name: "Laptop",
    price: 65000,
    image: laptopImage,
    sizes: ["Standard"],
    colors: ["Silver", "Space Gray"]
  },
  {
    id: "headphones-1",
    name: "Headphones",
    price: 12000,
    image: "headphones.jpg",  // Note: Update to actual import if available
    sizes: ["Standard"],
    colors: ["Black", "White"]
  }
];

// Export images separately if needed elsewhere
export {
  laptopImage,
  logoImage,
  logo1Image,
  costumeImage,
  jacketImage,
  img2,
  img3,
  wallpaperImage,
};