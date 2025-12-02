import { CheckCircle, ShieldCheck, Gem, Truck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Gem className="h-10 w-10 text-yellow-400" />,
    title: "Exquisite Craftsmanship",
    desc: "Each piece is handcrafted by skilled artisans with attention to every fine detail.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-green-400" />,
    title: "Certified Authenticity",
    desc: "We provide hallmark certified and quality-tested jewellery for complete trust.",
  },
  {
    icon: <Truck className="h-10 w-10 text-blue-400" />,
    title: "Fast & Safe Delivery",
    desc: "Secure, insured delivery to your doorstep with real-time tracking.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-purple-400" />,
    title: "Lifetime Support",
    desc: "Get complimentary cleaning, resizing, and lifetime assistance with every purchase.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 px-6">
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-96 h-96 bg-yellow-300 opacity-10 blur-[120px] rounded-full absolute top-0 left-0" />
        <div className="w-72 h-72 bg-yellow-500 opacity-10 blur-[100px] rounded-full absolute bottom-10 right-10" />
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-white to-yellow-500 text-transparent bg-clip-text drop-shadow-xl"
        >
          Why Choose Shree Ambe Jewellers?
        </motion.h2>
        <p className="text-yellow-200/90 mb-12 text-lg">
          We blend tradition with innovation to bring you jewellery that reflects timeless beauty and trust.
        </p>

        <div className="grid md:grid-cols-2 gap-10 z-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-5 p-6 rounded-2xl bg-white/10 backdrop-blur-xl text-yellow-50 border border-yellow-300/20 shadow-md hover:shadow-yellow-400/30 transition-all"
            >
              <div className="min-w-[40px]">{item.icon}</div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-yellow-100">
                  {item.title}
                </h3>
                <p className="text-yellow-100/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
