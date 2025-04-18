
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/images/image1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  return (
    <header className="w-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] shadow-lg sticky top-0 z-20">
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo + Brand Name */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Da Aura Logo" className="h-12 sm:h-16" />
            <div className="relative text-white select-none">
  <span className="brand-font text-[32px] sm:text-[56px]">D</span>
  <span className="brand-font text-[32px] sm:text-[56px]">A</span>
  <span className="brand-font text-[48px] sm:text-[88px] relative top-[3px] sm:top-[6px] mx-1">A</span>
  <span className="brand-font text-[32px] sm:text-[56px]">U</span>
  <span className="brand-font text-[32px] sm:text-[56px]">R</span>
  <span className="brand-font text-[32px] sm:text-[56px]">A</span>

  <div className="absolute left-[40px] sm:left-[65px] top-[25px] sm:top-[40px] text-[20px] sm:text-[36px] text-white/50 font-cursive -rotate-2 pointer-events-none">
    —
  </div>
</div>
          </Link>

          {/* Desktop Navigation */}
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
                className="text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm tracking-wide"
              >
                {item.name}
              </Link>
            ))}

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-2 bg-white text-[#6F4E37] px-5 py-2 rounded-lg hover:bg-yellow-100 transition-all"
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

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <FiX className="h-8 w-8" /> : <FiMenu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-4 pb-4 space-y-2 bg-[#855E42]">
            {[
              { name: 'Home', path: '/home' },
              { name: 'Menu', path: '/menu' },
              { name: 'Admin', path: '/admin' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-3 text-white hover:bg-[#A67B5B] rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center justify-between px-4 py-3 bg-[#6F4E37] text-white rounded-lg"
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
