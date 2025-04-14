import express from 'express';
import {
    searchExternalArtworks,
    searchHarvardArtworksController,
    getHarvardArtworkController
} from '../controllers/artworkController.js';

const router = express.Router();

// Artsy Routes
router.get('/artsy/search', searchExternalArtworks);
router.get('/search', searchExternalArtworks);

// Harvard API Routes
router.get('/harvard/search', searchHarvardArtworksController);
router.get('/harvard/artwork/:id', getHarvardArtworkController);

export default router;