import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        whatsapp: '',
        name: ''
    });
    const [errors, setErrors] = useState({
        whatsapp: '',
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.whatsapp) {
            newErrors.whatsapp = 'WhatsApp number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.whatsapp)) {
            newErrors.whatsapp = 'Please enter a valid 10-digit number';
            isValid = false;
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            navigate('/menu');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Welcome to Our Cafe
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="whatsapp" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                WhatsApp Number
                            </label>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="Enter your 10-digit number"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} 
                                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                    transition-all duration-300 placeholder-gray-400`}
                            />
                            {errors.whatsapp && (
                                <p className="mt-1 text-sm text-red-600">{errors.whatsapp}</p>
                            )}
                        </div>

                        <div>
                            <label 
                                htmlFor="name" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                    transition-all duration-300 placeholder-gray-400`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 px-4 rounded-xl
                                hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                                transition-all duration-300 font-medium text-sm"
                        >
                            Continue to Menu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
