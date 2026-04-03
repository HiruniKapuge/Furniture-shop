import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import NewsLetter from './NewsLetter';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-12 mt-12">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo, Description, and Social Media */}
        <div className="flex flex-col gap-6">
          <Link to="/" aria-label="New Sisira Furniture Home">
            <img src={assets.logo} className="w-40" alt="New Sisira Furniture Logo" />
          </Link>
          <p className="text-gray-700 text-base leading-relaxed max-w-md">
            New Sisira Furniture offers durable, high-quality pieces that inspire confidence and elegance, crafted just for you.
          </p>
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold text-gray-800">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white shadow-sm hover:bg-pink-100 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <img src={assets.instaLogo} className="w-8 h-8" alt="Instagram" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white shadow-sm hover:bg-pink-100 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <img src={assets.fbLogo} className="w-8 h-8" alt="Facebook" />
              </a>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-gray-800">Company</h2>
          <ul className="flex flex-col gap-3 text-base text-gray-700">
            <li>
              <Link
                to="/"
                className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                aria-label="Home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                aria-label="FAQs"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                aria-label="About Us"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                aria-label="Our Services"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                aria-label="Terms & Conditions"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter and Contact */}
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-gray-800">Stay Connected</h2>
          <NewsLetter />
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-gray-800">Contact Us</h3>
            <ul className="flex flex-col gap-2 text-base text-gray-700">
              <li className="flex items-center gap-2">
                <span>Phone:</span>
                <div className="flex gap-2">
                  <a
                    href="tel:+94773211603"
                    className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                    aria-label="Call 077-3211603"
                  >
                    077-3211603
                  </a>
                  <span>|</span>
                  <a
                    href="tel:+94718006485"
                    className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                    aria-label="Call 071-8006485"
                  >
                    071-8006485
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span>Email:</span>
                <a
                  href="mailto:sisirafurniture@gmail.com"
                  className="hover:text-pink-600 focus:text-pink-600 transition-colors"
                  aria-label="Email sisirafurniture@gmail.com"
                >
                  sisirafurniture@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-6">
        <p className="text-center text-base text-gray-600">
          © {year} New Sisira Furniture. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;