import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart, FaHeart, FaRegGem } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = (item) => {
    setIsAnimating(true);
    addToCart(item);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="min-h-screen py-10 px-4 pt-24 overflow-hidden relative bg-gradient-to-br from-yellow-900 via-yellow-700 to-yellow-500">
      
      {/* ✨ Floating Diamond Gems */}
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

      {/* 🌟 Light Reflection */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-white/10 blur-xl"
          animate={{ x: [0, 80, 0], y: [0, 30, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* 🧡 Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center relative z-10"
        >
          <h2 className="text-4xl font-bold mb-2 text-white font-serif tracking-wide">
            Your Treasured Collection
          </h2>
          <p className="text-white/80 max-w-lg mx-auto">
            Jewels that caught your eye. Add them to your bag or keep them close.
          </p>
        </motion.div>

        {/* 🧺 Empty Wishlist */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mb-6"
            >
              <FiHeart className="text-6xl text-white/50" />
            </motion.div>
            <h3 className="text-2xl font-medium text-white mb-2">Your wishlist is empty</h3>
            <p className="text-white/60 max-w-md mx-auto">
              Explore our collection and add stunning pieces to your heart’s list.
            </p>
          </motion.div>
        ) : (
          <motion.div className="space-y-6">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch border border-white/20 hover:shadow-yellow-300/20 transition-all duration-300"
                >
                  {/* 📸 Product Image */}
                  <div className="md:w-1/4 relative overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 md:h-full object-contain p-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white font-medium">{item.metal || "18K Gold"}</span>
                    </div>
                  </div>

                  {/* 📋 Info + Actions */}
                  <div className="p-6 flex-1 flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                      <p className="text-white/70 mb-2">{item.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-300 font-bold text-lg">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-white/50 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 self-end md:self-center">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleAddToCart(item)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
                      >
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-red-400 border border-white/20"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* ✅ Success Toast */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="fixed top-20 right-10 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50"
                >
                  <FaHeart />
                  <span>Added to cart!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
