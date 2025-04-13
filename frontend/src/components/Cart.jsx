import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiX, FiMinus, FiPlus } from 'react-icons/fi';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    calculateTotal,
    updateQuantity 
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 font-sans">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <FiShoppingCart className="mx-auto h-16 w-16 text-amber-400" />
          <h3 className="mt-4 text-2xl font-bold font-display text-amber-800">
            Your cart is empty
          </h3>
          <p className="mt-2 text-gray-600 font-open-sans">
            Add some delicious items to your cart
          </p>
          <div className="mt-6">
            <Link
              to="/menu"
              className="inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium font-montserrat text-white bg-amber-700 hover:bg-amber-800 transition-colors duration-300"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-8 font-display">Your Order</h1>
      
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-navigation">{cart.reduce((total, item) => total + item.quantity, 0)} Items</h2>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item._id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex items-center">
                        {/* Image Placeholder */}
                        <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 mr-6">
                          [Image]
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900 font-navigation">{item.name}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="text-amber-700 hover:text-amber-900 font-navigation"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus className="h-4 w-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="text-amber-700 hover:text-amber-900 font-navigation"
                        >
                          <FiPlus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 font-navigation"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-navigation">Order Summary</h2>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-xl font-bold text-amber-700">
                  ₹{(calculateTotal() * 1.1).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => alert('Proceeding to checkout...')}
                  className="w-full py-3 px-4 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold font-montserrat transition-colors duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
