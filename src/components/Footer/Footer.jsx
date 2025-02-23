// src/components/Footer/Footer.jsx
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Exclusive Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Exclusive</h3>
            <div className="mb-4">
              <h4 className="text-lg mb-2">Subscribe</h4>
              <p className="text-gray-400 mb-4">Get 10% off your first order</p>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-black border border-white rounded-l px-4 py-2 w-full focus:outline-none focus:border-gray-400"
                />
                <button
                  type="submit"
                  className="border border-l-0 border-white rounded-r px-4 hover:bg-white hover:text-black transition-colors"
                >
                  →
                </button>
              </form>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Support</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">1234, Park Street,</p>
              <p className="mb-4">DL-111111, India.</p>
              <a
                href="mailto:Test@testmail.com"
                className="block mb-2 hover:text-white"
              >
                Test@testmail.com
              </a>
              <a href="tel:+91-999-999-9999" className="block hover:text-white">
                +91-999-999-9999
              </a>
            </address>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Account</h3>
            <ul className="space-y-2">
              <li>
                <a href="/account" className="text-gray-400 hover:text-white">
                  My Account
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-white">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-400 hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="/wishlist" className="text-gray-400 hover:text-white">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Link</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section - Full Width Border */}
      <div className="border-t border-gray-800 mt-8">
        <div className="container mx-auto px-4">
          <p className="py-8 text-center text-gray-400">
            © Copyright Harmoni 2025. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
