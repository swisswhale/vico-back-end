/*
import express from 'express';

const router = express.Router();

import User from '../models/User.js';
import Artworks from '../models/Artwork.js'
import Collection from '../models/Collection.js'
import verifyToken from '../middleware/authMiddleware.js';
import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';
// I believe it would be wise to include this ^^^ within the collection routes so we can render 
// any artworks for users to select from in a dropdown or side-menu on the /new route, as that 
// seems like it would be the most intuitive way to do things.
//                                                                              ~Metroid-X

// Index / read route for all collections
router.get('/', verifyToken, async (req,res) => {
    try {
        const collections = await Collection.find();

        
        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json({ err: err.message }); 
    }
//    res.send('<h1>Collection Route Works</h1>')
});

// the new/create route for the form page to create a new collection from a user once signed in.
router.get('/new', verifyToken, async (req,res) => {
    try {
        res.send(FormTest);
        res.status(200).json(FormTest);
    } catch(err) {
        res.status(500).json({ err: err.message }); 
    }
});

// post/create route for collections
router.post('/', verifyToken, async (req,res) => {
    try {
        // const createdCollection = await Collection.create(req.body);
        const createdCollection = await Collection.create(req.body);
        createdCollection.isPublic = req.body.isPublic == 'true';
        res.status(201).json(createdCollection);
        
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}) ;

router.get('/:collectionId', verifyToken, async (req,res) => {
    try {
        const foundCollection = await Collection.findById(req.params.collectionId);
        
        if (!foundCollection) {
            res.status(404);
            throw new Error('Collection not found.');
        }
        
        res.status(200).json(foundCollection);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.delete('/:collectionId', verifyToken, async (req,res) => {
    try {
        const deletedCollection = await Collection.findByIdAndDelete(req.params.collectionId);
        
        if (!deletedCollection) {
            res.status(404);
            throw new Error('Collection not found.');
        }
        
        res.status(200).json(deletedCollection);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.put('/:collectionId', verifyToken, async (req, res) => {
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(req.params.collectionId, req.body, {
            new: true,
        });
        
        if (!updatedCollection) {
            res.status(404);
            throw new Error('Collection not found.');
        }
        
        res.status(200).json(updatedCollection);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});
  

export default router;
*/