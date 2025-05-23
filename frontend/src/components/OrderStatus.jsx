import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiCheckCircle, FiTruck, FiPackage, FiHome, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/orders/order/${orderId}`);
      if (response.data && response.data.success) {
        setOrder(response.data.order);
      } else {
        toast.error('Order not found');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      navigate('/orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
      // Set up polling every 10 seconds for real-time updates
      const interval = setInterval(fetchOrder, 10000);
      return () => clearInterval(interval);
    } else {
      navigate('/orders');
    }
  }, [orderId]);

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'preparing':
        return <FiClock className="text-yellow-500 text-4xl" />;
      case 'serving':
        return <FiTruck className="text-blue-500 text-4xl" />;
      case 'completed':
        return <FiCheckCircle className="text-green-500 text-4xl" />;
      default:
        return <FiPackage className="text-gray-500 text-4xl" />;
    }
  };

  const getStatusText = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'preparing':
        return 'Your order is being prepared';
      case 'serving':
        return 'Your order is on its way';
      case 'completed':
        return 'Order completed';
      default:
        return 'Order received';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors mt-4"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600">Your order has been received and is being processed.</p>
          <p className="text-gray-500 text-sm mt-2">Order ID: {order.orderId || order._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="px-6 py-8 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {getStatusIcon(order.status)}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {getStatusText(order.status)}
            </h2>
            <p className="text-gray-600">
              {order.status === 'completed' 
                ? 'Your order has been completed. Enjoy your meal!'
                : 'We\'ll notify you once your order is ready.'}
            </p>
          </div>

          <div className="border-t border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-900 font-medium">{item.name}</span>
                    <span className="mx-2 text-gray-400">×</span>
                    <span className="text-gray-600">{item.quantity}</span>
                  </div>
                  <span className="text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total Amount</span>
              <span className="text-xl font-bold text-amber-600">
                ₹{order.totalAmount || (order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 sm:flex-none px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiShoppingBag /> Order Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiHome /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
