import express from 'express';
import { getCollections, createCollection, addArtworkToCollection} from '../controllers/collectionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCollections);
router.post('/', authMiddleware, createCollection);
router.post('/:collectionId/artwork/:artworkId', authMiddleware, addArtworkToCollection);

export default router