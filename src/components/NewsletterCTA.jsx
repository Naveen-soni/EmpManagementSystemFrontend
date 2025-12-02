import { motion } from "framer-motion";

const NewsletterCTA = () => {
  return (
    <section className="relative py-28 px-6 overflow-hidden isolate">
      {/* Glowing Yellow Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full absolute -top-10 left-10" />
        <div className="w-80 h-80 bg-yellow-100 opacity-10 blur-[100px] rounded-full absolute bottom-0 right-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-yellow-300/30 shadow-2xl text-center text-yellow-50"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-md">
          Get 10% Off Your First Order
        </h2>
        <p className="text-yellow-100/90 mb-8 text-lg">
          Sign up for our newsletter and receive exclusive offers, latest collections & more.
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-5 py-3 rounded-full bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition-all"
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterCTA;
