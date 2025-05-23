import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: [true, 'Item ID is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    maxlength: [100, 'Item name cannot be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Item price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    max: [100, 'Quantity cannot exceed 100']
  },
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: [500, 'Special instructions cannot exceed 500 characters']
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
    match: [/^[0-9+\-\s]+$/, 'Please enter a valid phone number']
  },
  tableNumber: {
    type: String,
    trim: true
  },
  items: {
    type: [orderItemSchema],
    required: [true, 'Order items are required'],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'At least one item is required in the order'
    }
  },
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ['Pending', 'Paid', 'Failed', 'Refunded'],
      message: 'Invalid payment status'
    },
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ['Cash', 'Card', 'UPI', 'Wallet', 'Other'],
      message: 'Invalid payment method'
    },
    default: 'Cash'
  },
  orderStatus: {
    type: String,
    enum: {
      values: ['Order Received', 'Preparing', 'Ready to Serve', 'Served', 'Completed', 'Cancelled'],
      message: 'Invalid order status'
    },
    default: 'Order Received'
  },
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: [1000, 'Special instructions cannot exceed 1000 characters']
  },
  customerNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Customer notes cannot exceed 1000 characters']
  },
  estimatedPrepTime: {
    type: Number, // in minutes
    min: [0, 'Preparation time cannot be negative']
  },
  completedAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String,
    trim: true,
    maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
  },
  isTakeaway: {
    type: Boolean,
    default: false
  },
  deliveryAddress: {
    type: String,
    trim: true,
    maxlength: [500, 'Delivery address cannot exceed 500 characters']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ORD-${timestamp}${random}`;
  }
  
  // Set completedAt timestamp when order is marked as completed
  if (this.isModified('orderStatus') && this.orderStatus === 'Completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  // Set cancelledAt timestamp when order is cancelled
  if (this.isModified('orderStatus') && this.orderStatus === 'Cancelled' && !this.cancelledAt) {
    this.cancelledAt = new Date();
  }
  
  next();
});

// Virtual for formatted order date
orderSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for order status with color
orderSchema.virtual('statusInfo').get(function() {
  const statusInfo = {
    'Order Received': { color: 'blue', icon: 'clock' },
    'Preparing': { color: 'yellow', icon: 'utensils' },
    'Ready to Serve': { color: 'green', icon: 'check-circle' },
    'Served': { color: 'purple', icon: 'truck' },
    'Completed': { color: 'gray', icon: 'check' },
    'Cancelled': { color: 'red', icon: 'times' }
  };
  
  return statusInfo[this.orderStatus] || { color: 'gray', icon: 'question' };
});

// Indexes for better query performance
orderSchema.index({ userId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'items.itemId': 1 });
orderSchema.index({ whatsappNumber: 1 });

// Static method to get order statistics
orderSchema.statics.getOrderStats = async function() {
  const stats = await this.aggregate([
    {
      $match: {
        orderStatus: { $ne: 'Cancelled' }
      }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalPrice" },
        avgOrderValue: { $avg: "$totalPrice" },
        minOrder: { $min: "$totalPrice" },
        maxOrder: { $max: "$totalPrice" }
      }
    },
    {
      $project: {
        _id: 0,
        totalOrders: 1,
        totalRevenue: 1,
        avgOrderValue: { $round: ["$avgOrderValue", 2] },
        minOrder: 1,
        maxOrder: 1
      }
    }
  ]);

  return stats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    minOrder: 0,
    maxOrder: 0
  };
};

// Instance method to calculate estimated completion time
orderSchema.methods.calculateEstimatedCompletion = function() {
  if (this.completedAt) return 0;
  
  const avgPrepTime = 25; // Default average preparation time in minutes
  const timeElapsed = (new Date() - this.createdAt) / (1000 * 60); // in minutes
  
  return Math.max(0, avgPrepTime - timeElapsed);
};

// Add text index for search
orderSchema.index({
  'orderNumber': 'text',
  'userName': 'text',
  'whatsappNumber': 'text',
  'items.name': 'text',
  'specialInstructions': 'text',
  'customerNotes': 'text'
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
