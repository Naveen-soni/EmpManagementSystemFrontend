import { motion } from "framer-motion";
import { PhoneCall, MapPin } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative isolate py-28 px-6">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute w-96 h-96 bg-yellow-400 opacity-20 blur-[120px] rounded-full top-0 left-10" />
        <div className="absolute w-80 h-80 bg-yellow-300 opacity-10 blur-[100px] rounded-full bottom-0 right-10" />
      </div>

      {/* Frosted Glass Card */}
      <div className="max-w-5xl mx-auto text-center relative z-10 bg-white/15 backdrop-blur-2xl border border-yellow-400/30 shadow-[0_8px_60px_rgba(255,215,0,0.15)] rounded-3xl px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-xl"
        >
          Visit Us or Book Your Private Appointment
        </motion.h2>

        <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
          Experience timeless jewellery in person at our Jaipur showroom or connect with our experts for a personalized consultation.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.a
            href="tel:+919876543210"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            <PhoneCall className="w-5 h-5" /> Call Now
          </motion.a>

          <motion.a
            href="https://maps.google.com?q=ShreeambeJewellers,Fatehpur,Rajasthan,India"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border-2 border-yellow-400 text-yellow-100 px-6 py-3 rounded-full hover:bg-yellow-300 hover:text-black transition"
          >
            <MapPin className="w-5 h-5" /> Visit Store
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
