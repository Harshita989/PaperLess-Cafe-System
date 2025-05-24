// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import multer from 'multer';
// import path from 'path';
// import { Router } from 'express';
// // Storage config
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// const router = Router();
// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });
// // Route
// router.post('/upload', upload.single('image'), (req, res) => {
//   const imageUrl = `http://localhost:9000/uploads/${req.file.filename}`;
//   res.json({ imageUrl });
// });
// import menuRoutes from './src/api/menu.js';
// import cartRoutes from './src/api/cart.js';
// import userRoutes from './src/api/user.js';
// import orderRoutes from './src/api/order.js';

// const port = 9000;
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use('/api/menu', menuRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/orders', orderRoutes);

// const mongoURL = "mongodb://localhost:27017/paperless_cafe";

// mongoose.connect(mongoURL)
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((err) => {
//         console.error("Error connecting to MongoDB:", err);
//     });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });  
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { Router } from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Initialize express app **before** using it
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Setup router
const router = Router();

// Upload route
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `http://localhost:9000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Use the router in app
app.use('/', router);

// Other routes
import menuRoutes from './src/api/menu.js';
import cartRoutes from './src/api/cart.js';
import userRoutes from './src/api/user.js';
import orderRoutes from './src/api/order.js';

app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);

const port = 9000;
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
