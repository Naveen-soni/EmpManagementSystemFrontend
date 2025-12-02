'use client';

import { motion } from "framer-motion";

const RevealOnScroll = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
