
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="w-full bg-gradient-to-r from-amber-900 to-amber-800 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
//           {/* Branding */}
//           <div className="text-center md:text-left">
//             <div className="flex items-center justify-center md:justify-start space-x-2">
//               <div className="relative flex items-center">
//                 <span className="font-serif text-2xl sm:text-3xl font-bold">Resto</span>
//                 <span className="font-serif text-3xl sm:text-4xl relative top-1 mx-0.5">C</span>
//                 <span className="font-serif text-2xl sm:text-3xl font-bold">afe</span>
//                 <span className="absolute left-[42px] sm:left-[52px] top-[20px] text-xl sm:text-2xl text-amber-200/80 -rotate-2">—</span>
//               </div>
//             </div>
//             <p className="mt-4 text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-md mx-auto md:mx-0">
//               Experience the finest dining with our carefully curated menu and warm hospitality. Join us for an unforgettable culinary journey.
//             </p>
//             <p className="mt-4 text-sm text-amber-100/80">
//               &copy; {new Date().getFullYear()} Resto Cafe. All rights reserved.
//             </p>
//           </div>

//           {/* Navigation */}
//           <div className="text-center md:text-left">
//             <h3 className="text-lg font-semibold mb-4 sm:mb-5 text-amber-50">Quick Links</h3>
//             <nav className="flex flex-col space-y-3 sm:space-y-3.5">
//               {[
//                 { name: 'Our Menu', path: '/menu' },
//                 { name: 'About Us', path: '/about' },
//                 { name: 'Gallery', path: '/gallery' },
//                 { name: 'Contact Us', path: '/contact' },
//               ].map((item) => (
//                 <Link 
//                   key={item.path}
//                   to={item.path} 
//                   className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition-colors duration-200 w-fit mx-auto md:mx-0"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* Contact & Hours */}
//           <div className="text-center md:text-left">
//             <h3 className="text-lg font-semibold mb-4 sm:mb-5 text-amber-50">Contact & Hours</h3>
//             <div className="space-y-3 sm:space-y-4">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start space-y-1 sm:space-y-0 sm:space-x-3">
//                 <FaMapMarkerAlt className="text-amber-200 flex-shrink-0 mt-0.5" />
//                 <span className="text-sm sm:text-base text-amber-100">123 Cafe Street, Foodie City</span>
//               </div>
//               <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start space-y-1 sm:space-y-0 sm:space-x-3">
//                 <FaPhoneAlt className="text-amber-200 flex-shrink-0 mt-0.5" />
//                 <a href="tel:+1234567890" className="text-sm sm:text-base text-amber-100 hover:text-amber-300 transition-colors duration-200">
//                   (123) 456-7890
//                 </a>
//               </div>
//               <div className="pt-2">
//                 <p className="text-sm font-semibold text-amber-200 mb-1">Opening Hours:</p>
//                 <p className="text-sm text-amber-100">Mon-Fri: 8:00 AM - 10:00 PM</p>
//                 <p className="text-sm text-amber-100">Sat-Sun: 9:00 AM - 11:00 PM</p>
//               </div>
//               <div className="flex justify-center md:justify-start space-x-4 pt-2">
//                 <a href="#" className="text-amber-100 hover:text-amber-300 transition-colors duration-200" aria-label="Facebook">
//                   <FaFacebookF className="text-lg" />
//                 </a>
//                 <a href="#" className="text-amber-100 hover:text-amber-300 transition-colors duration-200" aria-label="Instagram">
//                   <FaInstagram className="text-lg" />
//                 </a>
//                 <a href="#" className="text-amber-100 hover:text-amber-300 transition-colors duration-200" aria-label="Twitter">
//                   <FaTwitter className="text-lg" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-[#4e342e] via-[#6d4c41] to-[#3e2723] text-white shadow-inner relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/brown-texture.png')] bg-cover bg-center opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-12">
          {/* Branding */}
          <div className="text-center md:text-left animate-fade-in">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="relative flex items-center text-amber-100">
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-wide">Resto</span>
                <span className="font-serif text-4xl sm:text-5xl relative top-1 mx-1">C</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-wide">afe</span>
                <span className="absolute left-[42px] sm:left-[54px] top-[22px] text-xl sm:text-2xl text-yellow-300/70 -rotate-2">—</span>
              </div>
            </div>
            <p className="mt-5 text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-md mx-auto md:mx-0">
              A blend of taste and tradition. Discover a cozy corner where every bite feels like home.
            </p>
            <p className="mt-4 text-xs text-yellow-200/70 tracking-wide">
              &copy; {new Date().getFullYear()} Resto Cafe. Crafted with love.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-5 text-yellow-200 border-b border-yellow-400 inline-block pb-1">
              Quick Links
            </h3>
            <nav className="flex flex-col items-center md:items-start space-y-3 mt-4">
              {[
                { name: 'Our Menu', path: '/menu' },
                { name: 'About Us', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm sm:text-base text-amber-100 hover:text-yellow-300 transition-all duration-300 hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Hours */}
          <div className="text-center md:text-left animate-fade-in delay-200">
            <h3 className="text-xl font-semibold mb-5 text-yellow-200 border-b border-yellow-400 inline-block pb-1">
              Contact & Hours
            </h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-center md:justify-start space-x-3 text-amber-100">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span className="text-sm">123 Cafe Street, Foodie City</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-amber-100">
                <FaPhoneAlt className="text-yellow-300" />
                <a
                  href="tel:+1234567890"
                  className="text-sm hover:text-yellow-300 transition-colors duration-200"
                >
                  (123) 456-7890
                </a>
              </div>
              <div className="pt-1 text-amber-100">
                <p className="text-sm font-semibold text-yellow-200 mb-1">Opening Hours:</p>
                <p className="text-sm">Mon-Fri: 8:00 AM - 10:00 PM</p>
                <p className="text-sm">Sat-Sun: 9:00 AM - 11:00 PM</p>
              </div>
              <div className="flex justify-center md:justify-start space-x-4 pt-3">
                <a href="#" className="text-amber-100 hover:text-yellow-400 transition-transform duration-300 hover:scale-110" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-amber-100 hover:text-yellow-400 transition-transform duration-300 hover:scale-110" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="text-amber-100 hover:text-yellow-400 transition-transform duration-300 hover:scale-110" aria-label="Twitter">
                  <FaTwitter />
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
