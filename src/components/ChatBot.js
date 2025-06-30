import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaMicrophone, FaTimes } from 'react-icons/fa';
import { allProducts } from '../data/products';
import { getAllProductTypes, getProductsByType } from '../data/products';

const ChatBot = () => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [, setQuantity] = useState(1);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const speechSynthesisRef = useRef(null);

  const sizeMap = useMemo(() => ({
    'xs': ['xs', 'extra small'],
    's': ['s', 'small'],
    'm': ['m', 'medium'],
    'l': ['l', 'large'],
    'xl': ['xl', 'extra large'],
    'xxl': ['xxl', 'double extra large']
  }) , []);

  // Helper functions
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const getBrandsForType = (type) => {
    const allItems = Object.values(allProducts).flat();
    const brands = new Set();
    
    allItems.forEach(product => {
      if (product.type === type) {
        brands.add(product.brand);
      }
    });
    
    return Array.from(brands);
  };

  // Clean user input
  const cleanUserInput = (text) => {
    return text
      .replace(/I'm listening\s*/gi, '')
      .replace(/listening\s*/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Add bot message with speech synthesis
  const addBotMessage = useCallback((text) => {
    const newMessage = { text, sender: 'bot' };
    setMessages(prev => [...prev, newMessage]);
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Add user message
  const addUserMessage = useCallback((text) => {
    setMessages(prev => [...prev, { text, sender: 'user' }]);
  }, []);

  // Handle adding to cart and resetting
  const addToCartAndReset = useCallback((product, size, color, quantity, brand) => {
    if (product) {
      const brandText = brand ? `Brand: ${brand}` : '';
      const description = [
        size ? `Size: ${size}` : '',
        color ? `Color: ${color}` : '',
        brandText
      ].filter(Boolean).join(' | ');
      
      const cartItem = {
        id: `${product.id}-${size || 'na'}-${color || 'na'}-${brand || 'na'}`,
        name: product.name,
        description: description,
        price: product.price,
        displayPrice: product.displayPrice,
        image: product.image,
        quantity: quantity,
        brand: brand || product.brand
      };
      
      addToCart(cartItem);
      addBotMessage(`Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to your cart! Would you like to add anything else?`);
    }
    
    // Reset for next item
    setActiveStep(0);
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
    setSelectedBrand('');
    setProductType('');
    setQuantity(1);
  }, [addToCart, addBotMessage]);

  // Helper function to proceed through selection steps
  const proceedToNextSelectionStep = useCallback((product) => {
    if (product.sizes.length > 1) {
      setActiveStep(1);
      addBotMessage(`Great choice! What size do you need for the ${product.name}? Available sizes: ${product.sizes.join(', ')}`);
    } else if (product.colors.length > 1) {
      setActiveStep(2);
      addBotMessage(`Great choice! What color would you like for the ${product.name}? Available colors: ${product.colors.join(', ')}`);
    } else {
      const brands = getBrandsForType(product.type);
      if (brands.length > 0) {
        setActiveStep(4);
        addBotMessage(`Great choice! Would you like a specific brand? Available brands for ${product.type}: ${brands.join(', ')}`);
      } else {
        setActiveStep(3);
        addBotMessage(`Great choice! How many ${product.name} would you like?`);
      }
    }
  }, [addBotMessage]);

  // Handle user responses
  const handleUserResponse = useCallback((response) => {
    const cleanedResponse = cleanUserInput(response);
    addUserMessage(cleanedResponse);
    stopListening();

    switch (activeStep) {
      case 0: // Initial state
        if (cleanedResponse.toLowerCase().includes('add') || 
            cleanedResponse.toLowerCase().includes('cart') || 
            cleanedResponse.toLowerCase().includes('want') ||
            cleanedResponse.toLowerCase().includes('buy')) {
          
          const allItems = Object.values(allProducts).flat();
          const productTypes = getAllProductTypes();
          const mentionedType = productTypes.find(type => 
            cleanedResponse.toLowerCase().includes(type.toLowerCase())
          );
          
          if (mentionedType) {
            setProductType(mentionedType);
            const typeProducts = getProductsByType(mentionedType);
            
            if (typeProducts.length > 1) {
              setActiveStep(0.5);
              addBotMessage(`I found several ${mentionedType} options. Which one would you like? ${typeProducts.map(p => p.name).join(', ')}`);
            } else if (typeProducts.length === 1) {
              setSelectedProduct(typeProducts[0]);
              proceedToNextSelectionStep(typeProducts[0]);
            } else {
              addBotMessage(`Sorry, we don't have ${mentionedType} in stock right now.`);
            }
          } else {
            // Improved product matching with whole word search
            const matchedProduct = allItems.find(product => {
              const escapedName = escapeRegExp(product.name.toLowerCase());
              const pattern = new RegExp(`\\b${escapedName}\\b`);
              return pattern.test(cleanedResponse.toLowerCase());
            });
            
            if (matchedProduct) {
              setSelectedProduct(matchedProduct);
              proceedToNextSelectionStep(matchedProduct);
            } else {
              addBotMessage("I'm not sure which item you mean. Could you specify?");
            }
          }
        } else {
          addBotMessage("I can help you add items to your cart. Just say something like 'Add jeans to cart' or 'I want the laptop'.");
        }
        break;
      
      case 0.5: // Product selection from type
        const typeProducts = getProductsByType(productType);
        const productMatch = typeProducts.find(product => 
          cleanedResponse.toLowerCase().includes(product.name.toLowerCase())
        );
        
        if (productMatch) {
          setSelectedProduct(productMatch);
          proceedToNextSelectionStep(productMatch);
        } else {
          addBotMessage(`I didn't recognize that product. Available options are: ${typeProducts.map(p => p.name).join(', ')}. Could you repeat?`);
        }
        break;
      
      case 1: // Size selection
        const cleanedLower = cleanedResponse.toLowerCase();
        let sizeMatch = null;

        // 1. Check for exact size match with word boundaries
        const exactMatch = selectedProduct.sizes.find(size => {
          const sizePattern = new RegExp(`\\b${escapeRegExp(size.toLowerCase())}\\b`);
          return sizePattern.test(cleanedLower);
        });

        if (exactMatch) {
          sizeMatch = exactMatch;
        } 
        // 2. Check size mappings (e.g., "medium" -> "M")
        else {
          Object.entries(sizeMap).some(([sizeCode, keywords]) => {
            const hasKeyword = keywords.some(keyword => 
              new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(cleanedLower)
            );
            
            if (hasKeyword && selectedProduct.sizes.includes(sizeCode.toUpperCase())) {
              sizeMatch = sizeCode.toUpperCase();
              return true; // break loop
            }
            return false;
          });
        }

        // 3. Handle random selection requests
        if (!sizeMatch && (cleanedLower.includes('any') || 
            cleanedLower.includes('random') ||
            cleanedLower.includes('surprise'))) {
          const randomSize = selectedProduct.sizes[Math.floor(Math.random() * selectedProduct.sizes.length)];
          sizeMatch = randomSize;
        }

        if (sizeMatch) {
          setSelectedSize(sizeMatch);
          
          if (selectedProduct.colors.length > 1) {
            setActiveStep(2);
            addBotMessage(`Perfect, size ${sizeMatch}. What color would you like? Available colors: ${selectedProduct.colors.join(', ')}`);
          } else {
            const brands = getBrandsForType(selectedProduct.type);
            if (brands.length > 0) {
              setActiveStep(4);
              addBotMessage(`Perfect, size ${sizeMatch}. Would you like a specific brand? Available brands for ${selectedProduct.type}: ${brands.join(', ')}`);
            } else {
              setActiveStep(3);
              addBotMessage(`Perfect, size ${sizeMatch}. How many ${selectedProduct.name} would you like?`);
            }
          }
        } else {
          addBotMessage(`I didn't recognize that size. Available options are: ${selectedProduct.sizes.join(', ')}. Could you repeat?`);
        }
        break;
      
      case 2: // Color selection
        const colorMatch = selectedProduct.colors.find(color => 
          cleanedResponse.toLowerCase().includes(color.toLowerCase())
        );
        
        if (colorMatch) {
          setSelectedColor(colorMatch);
          
          const brands = getBrandsForType(selectedProduct.type);
          if (brands.length > 0) {
            setActiveStep(4);
            addBotMessage(`Excellent choice! Would you like a specific brand? Available brands for ${selectedProduct.type}: ${brands.join(', ')}`);
          } else {
            setActiveStep(3);
            addBotMessage(`Excellent choice! How many ${selectedProduct.name} would you like?`);
          }
        } else if (cleanedResponse.toLowerCase().includes('any') || 
                   cleanedResponse.toLowerCase().includes('random') ||
                   cleanedResponse.toLowerCase().includes('surprise')) {
          const randomColor = selectedProduct.colors[Math.floor(Math.random() * selectedProduct.colors.length)];
          setSelectedColor(randomColor);
          
          const brands = getBrandsForType(selectedProduct.type);
          if (brands.length > 0) {
            setActiveStep(4);
            addBotMessage(`I'll pick a ${randomColor} one for you. Would you like a specific brand? Available brands for ${selectedProduct.type}: ${brands.join(', ')}`);
          } else {
            setActiveStep(3);
            addBotMessage(`I'll pick a ${randomColor} one for you. How many ${selectedProduct.name} would you like?`);
          }
        } else {
          addBotMessage(`I didn't recognize that color. Available options are: ${selectedProduct.colors.join(', ')}. Could you repeat?`);
        }
        break;
      
      case 3: // Quantity selection
        let qty = 1;
        const quantityMatch = cleanedResponse.match(/\d+/);
        
        if (quantityMatch) {
          qty = parseInt(quantityMatch[0]);
        } else {
          const quantityMap = {
            'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
            'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
          };
          
          const quantityWord = Object.keys(quantityMap).find(word => 
            cleanedResponse.toLowerCase().includes(word)
          );
          
          if (quantityWord) {
            qty = quantityMap[quantityWord];
          }
        }
        
        if (qty > 0 && qty <= 10) {
          setQuantity(qty);
          setActiveStep(5);
          addBotMessage(`Adding ${qty} ${qty > 1 ? 'items' : 'item'} to your cart.`);
          
          setTimeout(() => {
            addToCartAndReset(
              selectedProduct,
              selectedSize,
              selectedColor,
              qty,
              selectedBrand
            );
          }, 1500);
        } else {
          addBotMessage("Please enter a quantity between 1 and 10.");
        }
        break;
      
      case 4: // Brand selection
        const brands = getBrandsForType(selectedProduct.type);
        const brandMatch = brands.find(brand => 
          cleanedResponse.toLowerCase().includes(brand.toLowerCase())
        );
        
        if (brandMatch) {
          setSelectedBrand(brandMatch);
          setActiveStep(3);
          addBotMessage(`Great choice! How many ${selectedProduct.name} would you like?`);
        } else if (cleanedResponse.toLowerCase().includes('any') || 
                   cleanedResponse.toLowerCase().includes('random') ||
                   cleanedResponse.toLowerCase().includes('surprise')) {
          const randomBrand = brands[Math.floor(Math.random() * brands.length)];
          setSelectedBrand(randomBrand);
          setActiveStep(3);
          addBotMessage(`I'll pick ${randomBrand} for you. How many ${selectedProduct.name} would you like?`);
        } else if (cleanedResponse.toLowerCase().includes('no') || 
                   cleanedResponse.toLowerCase().includes('skip')) {
          setActiveStep(3);
          addBotMessage(`Okay, I'll add without a specific brand. How many ${selectedProduct.name} would you like?`);
        } else {
          addBotMessage(`I didn't recognize that brand. Available options for ${selectedProduct.type} are: ${brands.join(', ')}. Could you repeat?`);
        }
        break;
      
      default:
        addBotMessage("How else can I assist you?");
        break;
    }
  }, [
    activeStep, 
    selectedProduct,
    selectedColor,
    selectedSize, 
    productType,
    sizeMap,
    selectedBrand,
    addBotMessage, 
    addUserMessage, 
    addToCartAndReset,
    proceedToNextSelectionStep
  ]);

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Web Speech API not supported');
      addBotMessage("Sorry, your browser doesn't support voice commands. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const results = event.results;
      const transcript = Array.from(results)
        .map(result => result[0].transcript)
        .join('');

      if (results[results.length - 1].isFinal) {
        handleUserResponse(transcript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      isListeningRef.current = false;
      addBotMessage("Sorry, I didn't catch that. Could you please repeat?");
    };

    recognitionRef.current.onend = () => {
      if (isListeningRef.current) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [handleUserResponse, addBotMessage]);

  // Initialize messages
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hello! I'm your shopping assistant. How can I help you today?");
      }, 500);
    }
  }, [isOpen, messages.length, addBotMessage]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    
    try {
      setIsListening(true);
      isListeningRef.current = true;
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsListening(false);
      isListeningRef.current = false;
      addBotMessage("Couldn't start listening. Please try again.");
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    
    try {
      if (isListeningRef.current) {
        recognitionRef.current.stop();
      }
      
      setIsListening(false);
      isListeningRef.current = false;
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  const toggleChat = () => {
    const wasOpen = isOpen;
    setIsOpen(!isOpen);
    
    if (wasOpen) {
      stopListening();
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    } else {
      setMessages([]);
      setActiveStep(0);
      setSelectedProduct(null);
      setSelectedSize('');
      setSelectedColor('');
      setSelectedBrand('');
      setProductType('');
      setQuantity(1);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="w-16 h-16 rounded-full bg-[#0071dc] text-white flex items-center justify-center shadow-lg"
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-[#0071dc] text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-bold">Shopping Assistant</h3>
              </div>
              <div className="text-xs">
                {selectedProduct && `${selectedProduct.name}`}
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}
                >
                  <div 
                    className={`inline-block max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.sender === 'bot' 
                        ? 'bg-gray-200 text-gray-800 rounded-bl-none' 
                        : 'bg-blue-500 text-white rounded-br-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t flex items-center">
              {isListening ? (
                <motion.button
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  onClick={stopListening}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mr-2"
                >
                  <FaMicrophone />
                </motion.button>
              ) : (
                <button
                  onClick={startListening}
                  className="w-10 h-10 rounded-full bg-[#0071dc] text-white flex items-center justify-center mr-2"
                >
                  <FaMicrophone />
                </button>
              )}
              
              <div className="flex-1 text-xs text-gray-500">
                {isListening 
                  ? "Listening... Speak now" 
                  : "Click the mic to speak"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;