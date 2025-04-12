import express from 'express';
import Cart from '../Models/cartModel.js'; // import the cart model

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const cart = new Cart({
            items: req.body.items
        });
        await cart.save();
        res.status(201).json({ message: 'Cart saved successfully', cart });
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).json({ message: 'Failed to save cart' });
    }
});

export default router;
