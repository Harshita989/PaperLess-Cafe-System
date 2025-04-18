
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full h-20 bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] text-white font-sans">
      {/* Add font link if not globally loaded */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-4 h-full flex flex-col md:flex-row justify-between items-center text-sm">
      <h3 className="flex items-center space-x-2">
  <div
    className="relative select-none text-white  "
    
  >
    <span className=" brand-font text-[20px]">D</span>
    <span className="brand-font text-[20px]">A</span>
    <span className="brand-font text-[32px] relative top-[4px] mx-1 font-semibold">A</span>
    <span className="brand-font text-[20px]">U</span>
    <span className="brand-font text-[20px]">R</span>
    <span className="brand-font text-[20px]">A</span>
    <div className="absolute left-[40px] top-[24px] text-[16px] text-white/50 font-cursive -rotate-2 pointer-events-none">—</div>
  </div>
  <span className="text-sm font-normal font-sans">Cafe & Alehouse</span>
</h3>


        <div className="flex space-x-4 mt-2 md:mt-0 font-navigation">
          <Link to="/terms" className="hover:text-yellow-200">Terms</Link>
          <Link to="/privacy" className="hover:text-yellow-200">Privacy</Link>
          <Link to="/contact" className="hover:text-yellow-200">Contact</Link>
        </div>

        <div className="mt-2 md:mt-0 flex items-center text-yellow-100">
          <span>&copy; {new Date().getFullYear()}&nbsp;</span>
          <div
            className="relative select-none"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontWeight: 700,
              letterSpacing: '-4px',
              display: 'flex',
              alignItems: 'center',
              lineHeight: '1',
            }}
          >
            <span className=" brand-font text-[20px]">D</span>
            <span className="brand-font text-[20px]">A</span>
            <span className="brand-font text-[32px] relative top-[4px] mx-1 font-semibold">A</span>
            <span className="brand-font text-[20px]">U</span>
            <span className="brand-font text-[20px]">R</span>
            <span className="brand-font text-[20px]">A</span>
            <div className="absolute left-[40px] top-[24px] text-[16px] text-white/50 font-cursive -rotate-2 pointer-events-none">—</div>
          </div>
          <span className="ml-1">. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
