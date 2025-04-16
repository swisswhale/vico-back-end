import express from 'express';

const router = express.Router();

import User from '../models/User.js'
import Artworks from '../models/Artwork.js'
import Collection from '../models/Collection.js'
import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';
// I believe it would be wise to include this ^^^ within the collection routes so we can render 
// any artworks for users to select from in a dropdown or side-menu on the /new route, as that 
// seems like it would be the most intuitive way to do things.
//                                                                              ~Metroid-X

// Index / read route for all collections
router.get('/', async (req,res) => {
    try {
        const collections = await Collection.find();

        res.send(`${collections}`);
    } catch (err) {

    }
//    res.send('<h1>Collection Route Works</h1>')
});

// the new/create route for the form page to create a new collection from a user once signed in.
router.get('/new', async (req,res) => {
    try {
        const FormTest = `
        <main>
            <form>
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor='Stored'>Show as Public?:</label>
                    <input
                        type='checkbox'
                        id='isPublic'
                        value='true'
                        name='isPublic'
                        required
                    />
                </div>
            </form>
        </main>
        `
        // Don't touch the code above, it's being used by me so I can get/give an idea of 
        // how things will look once te frontend is complete, or alternatively, just a testbed 
        // for seeing if it will actually post to the db we're using.
        // just LMK if anything is acting up.
//                                                                        ~Metroid-X
        res.send(FormTest);
        res.status(201).json(FormTest);
    } catch(err) {

    }
})

// post/create route for collections
router.post('/', async (req,res) => {
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
}) 







export default router;