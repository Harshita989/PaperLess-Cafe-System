// backend/src/api/menu.js
import express from 'express';
import menuModel from '../Models/menuModel.js';

const router = express.Router();

// Add menu item
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          price: !price ? 'Price is required' : null,
          category: !category ? 'Category is required' : null
        }
      });
    } 

    // Validate price is a number and positive
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ 
        error: 'Invalid price',
        details: 'Price must be a positive number'
      });
    }

    // Create and save new menu item
    const newItem = new menuModel(req.body);
    const savedItem = await newItem.save();
    
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Menu item creation error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle other errors
    res.status(500).json({ 
      error: 'Failed to add menu item',
      details: error.message
    });
  }
});

// Get menu items
router.get('/', async (req, res) => {
  try {
    const items = await menuModel.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Menu items fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch menu items',
      details: error.message
    });
  }
});

export default router;
