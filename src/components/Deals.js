import React from "react";
import ProductCard from "./ProductCard";
import { allProducts } from "../data/products";

const Deals = () => {
  return (
    <div className="bg-[#FEF8F8]">
      {/* Featured Products Section */}
      <section id="everything" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {allProducts.featured.map((product) => (
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
            {allProducts.women.map((product) => (
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
            {allProducts.men.map((product) => (
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
            {allProducts.grocery.map((product) => (
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