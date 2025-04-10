// backend/src/api/menu.js
import express from 'express';
import menuModel from '../Models/menuModel.js';

const router = express.Router();

// Add menu item
router.post('/', async (req, res) => {
  try {
    const newItem = new menuModel(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add menu item' });
  }
});

// Get menu items
router.get('/', async (req, res) => {
  try {
    const items = await menuModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

export default router;
