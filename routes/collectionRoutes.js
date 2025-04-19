import express from 'express'
import * as collectionCtrl from '../controllers/collectionController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get all collections for the logged-in user
router.get('/', verifyToken, collectionCtrl.getCollections)

// Get a specific collection
router.get('/:id', verifyToken, collectionCtrl.getCollection)

// Create a new collection
router.post('/', verifyToken, collectionCtrl.createCollection)

// Update a collection
router.put('/:id', verifyToken, collectionCtrl.updateCollection)

// Delete a collection
router.delete('/:id', verifyToken, collectionCtrl.deleteCollection)

// Add an artwork to a collection
router.post('/:id/artworks', verifyToken, collectionCtrl.addArtworkToCollection)

// Remove an artwork from a collection
router.delete('/:id/artworks/:artworkId', verifyToken, collectionCtrl.removeArtworkFromCollection)

export default router