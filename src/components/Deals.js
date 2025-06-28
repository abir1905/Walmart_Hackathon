import React from "react";
import ProductCard from "./ProductCard";

const Deals = () => {
  const featuredProducts = [
    {
      id: "dark-brown-jeans",
      title: "Dark Brown Jeans",
      price: "₹12,450",
      category: "Men",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSJHRbTN9_keskKbYgNROu5lTpJ6PBM4jeNB59kTxn1AeGY3qWeaX00bdvknCWazzQtgn7C77TgUAdUlO3Bj0wAukExqeS3HKeRnen6t7HEuUB9HnHuQ7wB"
    },
    {
      id: "blue-denim-jeans",
      title: "Blue Denim Jeans",
      price: "₹12,450",
      category: "Women",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop"
    },
    {
      id: "black-hoodie",
      title: "Black Hoodie",
      price: "₹14,940",
      category: "Men",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSGIOk2m_YGKy515CSoWCTCqC8gbWeEUlItqQIly8N5Fg0k-kDe52qMU6sT5Xv0oF8VfqQQmmFRtKrJQZFQZgzSnLjruzfvupMPHpF6luGhXRAllkOlK_X-cg"
    },
    {
      id: "basic-gray-jeans",
      title: "Basic Gray Jeans",
      price: "₹12,450",
      category: "Women",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQdjCXm69JMN4keVd6F5uiGpiAocbptGZw5Q8iAf-uHif78jJahzjZUAMRKllTgNfhWi4eC-8HiKbrQ8FqPRAyQ3xHB2e__BTjFIPox_iK_wG4hzu__KHufWg"
    },
    {
      id: "dnk-red-shoes",
      title: "DNK Red Shoes",
      price: "₹9,960",
      originalPrice: "₹12,450",
      category: "Men",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      isSale: true
    }
  ];

  const womensProducts = [
    {
      id: "floral-summer-dress",
      title: "Floral Summer Dress",
      price: "₹3,735",
      description: "Light & Airy",
      image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1965&auto=format&fit=crop"
    },
    {
      id: "high-waist-jeans",
      title: "High-Waist Skinny Jeans",
      price: "₹4,565",
      description: "Stretch Denim",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop"
    },
    {
      id: "leather-tote-bag",
      title: "Leather Tote Bag",
      price: "₹6,225",
      description: "Classic Black",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBuMjP_74btUgoubF3FiyD_APNxQ9dVg3R-DtKiKfKLWwtMvBc6iGrLBn86au3CqxSqqi0IqwsjXjpKn4plk1YEynAW35QrGbQZzCyz0GYuN1Zy44ESLzWJQ"
    },
    {
      id: "oversized-sunglasses",
      title: "Oversized Sunglasses",
      price: "₹2,075",
      description: "UV Protection",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTaBHC5fuYZ-JQ8hMJG95gQYiUeOD3z2zb_6gwvvefGO6Q7qfKoGMC-utps5lh73Z4ggBwHcOurfgBF0Uc1UB4kpZCmizdB3NAgVSIUI1mPsJmpg7CCmErv"
    },
    {
      id: "silk-floral-scarf",
      title: "Silk Floral Scarf",
      price: "₹2,490",
      description: "100% Silk",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTFLP6ohDTHPswnle0Xfvm-xh0uI6-JAQCFqkIa1NMup7B7MvgZN21VYEQq46GY3N2VVSokXAn9UggotEk5FRg4FDhiJjRnzhm_4uDO6UDEwI7UI8WMZIrplWY"
    }
  ];

  const mensProducts = [
    {
      id: "classic-white-tshirt",
      title: "Classic White T-Shirt",
      price: "₹1,245",
      description: "100% Cotton",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQBdR6kYq0CsHnkPLqQyIKRLgGbOwO2pPNaemIKdXkqGoQZdKeu-v9mRZpbna07dIsUAEuog7NBLjt3oTCGRm4U8sydzRp2DzrwcV5VrVxzjewbVLFgi8q_"
    },
    {
      id: "linen-formal-shirt",
      title: "Linen Formal Shirt",
      price: "₹3,320",
      description: "Sky Blue",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSAPkwpoMnZt01waIp7UsmxL5R18QSWW74En33SW42yp3ibWQTE7X2gBqxl5cafw045exdCpFrsN9nh11P5Z9Nxnb70B7XVpF3kdPUtc_CIMnGiSA-X0T88-Q"
    },
    {
      id: "chino-shorts",
      title: "Chino Shorts",
      price: "₹2,905",
      description: "Khaki",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR_yp70MhcmF6VQAsXw6OqrVrSYlcOO_fmTfdeNQewOeVSd0-WAAd56g6oJ91nq43LcXm2EkDpKC2pJ_fPcQdqJZqohyPkbLeIrI5L9n-HO2fUrtkRfnCX44A"
    },
    {
      id: "brown-leather-belt",
      title: "Brown Leather Belt",
      price: "₹2,490",
      description: "Genuine Leather",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTpW0YscXc9xr0dDgMX9-XzitYlyRj4SyIB8JdQUlnJYV4s0cR6_gFdAtNmV6IyqBjoukJvIA9eYL4lBYNjtpAkq-PohW95gqwwUnEilVDe-s5Equy5WgD2"
    },
    {
      id: "analog-sports-watch",
      title: "Analog Sports Watch",
      price: "₹8,200",
      description: "Water Resistant",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop"
    }
  ];

  const groceryProducts = [
    {
      id: "fresh-apples",
      title: "Fresh Apples",
      price: "₹249",
      description: "1 kg",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: "organic-milk",
      title: "Organic Milk",
      price: "₹125",
      description: "1 litre",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQHTyZLVT7UHJopAgG5zbs4MmmqSf9ZbfDlxt7gP9MiwJUQDdlr8cuYjD8YIir3rKyHhMx_zqxTUyPlE3INyXcpkV98yCrV"
    },
    {
      id: "sourdough-bread",
      title: "Sourdough Bread",
      price: "₹375",
      description: "1 loaf",
      image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1925&auto=format&fit=crop"
    },
    {
      id: "ripe-avocados",
      title: "Ripe Avocados",
      price: "₹415",
      description: "Pack of 3",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSTy8qRJBX9bDX-zkzcmk30z0DX-M4eP6L7woGkDcn-T_L1qgYHNmJCyXh5DTdU8x5q8zC4oovd0JbTp4w8tmYPj9PPgWditTYsVkx0kMgqKKT1SPSy7gBL"
    },
    {
      id: "cherry-tomatoes",
      title: "Cherry Tomatoes",
      price: "₹265",
      description: "1 pint",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQlu_PJE3gk6G-Of68zFSx4IMmA50-HmUNXSQCjMcrmLJMTMNA6t-MKWmch_inZlVVew0bxsju3tJ0kPj8BpLPYq1Ix6IL4Vu5BtylbnxY"
    }
  ];

  return (
    <div className="bg-[#FEF8F8]">
      {/* Featured Products Section */}
      <section id="everything" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Section */}
      <section id="women" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">For Women</h2>
          <p className="text-center text-gray-500 mb-8">The latest trends and timeless styles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {womensProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Men's Section */}
      <section id="men" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">For Men</h2>
          <p className="text-center text-gray-500 mb-8">Sharp, comfortable and stylish</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {mensProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Groceries Section */}
      <section id="grocery" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Fresh Groceries</h2>
          <p className="text-center text-gray-500 mb-8">Delivered to your doorstep</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {groceryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <i className="fas fa-globe-americas fa-3x text-brand-pink mb-4"></i>
            <h4 className="font-bold text-lg">Worldwide Shipping</h4>
            <p className="text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div>
            <i className="fas fa-tshirt fa-3x text-brand-pink mb-4"></i>
            <h4 className="font-bold text-lg">Best Quality</h4>
            <p className="text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div>
            <i className="fas fa-tags fa-3x text-brand-pink mb-4"></i>
            <h4 className="font-bold text-lg">Best Offers</h4>
            <p className="text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div>
            <i className="fas fa-lock fa-3x text-brand-pink mb-4"></i>
            <h4 className="font-bold text-lg">Secure Payments</h4>
            <p className="text-gray-500 mt-2">It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deals;