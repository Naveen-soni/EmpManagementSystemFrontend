// src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaGem, FaRegGem } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [activeBackground, setActiveBackground] = useState(0);
  
  // Backgrounds with different luxury themes
  const backgrounds = [
    // Gold Luxury
    "bg-gradient-to-br from-yellow-900 via-yellow-700 to-yellow-500",
  ];

  // Rotate backgrounds every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 500);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className={`min-h-screen py-10 px-4 pt-24 overflow-hidden relative transition-all duration-1000 ${backgrounds[activeBackground]}`}>
      
      {/* Animated floating diamonds */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 24 + 12}px`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaRegGem />
        </motion.div>
      ))}

      {/* Light reflections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-white/10 blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header with background selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center relative z-10"
        >
          <div className="flex justify-center space-x-2 mb-4">
            {backgrounds.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveBackground(index)}
                className={`w-3 h-3 rounded-full transition-all ${activeBackground === index ? 'bg-white scale-125' : 'bg-white/30'}`}
              />
            ))}
          </div>
          <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-md font-serif tracking-wide">
            Your Jewelry Collection
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">
            Review your precious selections before checkout
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 relative z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="inline-block mb-6"
            >
              <FiShoppingBag className="text-6xl text-white/70" />
            </motion.div>
            <h3 className="text-2xl font-medium text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-white/70 max-w-md mx-auto">
              Your collection of precious jewelry awaits. Start exploring our catalog.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20">
                <div className="p-6 border-b border-white/20 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'} in Your Cart
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearCart}
                    className="text-white/70 hover:text-white text-sm flex items-center gap-1"
                  >
                    <FaTrash size={12} />
                    <span>Clear All</span>
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: removingId === item.id ? 0.5 : 1, 
                        y: 0,
                        x: removingId === item.id ? -50 : 0
                      }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`p-6 border-b border-white/20 last:border-b-0 flex flex-col sm:flex-row gap-6 ${removingId === item.id ? 'bg-white/5' : ''}`}
                    >
                      <div className="sm:w-1/4 aspect-square bg-white/10 rounded-lg overflow-hidden flex items-center justify-center relative">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white text-sm font-medium">
                            {item.metal || "18K Gold"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="sm:w-3/4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">{item.name}</h4>
                          <p className="text-white/70 text-sm mb-3">{item.category}</p>
                          <p className="text-yellow-300 font-bold">₹{item.price.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-white/20 rounded-full bg-white/10">
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-l-full"
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus size={12} />
                            </motion.button>
                            <span className="px-4 text-white">{item.quantity}</span>
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-r-full"
                            >
                              <FaPlus size={12} />
                            </motion.button>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemove(item.id)}
                            className="text-white/70 hover:text-white flex items-center gap-2"
                          >
                            <FaTrash />
                            <span className="hidden sm:inline">Remove</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 sticky top-8"
              >
                <div className="p-6 border-b border-white/20">
                  <h3 className="text-xl font-semibold text-white">Order Summary</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/80">Subtotal</span>
                    <span className="font-medium text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/80">Shipping</span>
                    <span className="font-medium text-white">
                      {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4 flex justify-between">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-yellow-300 font-bold text-xl">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white py-4 rounded-full font-medium mt-6 shadow-lg relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaShoppingBag />
                      Proceed to Checkout
                    </span>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: [ -100, 300 ], opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12"
                    />
                  </motion.button>
                  
                  <p className="text-center text-sm text-white/70 mt-4">
                    Free shipping on orders over ₹10,000
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="text-white/80 text-sm font-medium mb-2">Secure Checkout</h4>
                    <div className="flex justify-center space-x-4">
                      {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                        <div key={method} className="bg-white/10 rounded p-2 text-white/70">
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Confirmation animation */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, y: -20 }}
              className="fixed top-20 right-10 bg-white text-yellow-700 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 border border-yellow-300"
            >
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 0.5 }}
              >
                <FaGem />
              </motion.div>
              <span>Cart updated!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating action button */}
        {cart.length > 0 && (
          <motion.div 
            className="fixed bottom-24 right-4 z-50 border border-black-300 rounded-full shadow-lg "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.button
              whileHover={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-xl flex items-center justify-center text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <FaShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;