// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('✅ Backend is running!');
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});