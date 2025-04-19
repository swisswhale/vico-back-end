import express from 'express';
import * as collectionCtrl from '../controllers/collectionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes protected by token middleware
router.get('/', verifyToken, collectionCtrl.getCollections);
router.get('/:id', verifyToken, collectionCtrl.getCollection);
router.post('/', verifyToken, collectionCtrl.createCollection);
router.put('/:id', verifyToken, collectionCtrl.updateCollection);
router.delete('/:id', verifyToken, collectionCtrl.deleteCollection);
router.post('/:id/artworks', verifyToken, collectionCtrl.addArtworkToCollection);
router.delete('/:id/artworks/:artworkId', verifyToken, collectionCtrl.removeArtworkFromCollection);

export default router;