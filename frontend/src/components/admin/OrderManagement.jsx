import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiClock, FiCheck, FiTruck, FiCheckCircle, FiX } from 'react-icons/fi';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: 'Order Received', label: 'Order Received', color: 'bg-blue-100 text-blue-800' },
  { value: 'Preparing', label: 'Preparing', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Ready to Serve', label: 'Ready to Serve', color: 'bg-purple-100 text-purple-800' },
  { value: 'Served', label: 'Served', color: 'bg-green-100 text-green-800' },
  { value: 'Completed', label: 'Completed', color: 'bg-gray-100 text-gray-800' },
  { value: 'Cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'Order Received':
      return <FiClock className="mr-2" />;
    case 'Preparing':
      return <FiRefreshCw className="mr-2 animate-spin" />;
    case 'Ready to Serve':
      return <FiCheck className="mr-2" />;
    case 'Served':
      return <FiTruck className="mr-2" />;
    case 'Completed':
      return <FiCheckCircle className="mr-2" />;
    case 'Cancelled':
      return <FiX className="mr-2" />;
    default:
      return null;
  }
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [filter, setFilter] = useState('all');

  const fetchOrders = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await axios.get('http://localhost:9000/api/orders');
      if (response.data.success) {
        // Transform and sort orders with newest first
        const sortedOrders = response.data.orders
          .map(order => ({
            ...order,
            orderId: order._id, // Ensure orderId is available
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt || order.createdAt)
          }))
          .sort((a, b) => b.createdAt - a.createdAt);
        
        setOrders(sortedOrders);
        return sortedOrders;
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
        return [];
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.response?.data?.message || 'Error loading orders');
      return [];
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    await fetchOrders();
    toast.success('Orders refreshed');
  };

  // Set up polling for order updates
  useEffect(() => {
    fetchOrders();
    
    // Poll every 30 seconds for new orders
    const POLLING_INTERVAL = 30000;
    const interval = setInterval(() => fetchOrders(false), POLLING_INTERVAL);
    
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdating(prev => ({ ...prev, [orderId]: true }));
      
      const response = await axios.put(
        `http://localhost:9000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        // Update the local state with the updated order
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId 
              ? { 
                  ...order, 
                  orderStatus: newStatus,
                  updatedAt: new Date()
                } 
              : order
          )
        );
        
        toast.success(`Order #${orderId.slice(-6).toUpperCase()} status updated to ${newStatus}`);
      } else {
        throw new Error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus === filter);

  // Group orders by status for better organization
  const ordersByStatus = filteredOrders.reduce((acc, order) => {
    if (order && order.orderStatus) {
      if (!acc[order.orderStatus]) {
        acc[order.orderStatus] = [];
      }
      acc[order.orderStatus].push(order);
    }
    return acc;
  }, {});

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            {orders.length} total orders • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <FiRefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
          >
            <option value="all">All Orders</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Object.keys(ordersByStatus).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
            <div key={status} className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                {getStatusIcon(status)}
                {status}
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  {statusOrders.length}
                </span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {statusOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white shadow overflow-hidden rounded-lg border border-gray-200"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-gray-900">Order #{order.orderId}</span>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                            {getStatusIcon(order.orderStatus)}
                            <span className="ml-1">{order.orderStatus}</span>
                          </span>
                          {updating[order._id] && (
                            <FiRefreshCw className="ml-2 h-3 w-3 text-gray-400 animate-spin" />
                          )}
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="mb-3">
                          <h3 className="text-sm font-medium text-gray-900">{order.userName}</h3>
                          <p className="text-sm text-gray-500">{order.whatsappNumber}</p>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-2">
                          <h4 className="text-xs font-medium text-gray-500 mb-1">ITEMS</h4>
                          <ul className="space-y-1">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  {item.quantity}x {item.name}
                                </span>
                                <span className="text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-sm font-medium">Total: ₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                            disabled={updating[order._id]}
                            className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 rounded-md"
                          >
                            {statusOptions.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleStatusUpdate(order._id, document.querySelector(`#status-${order._id}`)?.value || order.orderStatus)}
                            disabled={updating[order._id]}
                            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                          >
                            {updating[order._id] ? 'Updating...' : 'Update'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
