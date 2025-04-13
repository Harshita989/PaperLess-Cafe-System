import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items.');
        setLoading(false);
      }
    };

    fetchMenuItems();
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

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-12 font-display">Our Menu</h1>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-montserrat font-medium transition-colors duration-300 ${activeCategory === category 
              ? 'bg-amber-700 text-white' 
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div 
            key={item._id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
          <div className="h-48 bg-amber-50 flex items-center justify-center text-amber-800">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              ) : (
                <span className="font-montserrat">
                  No Image Available
                </span>
              )}
          </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold font-montserrat text-gray-800">
                  {item.name}
                </h2>
                <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 font-open-sans">
                {item.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-amber-700">
                ₹ {item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors duration-300 font-montserrat"
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
