// server.js
import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Loaded from .env in server.js:', process.env.ARTSY_CLIENT_ID);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  // Import cors

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import devRoutes from './routes/devs.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Controllers






// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/collections', collectionRoutes);
app.use('/api/dev', devRoutes); // For testing purposes

// Health Check
app.get('/', (req, res) => {
    res.send('🎨 Art Collector API is live.');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/*import express from 'express';
import connectDB from './config/db.js';

connectDB();


app.get('/', (req, res) => {
    res.send('✅ Backend is running!');
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});*/