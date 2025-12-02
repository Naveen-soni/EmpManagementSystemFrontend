import { motion } from "framer-motion";

const NewsletterSignup = () => {
  return (
    <section className="relative py-24 px-6 isolate">
      {/* ✨ Glowing Orbs Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="w-96 h-96 bg-yellow-300 opacity-10 blur-[120px] rounded-full absolute -top-10 left-0" />
        <div className="w-80 h-80 bg-yellow-100 opacity-10 blur-[100px] rounded-full absolute bottom-0 right-10" />
      </div>

      {/* 💎 Glassmorphic Box */}
      <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-2xl p-10 rounded-3xl border border-yellow-300/30 shadow-2xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-4"
        >
          Stay in the Loop
        </motion.h2>
        <p className="text-yellow-100/90 mb-8 text-lg">
          Be the first to know about new collections, exclusive offers, and behind-the-scenes stories from  श्री अम्बे ज्वेलर्स.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition-all"
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
