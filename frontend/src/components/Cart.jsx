import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiX, FiMinus, FiPlus, FiShoppingBag, FiCoffee, FiLoader, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [userData, setUserData] = useState(null);
  const { 
    cart, 
    removeFromCart,
    calculateTotal,
    clearCart,
    userId,
    setCart
  } = useCart();
  
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const userDataStr = localStorage.getItem('cafeUserData');
    if (userDataStr) {
      try {
        setUserData(JSON.parse(userDataStr));
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, []);

  const updateQuantity = (itemId, newQuantity, itemName) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      toast.success(`${itemName} removed from cart`);
      return;
    }
    
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.menuItemId === itemId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      // Show toast when quantity changes
      const item = updatedCart.find(item => item.menuItemId === itemId);
      if (item) {
        toast.success(`Updated ${item.name} quantity to ${newQuantity}`, {
          duration: 1000,
          position: 'bottom-right',
        });
      }
      
      return updatedCart;
    });
  };

  const handleCheckout = async () => {
    if (!userId || !userData) {
      navigate('/');
      return;
    }

    setIsCheckingOut(true);

    try {
      const subtotal = calculateTotal();
      const response = await axios.post('http://localhost:9000/api/orders/create', {
        userId,
        userName: userData.name || 'Guest',
        whatsappNumber: userData.whatsapp || '0000000000', // Provide a default if not available
        items: cart.map(item => ({
          itemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: subtotal,
        totalPrice: subtotal, // Assuming no tax/discount for now
        paymentStatus: 'Pending',
        paymentMethod: 'Cash',
        orderStatus: 'Order Received'
      });

      if (response.data.success) {
        // Clear the cart after successful order
        setCart([]);
        // Show success message
        toast.success('Order placed successfully!');
        // Redirect to order status page
        navigate(`/order-status?orderId=${response.data.order._id}`);
      } else {
        toast.error(response.data.message || 'Failed to place order', {
          duration: 3000,
          position: 'bottom-right'
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to place order. Please try again.',
        {
          duration: 3000,
          position: 'bottom-right',
        }
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Redirect to home if no user is logged in
  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 font-sans">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md w-full mx-4">
          <FiCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h3>
          <p className="text-gray-600 mb-6">Thank you for your order. We'll notify you when it's ready.</p>
          <Link
            to="/menu"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <FiShoppingCart className="mr-2" /> Your Order
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="text-center py-8">
                    <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-gray-500">Start adding some delicious items to your order!</p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        <FiCoffee className="-ml-1 mr-2 h-5 w-5" />
                        Browse Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <FiShoppingCart className="mr-2" /> Your Order
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-2">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto -mx-4 px-4">
                      <AnimatePresence>
                        {cart.map((item) => (
                          <motion.li 
                            key={item.menuItemId} 
                            className="py-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">₹{item.price.toFixed(2)}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQuantity(item.menuItemId, item.quantity - 1, item.name)}
                                  className="text-gray-400 hover:text-yellow-600 p-1"
                                  disabled={isCheckingOut}
                                >
                                  <FiMinus className="h-4 w-4" />
                                </button>
                                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.menuItemId, item.quantity + 1, item.name)}
                                  className="text-gray-400 hover:text-yellow-600 p-1"
                                  disabled={isCheckingOut}
                                >
                                  <FiPlus className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    removeFromCart(item.menuItemId);
                                    toast.success(`${item.name} removed from cart`);
                                  }}
                                  className="ml-4 text-red-400 hover:text-red-600 p-1"
                                  disabled={isCheckingOut}
                                >
                                  <FiX className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹{calculateTotal().toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Taxes and shipping calculated at checkout</p>
                    <div className="mt-6">
                      <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut || cart.length === 0 || !userData}
                        className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${isCheckingOut || cart.length === 0 || !userData ? 'bg-yellow-400' : 'bg-yellow-600 hover:bg-yellow-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
                      >
                        {isCheckingOut ? (
                          <>
                            <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Processing...
                          </>
                        ) : !userData ? (
                          'Please log in to checkout'
                        ) : (
                          'Proceed to Checkout'
                        )}
                      </button>
                    </div>
                    <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-yellow-600 font-medium hover:text-yellow-500"
                          disabled={isCheckingOut}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
