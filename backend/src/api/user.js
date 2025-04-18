import express from 'express';
import User from '../Models/userModel.js'; 

const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { name, whatsapp } = req.body;

        // Validate fields
        if (!name || !whatsapp) {
            return res.status(400).json({ message: "Name and WhatsApp number are required" });
        }

        // Save user
        const newUser = new User({ name, whatsapp });
        await newUser.save();

        res.status(201).json({ message: "User saved successfully", user: newUser });
    } catch (err) {
        console.error("❌ Error saving user:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
