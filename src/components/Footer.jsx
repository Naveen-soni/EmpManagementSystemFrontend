import { FaInstagram, FaFacebookF, FaYoutube, FaCrown } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-20 px-6 isolate overflow-hidden">
      {/* Glowing Gold Orbs */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute w-96 h-96 bg-yellow-400 opacity-10 blur-3xl rounded-full top-0 left-0" />
        <div className="absolute w-72 h-72 bg-yellow-200 opacity-10 blur-2xl rounded-full bottom-0 right-0" />
      </div>

      {/* Glassmorphic Content Box */}
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-10 md:p-16 border border-yellow-100/10 shadow-2xl relative z-10">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand Logo & Info */}
          <div>
            <FaCrown className="text-yellow-400 text-3xl mb-3" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">श्री अम्बे ज्वेलर्स</h2>
            <p className="text-sm text-yellow-100/70 leading-relaxed">
              Where tradition meets elegance. Discover handcrafted luxury made to shine forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-200 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-yellow-100/70">
              <li className="hover:text-yellow-300 hover:underline underline-offset-4 cursor-pointer transition">Home</li>
              <li className="hover:text-yellow-300 hover:underline underline-offset-4 cursor-pointer transition">Collection</li>
              <li className="hover:text-yellow-300 hover:underline underline-offset-4 cursor-pointer transition">About Us</li>
              <li className="hover:text-yellow-300 hover:underline underline-offset-4 cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-200 mb-4">Contact</h3>
            <p className="text-sm text-yellow-100/70">📍 Baawri Gate, Fatehpur, Rajasthan, India</p>
            <p className="text-sm text-yellow-100/70">📞 +91-9876543210</p>
            <p className="text-sm text-yellow-100/70">📧 info@ShreeAmbeJewellers.in</p>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-200 mb-4">Follow Us</h3>
            <div className="flex gap-4 text-yellow-100/70 text-lg">
              <a href="#" className="hover:text-yellow-300 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-yellow-300 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-yellow-300 transition"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-gradient-to-r from-yellow-300/20 to-yellow-100/10 mt-12 mb-6"></div>

        {/* Bottom Copyright */}
        <div className="text-center text-[0.75rem] tracking-widest uppercase text-yellow-100/40">
          © {new Date().getFullYear()} <span className="text-yellow-300 font-semibold">श्री अम्बे ज्वेलर्स</span> — All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;