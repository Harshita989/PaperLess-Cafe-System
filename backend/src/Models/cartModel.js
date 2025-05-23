import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // This creates a unique index on userId
    },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
            menuItemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true
            }
        }
    ]
}, {
    timestamps: true // This automatically adds createdAt and updatedAt fields
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
