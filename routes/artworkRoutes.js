import express from 'express';
import {
    searchExternalArtworks,
    searchHarvardArtworksController,
    getHarvardArtworkController
} from '../controllers/artworkController.js';

const router = express.Router();

import User from '../models/User.js'
import Artworks from '../models/Artwork.js'

import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';

// Do not remove this ^^^ *I* am the lead Backend.
//                                      ~Metroid-X

// // Artsy Routes
// router.get('/artsy/search', searchExternalArtworks);
// router.get('/search', searchExternalArtworks);

// Harvard API Routes
router.get('/harvard/search', searchHarvardArtworksController);
router.get('/harvard/artwork/:id', getHarvardArtworkController);

// index for artworks, doubles as the create form for users who are signed in.
router.get('/', (req,res) => {
    res.send('got artwork route')
});


// create route
router.post('/', async (req,res) => {
    try {
        const postedArtwork = await Artworks.Artwork.create(req.body);

        res.status(201).json(postedArtwork);
    } catch(err) {
        res.status(500).json({ err: err.message })
    }
});

// read route // I realized I probably need to work on the collection routes first.
              // please do not be impatient for this one, I'm doing my best on crunched time.
              //                                            ~Metroid-x

router.get('/', async (req,res) => {
    try {
        
    } catch(err) {

    }
});



// This is just me testing to see if I can dismantle the art objects. 
// It was successful, but I'll be keeping this around anyways.
//                                                  ~Metroid-x
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