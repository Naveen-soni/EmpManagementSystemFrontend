'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden text-white"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Soft Golden Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-yellow-200 opacity-10 blur-[100px] rounded-full" />
      </div>

      {/* ✅ Softer golden mist instead of harsh black */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/10 via-yellow-100/5 to-transparent z-0" />

      {/* Content Box - Transparent like Contact */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-yellow-300/20 shadow-2xl rounded-3xl p-10 md:p-16 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-yellow-300 via-white to-yellow-500 text-transparent bg-clip-text drop-shadow-lg mb-6"
        >
          Discover Timeless Elegance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-yellow-100/90 text-lg md:text-xl leading-relaxed mb-8"
        >
          Explore handcrafted jewels for your grandest moments. <br className="hidden md:block" />
          Radiant. Refined. Remarkable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition duration-300 shadow-lg">
            Browse Collection
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-yellow-100 tracking-widest italic z-10">
        Luxury that lasts a lifetime ✨
      </div>
    </section>
  );
};

export default HeroSection;
