import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdmin } from '../../context/AdminContext';
import { Navigate } from 'react-router-dom';
import AdminLoginModal from './AdminLoginModal';

const MenuManagement = () => {
  const { isAdmin, logout } = useAdmin();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
    imageUrl: '',
    ingredients: '',
    preparationTime: '',
  });
  
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [editingId, setEditingId] = useState(null);
  
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:9000/api/menu');
      setMenuItems(res.data);
    } catch (err) {
      console.error('Failed to fetch menu items', err);
      setMessage({ text: 'Failed to load menu items', type: 'error' });
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchMenuItems();
    }
  }, [isAdmin]);
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Required</h2>
          <p className="text-gray-600">Please log in to access the admin dashboard</p>
          <AdminLoginModal forceOpen={true} onSuccess={() => window.location.href = '/admin-dashboard/menu'} />
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name.trim()) {
        setMessage({ text: 'Name is required', type: 'error' });
        return;
      }
      if (!formData.price || parseFloat(formData.price) <= 0) {
        setMessage({ text: 'Price must be a positive number', type: 'error' });
        return;
      }
      if (!formData.category) {
        setMessage({ text: 'Category is required', type: 'error' });
        return;
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()) : [],
        preparationTime: parseInt(formData.preparationTime) || 0,
      };

      if (editingId) {
        await axios.put(`http://localhost:9000/api/menu/${editingId}`, payload);
        setMessage({ text: 'Menu item updated successfully!', type: 'success' });
      } else {
        await axios.post('http://localhost:9000/api/menu', payload);
        setMessage({ text: 'Menu item added successfully!', type: 'success' });
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        isAvailable: true,
        imageUrl: '',
        ingredients: '',
        preparationTime: '',
      });
      setEditingId(null);
      fetchMenuItems();
    } catch (err) {
      console.error('Submit failed:', err);
      setMessage({ text: 'Failed to save menu item', type: 'error' });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isAvailable: item.isAvailable,
      imageUrl: item.imageUrl,
      ingredients: item.ingredients.join(', '),
      preparationTime: item.preparationTime,
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/menu/${id}`);
      setMessage({ text: 'Menu item deleted successfully!', type: 'success' });
      fetchMenuItems();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage({ text: 'Failed to delete menu item', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-800 mb-6 font-display">
          {editingId ? 'Update Menu Item' : 'Add New Menu Item'}
        </h2>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} font-sans`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Item name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Price*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Price"
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="Starter">Starter</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
              <option value="Side Dish">Side Dish</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows="3"
              placeholder="Item description"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Ingredients</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Comma separated ingredients"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Preparation Time (minutes)</label>
            <input
              type="number"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Preparation time"
              min="0"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>
          
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors font-navigation"
            >
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-800 mb-6 font-display">Menu Items</h2>
        
        {menuItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <tr key={item._id} className="hover:bg-amber-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.imageUrl && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img className="h-10 w-10 rounded-full object-cover" src={item.imageUrl} alt={item.name} />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isAvailable ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-amber-600 hover:text-amber-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No menu items available</div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;
