import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-yellow-300 opacity-10 blur-[100px] rounded-full" />
      </div>

      {/* Glass Card Container */}
      <div className="max-w-6xl mx-auto relative z-10 bg-white/15 backdrop-blur-2xl border border-yellow-400/30 shadow-[0_8px_60px_rgba(255,215,0,0.2)] rounded-3xl p-12 md:p-16 text-white/90">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text mb-12 drop-shadow-xl"
        >
          Get in Touch with Shree Ambe Jewellers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Visit our showroom or connect online to explore timeless creations
              with expert guidance. Let’s find your perfect piece.
            </p>

            <div>
              <p className="font-semibold text-yellow-300">📍 Address</p>
              <p>Shree Ambe Jewellers, Baawri Gate, Fatehpur, Rajasthan</p>
            </div>

            <div>
              <p className="font-semibold text-yellow-300">📞 Phone</p>
              <p>+91-9876543210</p>
            </div>

            <div>
              <p className="font-semibold text-yellow-300">📧 Email</p>
              <p>contact@ShreeAmbejewellers.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white/10 text-yellow-100 border border-yellow-300/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-200 shadow-md"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/10 text-yellow-100 border border-yellow-300/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-200 shadow-md"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full bg-white/10 text-yellow-100 border border-yellow-300/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-200 shadow-md"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transform transition duration-300 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
