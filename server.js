import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'
import collectionRouter from './routes/collectionRoutes.js';
import artworkRouter from './routes/artworkRoutes.js';
import devRouter from './routes/devs.js'
import { searchHarvardArtworks } from './services/harvardService.js';

dotenv.config();

console.log('🧪 Loaded from .env in server.js:', process.env.HARVARD_API_KEY);
console.log('Harvard API Key:', process.env.HARVARD_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/collections', collectionRouter);
  app.use('/artwork', artworkRouter);
  app.use('/api/dev', devRouter);
  
  const PORT = process.env.PORT || 3000;

  app.get('/test-harvard-api', async (req, res) => {
    try {
      const result = await searchHarvardArtworks('Monet');
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to Harvard API' });
    }
  });
  
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
