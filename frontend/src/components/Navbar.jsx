
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import logo from '../assets/images/logo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemsCount, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  const userData = JSON.parse(localStorage.getItem('cafeUserData') || 'null');
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('cafeUserData');
    localStorage.removeItem('cafeUserId');
    
    // Clear cart
    clearCart();
    
    // Show logout message
    toast.success('Successfully logged out', {
      duration: 3000,
      style: {
        borderLeft: '4px solid #10B981',
        background: '#ECFDF5',
        color: '#065F46',
      },
    });
    
    // Navigate to home
    navigate('/');
  };
  
  const navItems = [
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
  ];
  
  // Add My Orders link if user is logged in
  if (userData) {
    navItems.push({ name: '🧾 My Orders', path: '/orders' });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 to-amber-800 shadow-md w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Brand Name */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src={logo} 
              alt="Resto Cafe Logo" 
              className="h-10 w-auto" 
            />
            <div className="relative select-none text-white whitespace-nowrap flex items-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold">Resto</span>
              <span className="font-serif text-3xl sm:text-4xl relative top-1 mx-0.5">C</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold">afe</span>
              <span className="absolute left-[38px] sm:left-[46px] top-[18px] sm:top-[22px] text-xl sm:text-2xl text-amber-200/80 -rotate-2 pointer-events-none">
                —
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {userData && (
              <div className="flex items-center space-x-2">
                <span className="text-amber-100 px-3 py-2 text-sm font-medium">
                  Welcome, {userData.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-amber-100 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-amber-700/30"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            )}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-amber-700/50 text-white'
                    : 'text-amber-100 hover:bg-amber-700/30 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="ml-2 flex items-center p-2.5 rounded-full text-amber-100 hover:bg-amber-700/30 hover:text-white transition-all duration-200 relative group"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <Link
              to="/cart"
              className="relative p-2 mr-2 text-amber-100 hover:text-white transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="h-6 w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-amber-100 hover:bg-amber-700/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}>
          <div className="px-4 py-3 space-y-1 bg-amber-800 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-amber-700/50 text-white'
                    : 'text-amber-100 hover:bg-amber-700/30 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
