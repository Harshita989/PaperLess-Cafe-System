import express from 'express';
import menuModel from '../Models/menuModel.js';

const router = express.Router();

// Create a new menu item
router.post('/', async (req, res) => {
  try {
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

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        error: 'Invalid price',
        details: 'Price must be a positive number'
      });
    }

    const newItem = new menuModel(req.body);
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Menu item creation error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      error: 'Failed to add menu item',
      details: error.message
    });
  }
});

// Get all menu items
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

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await menuModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Menu item update error:', error);
    res.status(500).json({
      error: 'Failed to update menu item',
      details: error.message
    });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await menuModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Menu item deletion error:', error);
    res.status(500).json({
      error: 'Failed to delete menu item',
      details: error.message
    });
  }
});

export default router;
