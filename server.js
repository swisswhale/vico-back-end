import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'
import collectionRouter from './routes/collectionRoutes.js';
import artworkRouter from './routes/artworkRoutes.js';
import devRouter from './routes/devs.js'
import { searchHarvardArtworks } from './services/harvardService.js';

dotenv.config();

const app = express();

// Enhanced security with helmet
app.use(helmet());

// Logging middleware
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Adjust this to match your frontend URL
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//app.use(cors);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/collections', collectionRouter);
app.use('/artwork', artworkRouter);
app.use('/api/dev', devRouter);

const PORT = process.env.PORT || 3000;

// Test route for Harvard API
app.get('/test-harvard-api', async (req, res) => {
  try {
    const result = await searchHarvardArtworks('Monet');
    res.json(result);
  } catch (error) {
    console.error('Harvard API error:', error);
    res.status(500).json({ error: 'Failed to connect to Harvard API' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('🎨 VICO API is live.');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  app.close(() => {
    console.log('HTTP server closed')
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});