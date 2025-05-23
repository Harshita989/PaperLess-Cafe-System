import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import menuRoutes from './src/api/menu.js';
import cartRoutes from './src/api/cart.js';
import userRoutes from './src/api/user.js';
import orderRoutes from './src/api/order.js';

const port = 9000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);

const mongoURL = "mongodb://localhost:27017/paperless_cafe";

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});  
