import express from 'express';
import Cart from '../Models/cartModel.js'; 
import mongoose from 'mongoose';

const router = express.Router();

// Middleware to validate user ID
const validateUserId = (req, res, next) => {
    if (!req.body.userId || !mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Valid user ID is required' 
        });
    }
    next();
};

// Create or update user's cart
router.post('/', validateUserId, async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Items must be an array' 
            });
        }

        // Find existing cart or create new one
        let cart = await Cart.findOne({ userId });
        
        if (cart) {
            // Update existing cart
            cart.items = items;
        } else {
            // Create new cart
            cart = new Cart({
                userId,
                items
            });
        }

        await cart.save();
        
        res.status(200).json({ 
            success: true, 
            message: 'Cart updated successfully',
            cart
        });

    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update cart',
            error: err.message 
        });
    }
});

// Get user's cart
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid user ID' 
            });
        }

        const cart = await Cart.findOne({ userId })
            .populate('items.menuItemId', 'name price')
            .lean();

        if (!cart) {
            return res.status(200).json({ 
                success: true, 
                message: 'No cart found',
                items: []
            });
        }

        res.status(200).json({ 
            success: true, 
            cartId: cart._id,
            items: cart.items || []
        });

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch cart' 
        });
    }
});

// Clear user's cart
router.delete('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid user ID' 
            });
        }

        const result = await Cart.deleteOne({ userId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No cart found for this user' 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            message: 'Cart cleared successfully' 
        });

    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to clear cart',
            error: error.message
        });
    }
});

export default router;
