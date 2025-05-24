
// // import React, { useState } from 'react';
// // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import { useCart } from '../context/CartContext';
// // import { FiShoppingCart, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
// // import { toast } from 'react-hot-toast';
// // import logo from '../assets/images/logo.webp';

// // const Navbar = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const { getCartItemsCount, clearCart } = useCart();
// //   const location = useLocation();
// //   const navigate = useNavigate();
  
// //   const userData = JSON.parse(localStorage.getItem('cafeUserData') || 'null');
  
// //   const handleLogout = () => {
// //     // Clear user data from localStorage
// //     localStorage.removeItem('cafeUserData');
// //     localStorage.removeItem('cafeUserId');
    
// //     // Clear cart
// //     clearCart();
    
// //     // Show logout message
// //     toast.success('Successfully logged out', {
// //       duration: 3000,
// //       style: {
// //         borderLeft: '4px solid #10B981',
// //         background: '#ECFDF5',
// //         color: '#065F46',
// //       },
// //     });
    
// //     // Navigate to home
// //     navigate('/');
// //   };
  
// //   const navItems = [
// //     { name: 'Menu', path: '/menu' },
// //     { name: 'About', path: '/about' },
// //   ];
  
// //   // Add My Orders link if user is logged in
// //   if (userData) {
// //     navItems.push({ name: '🧾 My Orders', path: '/orders' });
// //   }

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 to-amber-800 shadow-md w-full">
// //       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16 sm:h-20">
// //           {/* Logo + Brand Name */}
// //           <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
// //             <img 
// //               src={logo} 
// //               alt="Resto Cafe Logo" 
// //               className="h-10 w-auto" 
// //             />
// //             <div className="relative select-none text-white whitespace-nowrap flex items-center">
// //               <span className="font-serif text-2xl sm:text-3xl font-bold">Resto</span>
// //               <span className="font-serif text-3xl sm:text-4xl relative top-1 mx-0.5">C</span>
// //               <span className="font-serif text-2xl sm:text-3xl font-bold">afe</span>
// //               <span className="absolute left-[38px] sm:left-[46px] top-[18px] sm:top-[22px] text-xl sm:text-2xl text-amber-200/80 -rotate-2 pointer-events-none">
// //                 —
// //               </span>
// //             </div>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <div className="hidden md:flex items-center space-x-1">
// //             {userData && (
// //               <div className="flex items-center space-x-2">
// //                 <span className="text-amber-100 px-3 py-2 text-sm font-medium">
// //                   Welcome, {userData.name}!
// //                 </span>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="flex items-center text-amber-100 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-amber-700/30"
// //                   title="Logout"
// //                 >
// //                   <FiLogOut className="h-5 w-5" />
// //                 </button>
// //               </div>
// //             )}
// //             {navItems.map((item) => (
// //               <Link
// //                 key={item.name}
// //                 to={item.path}
// //                 className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
// //                   location.pathname === item.path
// //                     ? 'bg-amber-700/50 text-white'
// //                     : 'text-amber-100 hover:bg-amber-700/30 hover:text-white'
// //                 }`}
// //               >
// //                 {item.name}
// //               </Link>
// //             ))}
// //             <Link
// //               to="/cart"
// //               className="ml-2 flex items-center p-2.5 rounded-full text-amber-100 hover:bg-amber-700/30 hover:text-white transition-all duration-200 relative group"
// //               aria-label="Shopping Cart"
// //             >
// //               <FiShoppingCart className="h-5 w-5" />
// //               {getCartItemsCount() > 0 && (
// //                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
// //                   {getCartItemsCount()}
// //                 </span>
// //               )}
// //             </Link>
// //           </div>

// //           {/* Mobile Toggle */}
// //           <div className="flex items-center md:hidden">
// //             <Link
// //               to="/cart"
// //               className="relative p-2 mr-2 text-amber-100 hover:text-white transition-colors duration-200"
// //               aria-label="Shopping Cart"
// //             >
// //               <FiShoppingCart className="h-6 w-6" />
// //               {getCartItemsCount() > 0 && (
// //                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
// //                   {getCartItemsCount()}
// //                 </span>
// //               )}
// //             </Link>
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="inline-flex items-center justify-center p-2 rounded-lg text-amber-100 hover:bg-amber-700/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200"
// //               aria-expanded={isOpen}
// //               aria-label={isOpen ? 'Close menu' : 'Open menu'}
// //             >
// //               {isOpen ? (
// //                 <FiX className="block h-6 w-6" aria-hidden="true" />
// //               ) : (
// //                 <FiMenu className="block h-6 w-6" aria-hidden="true" />
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile Navigation */}
// //         <div className={`md:hidden transition-all duration-300 ease-in-out ${
// //           isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
// //         }`}>
// //           <div className="px-4 py-3 space-y-1 bg-amber-800 shadow-lg">
// //             {navItems.map((item) => (
// //               <Link
// //                 key={item.name}
// //                 to={item.path}
// //                 className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
// //                   location.pathname === item.path
// //                     ? 'bg-amber-700/50 text-white'
// //                     : 'text-amber-100 hover:bg-amber-700/30 hover:text-white'
// //                 }`}
// //                 onClick={() => setIsOpen(false)}
// //               >
// //                 {item.name}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };


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
    localStorage.removeItem('cafeUserData');
    localStorage.removeItem('cafeUserId');
    clearCart();
    toast.success('Successfully logged out');
    navigate('/');
  };

  const navItems = [
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
  ];
  if (userData) navItems.push({ name: '🧾 My Orders', path: '/orders' });

  return (
<nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#4B2E2E]/80 via-[#5C3A21]/70 to-[#3B2C27]/80 backdrop-blur-lg shadow-xl border-b border-amber-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 animate-fadeIn">
            <div className="relative group">
              <img
                src={logo}
                alt="Resto Cafe"
                className="h-11 w-11 rounded-full border-2 border-amber-400 shadow-md transition-all duration-500 group-hover:rotate-12 group-hover:scale-105"
              />
              <span className="absolute -inset-1 blur-md bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full opacity-30 group-hover:opacity-50 transition-all"></span>
            </div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-200 text-3xl sm:text-4xl font-extrabold font-[Poppins] tracking-wider drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.3)]">
              Resto<span className="italic animate-pulse">Cafe</span>
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-5">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`relative px-4 py-2 text-lg font-semibold transition-all duration-300 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-white bg-amber-700/60 shadow-md'
                    : 'text-amber-100 hover:text-white hover:bg-amber-700/30'
                } hover:scale-105`}
              >
                {item.name}
              </Link>
            ))}
            {userData && (
              <>
                <span className="text-amber-100 font-medium text-sm">Hi, {userData.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-amber-100 hover:text-white hover:bg-amber-700/30 transition"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </>
            )}
            <Link
              to="/cart"
              className="relative p-2 text-amber-100 hover:text-white hover:bg-amber-700/30 rounded-full transition-all"
              aria-label="Cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 text-amber-100 hover:text-white transition">
              <FiShoppingCart className="h-6 w-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 text-amber-100 hover:text-white transition"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-amber-900/90 backdrop-blur-md rounded-xl shadow-lg transition-all duration-500 animate-slideDown">
            <div className="flex flex-col px-4 py-3 space-y-2">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    location.pathname === item.path
                      ? 'bg-amber-700 text-white'
                      : 'text-amber-100 hover:bg-amber-700/30 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {userData && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-left text-amber-100 hover:text-white hover:bg-amber-700/30 rounded-md transition"
                >
                  <FiLogOut className="h-5 w-5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
