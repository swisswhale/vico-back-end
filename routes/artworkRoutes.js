import express from 'express';
import { searchArtworks. getArtwork, saveArtwork } from '../controllers/artworkController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', authMiddleware, searchArtworks);
router.get('/:id', authMiddleware, getArtwork);
router.post('/save', authMiddleware, saveArtwork);

export default router
/*
Old code for ref...

import express from 'express';
import {
    searchExternalArtworks,
    searchHarvardArtworksController,
    getHarvardArtworkController
} from '../controllers/artworkController.js';

const router = express.Router();

import User from '../models/User.js'
import Artworks from '../models/Artwork.js'

import verifyToken from '../middleware/authMiddleware.js';
import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';

// Do not remove this
//                                      ~Metroid-X

// // Artsy Routes
// router.get('/artsy/search', searchExternalArtworks);
// router.get('/search', searchExternalArtworks);

// Harvard API Routes
router.get('/harvard/search', searchHarvardArtworksController);
router.get('/harvard/artwork/:id', getHarvardArtworkController);

router.get('/', verifyToken, async (req,res) => {
    try {
        const artworks = await Artworks.find();

        
        res.status(200).json(artworks);
    } catch (err) {
        res.status(500).json({ err: err.message }); 
    }
});

router.get('/new', verifyToken, async (req,res) => {
    try {
        res.status(200).json({});
    } catch(err) {
        res.status(500).json({ err: err.message }); 
    }
});

router.post('/', verifyToken, async (req,res) => {
    try {
        
        const createdCollection = await Artworks.create(req.body);
        createdCollection.isPublic = req.body.isPublic == 'true';
        res.status(201).json(createdCollection);
        
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}) ;

router.get('/:artworkId', verifyToken, async (req,res) => {
    try {
        const foundArtwork = await Artworks.findById(req.params.artworkId);
        
        if (!foundArtwork) {
            res.status(404);
            throw new Error('Artwork not found.');
        }
        res.status(200).json(foundArtwork);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.delete('/:artworkId', verifyToken, async (req,res) => {
    try {
        const deletedArtwork = await Artworks.findByIdAndDelete(req.params.artworkId);
        
        if (!deletedArtwork) {
            res.status(404);
            throw new Error('Artwork not found.');
        }
        
        res.status(200).json(deletedArtwork);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.put('/:artworkId', verifyToken, async (req, res) => {
    try {
        const updatedArtwork = await Artworks.findByIdAndUpdate(req.params.artworkId, req.body, {
            new: true,
        });
        
        if (!updatedArtwork) {
            res.status(404);
            throw new Error('Artwork not found.');
        }
        
        res.status(200).json(updatedArtwork);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});


// This is just me testing to see if I can dismantle the art objects. 
// It was successful, but I'll be keeping this around anyways.
//                                                      ~Metroid-x
router.get('/harvarts', async (req,res) => {
    const { query, size } = req.query;
    const harvarts = await searchHarvardArtworks(query, size);
    let json = ""
    let wait = 0
    harvarts.forEach(element => {
        json += `{<br>`
        Object.keys(element).forEach(key => {
            json += `&nbsp;&nbsp;&nbsp;&nbsp;${key}: ${element[key]}<br>`
        })
        
        json += `}<br><br>`

        wait++;
    });
    if(wait == harvarts.length) {
        res.send(`${json}`)
    }
});


export default router;
*/