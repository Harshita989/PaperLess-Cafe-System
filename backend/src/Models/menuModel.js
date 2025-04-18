import mongoose from "mongoose";  
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: ['Starter', 'Main Course', 'Dessert', 'Beverage', 'Side Dish'],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    preparationTime: {
        type: Number, 
        min: 1,
    },
});

export default mongoose.model('Menu', menuSchema);