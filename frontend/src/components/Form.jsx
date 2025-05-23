import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/image2.jpg';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCoffee, FaUtensils } from 'react-icons/fa';

const Form = () => {
  const navigate = useNavigate();
  const { setUserId } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  // Show welcome toast on component mount if not redirected from protected route
useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('cafeUserData') || 'null');
  if (!userData) {
    toast(
      (t) => (
        <div className="flex flex-col items-center text-center space-y-2">
          <FaCoffee className="text-yellow-600 text-3xl" />
          <div>
            <h3 className="font-bold text-gray-900">Welcome to Resto Cafe!</h3>
            <p className="text-sm text-gray-600">Please fill in your details to continue</p>
          </div>
        </div>
      ),
      {
        duration: 2000,
        style: {
          borderLeft: '4px solid #D97706',
          background: '#FEF3C7',
          color: '#92400E',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        },
        icon: '☕',
      }
    );
  }
}, []);


  const [formData, setFormData] = useState({
    whatsapp: '',
    name: ''
  });

  const [errors, setErrors] = useState({
    whatsapp: '',
    name: ''
  });

  const validateMobile = (number) => {
    if (!number) return 'Mobile number is required';
    if (!/^\d*$/.test(number)) return 'Only digits are allowed';
    if (number.length !== 10) return 'Must be exactly 10 digits';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For mobile number, only allow digits and limit to 10 characters
    if (name === 'whatsapp') {
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
      
      // Only validate if field is not empty and user has started typing
      if (numbersOnly) {
        setErrors(prev => ({ ...prev, [name]: validateMobile(numbersOnly) }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsapp' && value) {
      setErrors(prev => ({ ...prev, [name]: validateMobile(value) }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      whatsapp: validateMobile(formData.whatsapp),
      name: formData.name.trim() ? '' : 'Name is required'
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:9000/api/user', {
        name: formData.name.trim(),
        whatsapp: formData.whatsapp
      });

      if (response.data.success && response.data.user) {
        const { _id } = response.data.user;
        // Store user ID in context and local storage
        setUserId(_id);
        localStorage.setItem('cafeUserId', _id);
        localStorage.setItem('cafeUserData', JSON.stringify(response.data.user));
        
        // Dismiss loading toast and show success
        toast.dismiss();
        toast.success(
          <div className="flex items-center space-x-2">
            <FaUtensils className="text-green-500" />
            <span>Welcome, {formData.name}! Let's get started 🍽️</span>
          </div>,
          {
            duration: 3000,
            style: {
              borderLeft: '4px solid #10B981',
              background: '#ECFDF5',
              color: '#065F46',
            },
          }
        );
        
        // Short delay before navigation to allow toast to be seen
        setTimeout(() => {
          navigate('/menu');
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save user. Please try again.';
      toast.error(errorMessage, {
        position: 'top-right',
        duration: 3000,
        style: {
          borderLeft: '4px solid #DC2626',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-[calc(100vh-5rem)] flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-xl overflow-hidden p-6 sm:p-8 relative z-10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-amber-800 mb-2">
            Welcome to Resto Cafe
          </h2>
          <p className="text-gray-600">
            Please enter your details to view our menu
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your 10-digit number"
              maxLength={10}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.whatsapp 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' 
                  : 'border-gray-300 hover:border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50'
              } focus:outline-none transition-colors duration-200 placeholder-gray-400`}
            />
            {errors.whatsapp ? (
              <p className="mt-1 text-sm text-red-600 flex items-start">
                <span className="mr-1">⚠</span>
                {errors.whatsapp}
              </p>
            ) : formData.whatsapp.length > 0 && (
              <p className="mt-1 text-xs text-green-600">
                ✓ Valid mobile number
              </p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' 
                  : 'border-gray-300 hover:border-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50'
              } focus:outline-none transition-colors duration-200 placeholder-gray-400`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 flex items-start">
                <span className="mr-1">⚠</span>
                {errors.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading 
                ? 'bg-amber-400 cursor-not-allowed' 
                : 'bg-amber-600 hover:bg-amber-700'
            } text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'View Menu'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Form;
