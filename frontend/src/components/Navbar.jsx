import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/images/image1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  return (
    <header className="w-full bg-gradient-to-r from-amber-600 to-amber-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="HotShots Logo" className="h-16" />
            <span className="text-3xl font-bold text-white font-display">Da Aura</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: 'Home', path: '/home' },
              { name: 'Menu', path: '/menu' },
              { name: 'Admin', path: '/admin' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-sm font-navigation"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center space-x-2 bg-white text-amber-800 px-5 py-2 rounded-lg hover:bg-amber-100 transition-all"
            >
              <FiShoppingCart className="text-xl" />
              <span>Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <FiX className="h-8 w-8" /> : <FiMenu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-4 pb-4 space-y-2 bg-amber-700">
            {[
              { name: 'Home', path: '/home' },
              { name: 'Menu', path: '/menu' },
              { name: 'Admin', path: '/admin' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-3 text-white hover:bg-amber-600 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center justify-between px-4 py-3 bg-amber-800 text-white rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <span>Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
