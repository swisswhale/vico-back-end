// Test
import express from 'express';
import { searchExternalArtworks } from '../controllers/artworkController.js';

const router = express.Router();

// GET /api/artwork/search?q=warhol
router.get('/search', searchExternalArtworks);

export default router;