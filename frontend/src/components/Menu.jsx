import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart, userId } = useCart();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = (item) => {
    if (!userId) {
      setShowLoginPrompt(true);
      toast('Please login to add items to cart', {
        icon: '🔒',
        duration: 3000,
      });
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleGoToForm = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        const errorMessage = 'Failed to load menu items. Please try again later.';
        setError(errorMessage);
        toast.error(errorMessage, {
          duration: 5000,
        });
        setLoading(false);
      }
    };
    
    const loadingToast = toast.loading('Loading menu...');
    fetchMenuItems().finally(() => {
      toast.dismiss(loadingToast);
    });
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  // Filter items by active category
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (showLoginPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please enter your details to start ordering
          </p>
          <button
            onClick={handleGoToForm}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 font-sans max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-8 font-display">Our Menu</h1>
      
      <div className="relative">
        <div className="flex space-x-2 pb-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                // Smooth scroll to top when changing categories
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-amber-700 text-white font-bold shadow-md'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 font-medium'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item._id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
          >
            <div className="relative h-48 w-full overflow-hidden">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-amber-50 flex items-center justify-center">
                  <span className="text-amber-800 font-medium">No Image Available</span>
                </div>
              )}
            </div>
            
            <div className="p-4 pt-3 flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {item.name}
                  </h2>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                    {item.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-3">
                  {item.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xl font-bold text-amber-700">
                  ₹{item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm md:text-base whitespace-nowrap"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
