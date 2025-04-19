import express from 'express';
import { searchArtworks, getArtwork, saveArtwork, getAllArtworks } from '../controllers/artworkController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllArtworks);
router.get('/search', authMiddleware, searchArtworks);
router.get('/:id', authMiddleware, getArtwork);
router.post('/save', authMiddleware, saveArtwork);

export default router;