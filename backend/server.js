import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import menuRoutes from './src/api/menu.js';

const app = express();
app.use(cors()); 

// --- Database connection ---
const mongoURL = "mongodb://localhost:27017/paperless_cafe"; // Static URL

mongoose.connect(mongoURL)
    .then(() => {
        console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });

// --- Middleware ---
app.use(express.json()); // Body parser

// --- Routes ---
app.use('/api/menu', menuRoutes);

// --- Server Start ---
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 Server ready at port ${port}`);
});
