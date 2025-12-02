import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative min-h-screen px-6 py-28 overflow-hidden">
      {/* Ambient Golden Blurs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full top-0 left-10" />
        <div className="absolute w-80 h-80 bg-yellow-200 opacity-10 blur-[100px] rounded-full bottom-10 right-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-2xl border border-yellow-400/30 p-12 md:p-16 rounded-3xl shadow-2xl text-yellow-50"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-xl font-serif">
          About Us
        </h1>
        <p className="text-lg text-yellow-100/90 leading-relaxed font-medium">
          <strong className="text-yellow-300">श्री अम्बे ज्वेलर्स</strong> — A legacy of trust, elegance, and timeless craftsmanship.
          We create more than ornaments — we craft heirlooms that tell your story with sparkle and soul.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
