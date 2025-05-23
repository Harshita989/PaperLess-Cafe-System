import express from 'express';
import Order from '../Models/orderModel.js';
import Cart from '../Models/cartModel.js';
import mongoose from 'mongoose';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware for creating an order
const validateCreateOrder = [
  check('userId', 'User ID is required').not().isEmpty(),
  check('userName', 'User name is required').not().isEmpty(),
  check('whatsappNumber', 'WhatsApp number is required').matches(/^[0-9]{10,15}$/),
  check('items', 'Items are required').isArray({ min: 1 }),
  check('subtotal', 'Subtotal is required').isNumeric(),
  check('totalPrice', 'Total price is required').isNumeric(),
  check('paymentStatus', 'Payment status is required').isIn(['pending', 'paid', 'failed']),
  check('orderStatus', 'Order status is required').isString()
];

// Create a new order from cart
router.post('/create', validateCreateOrder, async (req, res) => {
  try {
    const { userId, userName, whatsappNumber } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID' 
      });
    }

    // Check if we're creating from cart or direct order
    let orderItems = [];
    let totalPrice = 0;

    if (req.body.items && req.body.items.length > 0) {
      // Create order directly from items
      orderItems = req.body.items.map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
      
      totalPrice = req.body.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    } else {
      // Get user's cart
      const cart = await Cart.findOne({ userId });
      
      if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Cart is empty' 
        });
      }

      // Calculate total price from cart
      orderItems = cart.items.map(item => ({
        itemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
      
      totalPrice = cart.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    }

    // Create new order with all required fields
    const order = new Order({
      userId,
      userName,
      whatsappNumber,
      items: orderItems,
      subtotal: req.body.subtotal || totalPrice,
      totalPrice: req.body.totalPrice || totalPrice,
      paymentStatus: req.body.paymentStatus || 'pending',
      orderStatus: req.body.orderStatus || 'Order Received',
      // Set default values for optional fields
      tax: req.body.tax || 0,
      discount: req.body.discount || 0,
      paymentMethod: req.body.paymentMethod || 'cash',
      isTakeaway: req.body.isTakeaway || false
    });

    await order.save();

    // Clear the user's cart if we created from cart
    if (!req.body.items) {
      await Cart.findOneAndDelete({ userId });
    }

    // Send WhatsApp notification (you'll need to implement this)
    try {
      // await sendWhatsAppNotification({
      //   to: whatsappNumber,
      //   message: `Your order #${order.orderId} has been received and is being processed.`
      // });
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        ...order._doc,
        orderId: order._id.toString().slice(-6).toUpperCase()
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get a single order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid order ID' 
      });
    }

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order: {
        ...order._doc,
        orderId: order._id.toString().slice(-6).toUpperCase()
      }
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Get order by order ID (public)
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order ID is required' 
      });
    }

    // Find by custom order ID or fallback to _id
    const order = await Order.findOne({
      $or: [
        { orderId: orderId },
        { _id: orderId }
      ]
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order: {
        ...order._doc,
        orderId: order._id.toString().slice(-6).toUpperCase()
      }
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID' 
      });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders: orders.map(order => ({
        ...order._doc,
        orderId: order._id.toString().slice(-6).toUpperCase()
      }))
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user orders',
      error: error.message
    });
  }
});

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid order ID' 
      });
    }

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    const validStatuses = [
      'Order Received', 
      'Preparing', 
      'Ready to Serve', 
      'Served', 
      'Completed', 
      'Cancelled'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { 
        orderStatus: status,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Send notification if order is completed or status changed significantly
    if (status === 'Completed' || status === 'Cancelled') {
      try {
        // await sendWhatsAppNotification({
        //   to: order.whatsappNumber,
        //   message: `Your order #${order._id.toString().slice(-6).toUpperCase()} is now ${status}.`
        // });
      } catch (error) {
        console.error('Error sending status update notification:', error);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        ...order._doc,
        orderId: order._id.toString().slice(-6).toUpperCase()
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID' 
      });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    // Add a formatted orderId to each order
    const ordersWithFormattedId = orders.map(order => ({
      ...order._doc,
      orderId: order._id.toString().slice(-6).toUpperCase()
    }));

    res.status(200).json({
      success: true,
      orders: ordersWithFormattedId
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user orders',
      error: error.message
    });
  }
});

// Update order status (admin)
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['Order Received', 'Preparing', 'Ready to Serve', 'Served', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { 
        orderStatus: status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // In a real app, you might want to emit a Socket.IO event here
    // to notify the user about the status update

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

export default router;
