import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'
import collectionRouter from './routes/collectionRoutes.js';
import artworkRouter from './routes/artworkRoutes.js';
import devRouter from './routes/devs.js'

dotenv.config();

console.log('🧪 Loaded from .env in server.js:', process.env.HARVARD_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/collections', collectionRouter);
  app.use('/artwork', artworkRouter);
  app.use('/api/dev', devRouter);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('🎨 VICO API is live.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/*
For reference to resolve any potential issues, here is the previous sever.js file:

server.js
import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Loaded from .env in server.js:', process.env.ARTSY_CLIENT_ID);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  // Import cors

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';
import devRoutes from './routes/devs.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Controllers

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/collections', collectionRoutes);
app.use('/artwork', artworkRoutes);
app.use('/api/dev', devRoutes); // For testing purposes

// Health Check
app.get('/', (req, res) => {
  res.send('🎨 Art Collector API is live.');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
*/
