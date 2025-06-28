// src/components/Home.js
import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { cartTotal, addToCart } = useCart();

  // Add to cart handler
  const handleAddToCart = (product) => {
    const numericPrice = typeof product.price === 'string' 
      ? parseFloat(product.price.replace("₹", "").replace(",", "")) 
      : product.price;
    
    addToCart({
      ...product,
      price: numericPrice,
      quantity: 1
    });
  };

  // Scroll spy functionality
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');

    const makeActive = (link) => {
      navLinks.forEach(l => {
        l.classList.remove('nav-link-active');
        l.classList.remove('text-brand-pink');
        l.classList.add('text-gray-600');
      });
      link.classList.add('nav-link-active');
      link.classList.add('text-brand-pink');
      link.classList.remove('text-gray-600');
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(`#nav-links a[href="#${id}"]`);
          if (link) makeActive(link);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Product data
  const featuredProducts = [
    {
      id: "dark-brown-jeans",
      title: "Dark Brown Jeans",
      price: "₹12,450",
      category: "Men",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSJHRbTN9_keskKbYgNROu5lTpJ6PBM4jeNB59kTxn1AeGY3qWeaX00bdvknCWazzQtgn7C77TgUAdUlO3Bj0wAukExqeS3HKeRnen6t7HEuUB9HnHuQ7wB",
      rating: 5
    },
    {
      id: "blue-denim-jeans",
      title: "Blue Denim Jeans",
      price: "₹12,450",
      category: "Women",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop",
      rating: 4
    },
    {
      id: "black-hoodie",
      title: "Black Hoodie",
      price: "₹14,940",
      category: "Men",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSGIOk2m_YGKy515CSoWCTCqC8gbWeEUlItqQIly8N5Fg0k-kDe52qMU6sT5Xv0oF8VfqQQmmFRtKrJQZFQZgzSnLjruzfvupMPHpF6luGhXRAllkOlK_X-cg",
      rating: 5
    },
    {
      id: "basic-gray-jeans",
      title: "Basic Gray Jeans",
      price: "₹12,450",
      category: "Women",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQdjCXm69JMN4keVd6F5uiGpiAocbptGZw5Q8iAf-uHif78jJahzjZUAMRKllTgNfhWi4eC-8HiKbrQ8FqPRAyQ3xHB2e__BTjFIPox_iK_wG4hzu__KHufWg",
      rating: 4
    },
    {
      id: "dnk-red-shoes",
      title: "DNK Red Shoes",
      price: "₹9,960",
      originalPrice: "₹12,450",
      category: "Men",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      isSale: true,
      rating: 5
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

  const accessoriesProducts = [
    {
      id: "wireless-earbuds",
      title: "Wireless Earbuds",
      price: "₹4,999",
      description: "Noise Cancelling",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: "smart-watch",
      title: "Smart Watch",
      price: "₹12,999",
      description: "Heart Rate Monitor",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
    },
    {
      id: "bluetooth-speaker",
      title: "Bluetooth Speaker",
      price: "₹3,499",
      description: "360° Sound",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQINZE6-HHRaiDnPZhuhcsi9CAEMAmnWZSbecBpPP-pWJx2OZrl_RKDawlIWZ9xrGahwcPufLm2cBd6jrr90NkEiIt1qyTBMZ6nhS4XXz2-ZVDars9ZgNsf"
    },
    {
      id: "laptop",
      title: "Samsung Galaxy Book",
      price: "₹1,29,799",
      description: "Core i5 12th Gen Windows 11 Home",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTLFk4EnW8ZAzDcE3DTMkrSaCy4A4LWDyOpUXVUrCMLO48f4eUuUMtvY0EaPDauNIodlbY7tFJuOT2ISa1M6qypd6ARgks4u0iLE9p-1sd8VsTcq5ycNR9og"
    },
    {
      id: "Poco F7 5g",
      title: "Poco F7 5g",
      price: "₹34,899",
      description: "SD 8gen 4, Fast Charging",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSndYyUKHucBY_pDeMgsil2ysYIqA145X9LzNWZYw-TscCyyqQEwcqa5HLokycE5cRb2BbxivEAsmu0vDIudQQoHb2OQXjmX7bsQzCb4Fn2"
    }
  ];

  const groceryProducts = [
    {
      id: "fresh-apples",
      title: "Fresh Apples",
      price: "₹249",
      description: "1 kg",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR-n-i81n4OdSOqb09O2m1C473-HlLEBABdB5_7AwMsJqOlaJDnL5gv8-eGALkczItXh4yRE6UFW7qjgVHFuJvt8cloNrm8xdq9E8D9ihU-WWORoWaaCUqK"
    },
    {
      id: "organic-milk",
      title: "Organic Milk",
      price: "₹125",
      description: "1 litre",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2070&auto=format&fit=crop"
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
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTxRhuvqQU8ZyMQkB-tvJheZvbGM8FXujRL9F_qaWRniSxd9ofEXjU8pABDrnG8qQU2AtNpFaJTVNZFYQog37bVie697xY-3LrVbcfaocVG"
    },
    {
      id: "cherry-tomatoes",
      title: "Cherry Tomatoes",
      price: "₹265",
      description: "1 pint",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT0lrGpvGCq8nAniqh0xtpKYJHeBetICvV8SpF5xQkhnPiEy5cLiYO4XWwLefYMtCdOtPJmUuqQsBrBeCj9CUgftutS6MRfwarGuiyzA312"
    }
  ];

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-bg text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">Raining Offers For<br />Hot Summer!</h1>
            <p className="text-xl mb-8">25% Off On All Products</p>
            <div className="space-x-4">
              <Link to="#everything" className="bg-white text-gray-800 font-bold py-3 px-6 rounded hover:bg-gray-200 transition-colors">SHOP NOW</Link>
              <Link to="#" className="border border-white font-bold py-3 px-6 rounded hover:bg-white hover:text-gray-800 transition-colors">FIND MORE</Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop" alt="Summer Fashion" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Category Promo Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg text-white p-8 flex flex-col justify-end h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574495586649-4458c63c348f?q=80&w=1887&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-[url(https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRsCnBbdYWBXRLucQ8SSuZ4SBCbeh6HCsgKouDDdtu5J2T4kpVPUfd-P0Y8g74TFAIMDziPpFV5n2jXUlZ1tPZhrMCnrpTLqQj6ROmkG5d8BwI--GTFQ-rF)] opacity-40"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold">20% Off On Tank Tops</h3>
              <p className="my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Link to="#women" className="bg-white text-black font-bold py-2 px-5 mt-2 inline-block rounded">SHOP NOW</Link>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg text-white p-8 flex flex-col justify-end h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520342890738-4903cb37b5d8?q=80&w=2070&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-[url(https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR96jgmaoCKohyIfLWDQsl6Oi3rBLjP9Qdt_B_k6FHoFrdOy7-Os6hvt3XaNSOLZjJOnyjfZ78fOgvrISeCy8z4-EQqCFoI3TEbpBBxL7mbHu4caQ8cPJgHE-w)] opacity-40"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold">Latest Eyewear For You</h3>
              <p className="my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Link to="#accessories" className="bg-white text-black font-bold py-2 px-5 mt-2 inline-block rounded">SHOP NOW</Link>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="relative rounded-lg overflow-hidden shadow-lg text-white p-8 flex flex-col justify-end h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598554747472-355916147413?q=80&w=1887&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-[url(https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTSmjQk2-JRvyDnFUKVc4PwdbFVm-v_yuginYKLLXOj9h2wi8erPzfy_l_vLh56sGOI4VEU6A6DG6hCIRaWhAuSR2kK9xkkuz3BtjWD6QLvMYVe5mSbsBdKA)] opacity-40"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold">Let's Lorem Suit Up!</h3>
              <p className="my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Link to="#men" className="bg-white text-black font-bold py-2 px-5 mt-2 inline-block rounded">CHECK OUT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="everything" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card text-center group">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-64 object-cover"
                  />
                  {product.isSale && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Sale!
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <p className="font-bold text-gray-800">
                    {product.originalPrice && (
                      <span className="line-through text-gray-400 mr-2">
                        {product.originalPrice}
                      </span>
                    )}
                    {product.price}
                  </p>
                  <div className="mt-1">
                    {renderStars(product.rating)}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 bg-brand-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
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
              <div key={product.id} className="product-card group">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-brand-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
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
              <div key={product.id} className="product-card group">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-brand-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section id="accessories" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Accessories</h2>
          <p className="text-center text-gray-500 mb-8">Essential gadgets for everyday life</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {accessoriesProducts.map((product) => (
              <div key={product.id} className="product-card group">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-brand-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Edition CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-blue-200 rounded-lg flex flex-col md:flex-row items-center overflow-hidden">
            <div className="md:w-1/2 p-10 lg:p-16">
              <h4 className="text-gray-600 font-semibold">Limited Time Offer</h4>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 my-3">Special Edition</h2>
              <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
              <p className="font-bold text-gray-700 mb-6">Buy This T-shirt At 20% Discount, Use Code OFF20</p>
              <button className="bg-gray-800 text-white font-bold py-3 px-8 rounded hover:bg-black transition-colors">SHOP NOW</button>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
              <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXL1NC_IlLS6XAJTmJpEaB436yy7iWkR6iLgvFmTF66_WjywNfa7yhXR30nwRa9etwosEa8g7s_FpjxzmIrrv-YllsPmSkF4N8rjViFu-FrecmBIaJSgOiVQ" alt="Special Edition Offer" className="w-full h-full object-cover" />
            </div>
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
              <div key={product.id} className="product-card group">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-brand-pink text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
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
    </main>
  );
};

export default Home;