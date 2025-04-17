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

        let json = ""
        let wait = 0
        collections.forEach(element => {
            json += `{<br>`
            Object.keys(element).forEach(key => {
                json += `&nbsp;&nbsp;&nbsp;&nbsp;${key}: ${element[key]}<br>`
            })
            
            json += `}<br><br>`

            wait++;
        });
        if(wait == collections.length) {
            res.send(`${json}`)
        }
        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json({ err: err.message }); 
    }
//    res.send('<h1>Collection Route Works</h1>')
});

// the new/create route for the form page to create a new collection from a user once signed in.
router.get('/new', verifyToken, async (req,res) => {
    try {
        const FormTest = `
        <main>
            <form action="/" method="post">
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        id='title'
                        value='title'
                        name='title'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description:</label>
                    <input
                        type='text'
                        id='description'
                        value='description'
                        name='description'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='isPublic'>Show as Public?:</label>
                    <input
                        type='checkbox'
                        id='isPublic'
                        value='true'
                        name='isPublic'
                        
                    />
                </div>
                <div>
                    (this would be where we would put clickable fetch-data from the APIs
                    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;we're using, similar to the zombie-fighter lab we did awhile back.)
                </div>
                <button type="submit">Submit Collection</button>
            </form>
        </main>
        `
        // Don't touch the code above, it's being used by me so I can get/give an idea of 
        // how things will look once te frontend is complete, or alternatively, just a testbed 
        // for seeing if it will actually post to the db we're using.
        // 
        // I will probably need something working on the frontend though to better test things 
        // here, as it's rather hard to know that it's working without this actually being 
        // able to post anything.
//                                                                        ~Metroid-X
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
        // IMPORTANT: this cannot be tested with user-author support until we fix the issues 
        // with our auth system.
//                                                                        ~Metroid-X
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