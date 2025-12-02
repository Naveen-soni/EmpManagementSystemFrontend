'use client';

import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext'; // ✅ Use toast
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast(); // ✅ Initialize toast
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const img = document.getElementById(`product-${product.id}`);
    if (img) {
      img.classList.add("scale-125", "transition", "duration-300");
      setTimeout(() => {
        addToCart(product);
        navigate("/cart");
      }, 300);
    } else {
      addToCart(product);
      navigate("/cart");
    }
  };

  
const handleAddToWishlist = () => {
  addToWishlist(product);
  showToast("Added to Wishlist ❤️");
};

  return (
    <motion.div
      className="relative w-full sm:w-[280px] bg-black/60 border border-yellow-400/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md hover:scale-[1.03] transition-transform duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔥 Trending Ribbon */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
          TRENDING
        </span>
      </div>

      {/* 🖼️ Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          id={`product-${product.id}`}
          src={product.image}
          alt={product.name}
          className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      </div>

      {/* 📝 Details */}
      <div className="p-5 text-center bg-black/60 backdrop-blur-lg text-yellow-100 border-t border-yellow-400/10">
        <h3 className="text-lg font-semibold tracking-wide mb-1 truncate text-yellow-100">
          {product.name}
        </h3>
        <p className="text-base font-bold text-yellow-400 mb-4">
          ₹{product.price}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold py-2 px-4 rounded-full transition duration-300 shadow-md"
          >
            Wishlist
          </button>
        </div>
      </div>

      {/* ✨ Glow Particle */}
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-yellow-300 opacity-10 blur-3xl rounded-full animate-ping pointer-events-none z-0" />
    </motion.div>
  );
};

export default ProductCard;
