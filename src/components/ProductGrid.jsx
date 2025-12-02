'use client';

import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const ProductGrid = ({ products }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative isolate overflow-hidden bg-black/60 backdrop-blur-md py-24 px-6 rounded-3xl shadow-2xl mx-4 md:mx-8"
    >
      {/* ✨ Glowing Gradient Shape */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-[120px] sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 w-[36rem] sm:w-[72rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-300 via-yellow-200 to-yellow-500 opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* 🌌 Subtle Bottom Fade Overlay */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: "linear-gradient(to bottom, transparent, #0e0b05 90%)",
        }}
      />

      {/* 🌟 Stardust Pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#e1c16e_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03] pointer-events-none -z-20"
      />

      {/* 🪙 Heading Section */}
      <div className="mx-auto max-w-2xl text-center z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-white to-yellow-500 text-transparent bg-clip-text drop-shadow-lg"
        >
          Artisanal Selections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-6 text-lg leading-8 text-yellow-100/80"
        >
          Discover pieces that resonate with your soul. Handcrafted to perfection, destined to be cherished.
        </motion.p>
      </div>

      {/* 💍 Product Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap justify-center gap-10 mt-20">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProductGrid;
