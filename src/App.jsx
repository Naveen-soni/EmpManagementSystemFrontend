import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext"; // ✅ moved up

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import Footer from "./components/Footer";
import RevealOnScroll from "./components/RevealOnScroll";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import NewsletterCTA from "./components/NewsletterCTA";
import CallToAction from "./components/CallToAction";
import NewsletterSignup from "./components/NewsletterSignup";
import Contact from "./components/Contact";
import Collection from "./pages/Collection";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";
import ChatbotToggle from "./components/ChatbotToggle";
import ScrollToTop from "./components/ScrollToTop";

function AppContent() {
  const location = useLocation();
  const backgroundImage = "/images/hero-bg.png"; // ✅ background

  return (
    <motion.div
      key={backgroundImage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-cover bg-center text-black font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <RevealOnScroll>
                <HeroSection />

                <section className="relative py-28 px-6 overflow-hidden isolate">
                  {/* Yellow Glow Orbs */}
                  <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="w-[500px] h-[500px] bg-yellow-400 opacity-20 blur-[120px] rounded-full absolute -top-32 left-10" />
                    <div className="w-[400px] h-[400px] bg-yellow-100 opacity-10 blur-[100px] rounded-full absolute bottom-0 right-10" />
                  </div>

                  {/* Product Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-yellow-300/30 shadow-2xl text-yellow-50"
                  >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text drop-shadow-md">
                      Featured Jewellery
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </motion.div>
                </section>

                <NewsletterCTA />
                <WhyChooseUs />
                <Testimonials />
                <CallToAction />
                <Contact />
                <NewsletterSignup />
                <Footer />
              </RevealOnScroll>
            </>
          }
        />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>

      <ChatbotToggle />
    </motion.div>
  );
}

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
       <ToastProvider> {/* ✅ Wrap here */}
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <AppContent />
          </AnimatePresence>
        </ToastProvider>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
