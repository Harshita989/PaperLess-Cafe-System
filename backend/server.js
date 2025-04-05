import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();

const mongoURL = "mongodb://localhost:27017/paperless_cafe";

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

main();

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server ready on port ${port}`);
});
