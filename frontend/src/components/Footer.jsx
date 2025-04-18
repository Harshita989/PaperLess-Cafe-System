import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-xl font-bold font-display">Da Aura Cafe & Alehouse</h3>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-amber-200 font-navigation">Terms</Link>
            <Link to="/privacy" className="hover:text-amber-200 font-navigation">Privacy</Link>
            <Link to="/contact" className="hover:text-amber-200 font-navigation">Contact</Link>
          </div>
          <p className="text-amber-200 mt-4 md:mt-0"> {new Date().getFullYear()} Da Aura. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
