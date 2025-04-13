import express from 'express';
import Artwork from '../models/Artwork.js';

const router = express.Router();

router.get('/artworks', async (req, res) => {
  const results = await Artwork.find().limit(10).sort({ createdAt: -1 });
  res.json(results);
});

export default router;