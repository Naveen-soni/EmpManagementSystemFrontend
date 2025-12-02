import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Bride, Jaipur",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Absolutely stunning jewellery! The craftsmanship is unmatched, and I felt like royalty on my wedding day.",
    rating: 5,
  },
  {
    name: "Rohit Agarwal",
    role: "Businessman, Mumbai",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote:
      "Bought a necklace for my wife’s anniversary. She loved it! The team helped me choose the perfect piece.",
    rating: 4,
  },
  {
    name: "Sneha Sharma",
    role: "Model, Delhi",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "The luxury collection is mesmerizing. I wear their pieces to every shoot. Elegant and timeless.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 px-6">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute w-96 h-96 bg-yellow-500 opacity-20 blur-[120px] rounded-full top-0 left-0" />
        <div className="absolute w-72 h-72 bg-yellow-300 opacity-10 blur-[100px] rounded-full bottom-0 right-10" />
      </div>

      <div className="max-w-6xl mx-auto text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-white to-yellow-500 text-transparent bg-clip-text drop-shadow-xl"
        >
          Hear From Our Happy Clients
        </motion.h2>
        <p className="text-yellow-200/90 mb-12 text-lg">
          Trusted by thousands across India for their most special moments.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl shadow-xl p-6 text-yellow-50 hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover ring-2 ring-yellow-400"
              />
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-yellow-200 mb-2 italic">{t.role}</p>
              <div className="flex justify-center mb-3">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-yellow-100 text-sm italic">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
