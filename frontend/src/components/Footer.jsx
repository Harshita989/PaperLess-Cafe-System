
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-amber-900 to-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="relative flex items-center">
                <span className="font-serif text-2xl sm:text-3xl font-bold">Resto</span>
                <span className="font-serif text-3xl sm:text-4xl relative top-1 mx-0.5">C</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold">afe</span>
                <span className="absolute left-[42px] sm:left-[52px] top-[20px] text-xl sm:text-2xl text-amber-200/80 -rotate-2">—</span>
              </div>
            </div>
            <p className="mt-4 text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-md mx-auto md:mx-0">
              Experience the finest dining with our carefully curated menu and warm hospitality. Join us for an unforgettable culinary journey.
            </p>
            <p className="mt-4 text-sm text-amber-100/80">
              &copy; {new Date().getFullYear()} Resto Cafe. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 sm:mb-5 text-amber-50">Quick Links</h3>
            <nav className="flex flex-col space-y-3 sm:space-y-3.5">
              {[
                { name: 'Our Menu', path: '/menu' },
                { name: 'About Us', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition-colors duration-200 w-fit mx-auto md:mx-0"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Hours */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 sm:mb-5 text-amber-50">Contact & Hours</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start space-y-1 sm:space-y-0 sm:space-x-3">
                <FaMapMarkerAlt className="text-amber-200 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-amber-100">123 Cafe Street, Foodie City</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start space-y-1 sm:space-y-0 sm:space-x-3">
                <FaPhoneAlt className="text-amber-200 flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition-colors duration-200">
                  (123) 456-7890
                </a>
              </div>
              <div className="pt-2">
                <p className="text-sm font-semibold text-amber-200 mb-1">Opening Hours:</p>
                <p className="text-sm text-amber-100">Mon-Fri: 8:00 AM - 10:00 PM</p>
                <p className="text-sm text-amber-100">Sat-Sun: 9:00 AM - 11:00 PM</p>
              </div>
              <div className="flex justify-center md:justify-start space-x-4 pt-2">
                <a href="#" className="text-amber-100 hover:text-amber-300 transition-colors duration-200" aria-label="Facebook">
                  <FaFacebookF className="text-lg" />
                </a>
                <a href="#" className="text-amber-100 hover:text-amber-300 transition-colors duration-200" aria-label="Instagram">
                  <FaInstagram className="text-lg" />
                </a>
                <a href="#" className="text-amber-100 hover:text-amber-300 transition-colors duration-200" aria-label="Twitter">
                  <FaTwitter className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
