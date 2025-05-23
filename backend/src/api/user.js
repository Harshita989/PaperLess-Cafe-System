import express from 'express';
import User from '../Models/userModel.js'; 
import mongoose from 'mongoose';

const router = express.Router();

// Create or get user
router.post('/', async (req, res) => {
    try {
        const { name, whatsapp } = req.body;

        // Validate fields
        if (!name || !whatsapp) {
            return res.status(400).json({ 
                success: false,
                message: "Name and WhatsApp number are required" 
            });
        }

        // Check if user already exists
        let user = await User.findOne({ whatsapp });
        let isNewUser = false;
        
        // If user doesn't exist, create new user
        if (!user) {
            user = new User({ name, whatsapp });
            await user.save();
            isNewUser = true;
        }
        
        // Return only necessary user data (excluding sensitive info)
        const userResponse = {
            _id: user._id,
            name: user.name,
            whatsapp: user.whatsapp,
            createdAt: user.createdAt
        };

        res.status(201).json({ 
            success: true,
            message: isNewUser ? "User created successfully" : "User retrieved successfully",
            user: userResponse 
        });

    } catch (err) {
        console.error("❌ Error in user operation:", err);
        res.status(500).json({ 
            success: false,
            message: err.message || "Server error" 
        });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-__v');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
