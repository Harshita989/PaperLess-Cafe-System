import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/menu'); 
                setMenuItems(response.data); // Assuming your backend returns an array of menu items
                setLoading(false);
            } catch (err) {
                console.error('Error fetching menu items:', err);
                setError('Failed to load menu items.');
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map(item => (
                    <div key={item._id} className="border p-6 rounded-lg shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
