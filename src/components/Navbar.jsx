'use client';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import GoldRateTicker from "./GoldRateTicker";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md border-b border-yellow-300/20 shadow-[0_8px_30px_rgba(255,215,0,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* LOGO with Glow */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold tracking-wider cursor-pointer bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-lg relative z-10"
        >
          श्री अम्बे ज्वेलर्स
          <div className="absolute -inset-3 bg-yellow-400 opacity-10 blur-2xl rounded-full -z-10" />
        </motion.h1>

        {/* GOLD RATE TICKER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden md:block"
        >
          <GoldRateTicker />
        </motion.div>

        {/* NAV LINKS + ICONS */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-6 text-sm md:text-base font-medium"
        >
          {["Collection", "About", "Contact"].map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate(`/${item.toLowerCase()}`)}
              className="relative group text-yellow-100 hover:text-yellow-300 transition"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}

          {/* Wishlist Icon with Count */}
          <motion.div
            whileHover={{ scale: 1.3, rotate: -5 }}
            className="cursor-pointer text-yellow-300 hover:text-yellow-400 transition relative"
            onClick={() => navigate("/wishlist")}
          >
            <FaHeart className="text-lg" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                {wishlist.length}
              </span>
            )}
          </motion.div>

          {/* Cart Icon with Count */}
          <motion.div
            whileHover={{ scale: 1.3, rotate: 5 }}
            className="cursor-pointer text-yellow-300 hover:text-yellow-400 transition relative"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-lg" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                {cart.length}
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
