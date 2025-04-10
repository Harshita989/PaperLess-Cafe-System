import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true,
    imageUrl: '',
    spiceLevel: '',
    ingredients: '',
    preparationTime: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });

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
      // Basic validation
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
        ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()).filter(i => i) : [],
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined
      };

      const response = await axios.post('http://localhost:9000/api/menu', payload);
      
      setMessage({ text: 'Menu item added successfully!', type: 'success' });
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        isAvailable: true,
        imageUrl: '',
        spiceLevel: '',
        ingredients: '',
        preparationTime: '',
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
      
      // Handle specific error messages from backend
      const errorMessage = error.response?.data?.details || error.response?.data?.error || 'Failed to add menu item';
      setMessage({ 
        text: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
        type: 'error' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Menu Item</h2>

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" />

        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" required />

        <select name="category" value={formData.category} onChange={handleChange} className="input" required>
          <option value="">Select Category</option>
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
          <option value="Side Dish">Side Dish</option>
        </select>

        <div className="flex items-center mb-4">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} className="mr-2" />
          <label>Available?</label>
        </div>

        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="input" />

        <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange} className="input">
          <option value="">Select Spice Level</option>
          <option value="Mild">Mild</option>
          <option value="Medium">Medium</option>
          <option value="Hot">Hot</option>
        </select>

        <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients (comma separated)" className="input" />

        <input type="number" name="preparationTime" value={formData.preparationTime} onChange={handleChange} placeholder="Preparation Time (minutes)" className="input" />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full mt-4">Add Menu Item</button>

        {message.text && (
          <p className={`text-center mt-4 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default Admin;
