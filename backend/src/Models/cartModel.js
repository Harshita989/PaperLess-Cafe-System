import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
            menuItemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
