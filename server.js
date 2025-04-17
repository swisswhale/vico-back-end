import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/artworks', artworkRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('VICO API is running');
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

/*
import userRouter from './routes/userRoutes.js';

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/collections', collectionRoutes);
app.use('/api/artworks', artworkRoutes);
*/