import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Glowing Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300 opacity-10 blur-[100px] rounded-full" />
      </div>

      {/* Welcome Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-2xl border border-yellow-300/30 shadow-2xl p-12 rounded-3xl text-yellow-100"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-6">
          Welcome to Shree Ambe Jewellers
        </h1>
        <p className="text-lg md:text-xl text-yellow-100/90">
          Discover timeless beauty, handcrafted brilliance, and unmatched elegance. Let your jewellery tell your story.
        </p>
      </motion.div>
    </section>
  );
};

export default HomePage;
