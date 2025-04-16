// This NEEDED to be made for me to get anything done tonight. You can feel free to
// tell me off for this LATER if it bothers you that I did this before you could.

// P.S. We *may* not actually need an artwork model if we just create a schema for it in here
// or just push it in as an array of objects, as we actually get pure objects from the api 
// we are currently using.  We can also likely push the auction record into our stretch goals.
//                                                                        ~Metroid-X
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
import User from './User.js'
import Artworks from './Artwork.js'


const CollectionSchema = new Schema({
    Creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    storedArtworks: [Object],
    // These will just be the artwork objects retrieved from the api, stored as normal Objects.
});

const Collection = model('Collection', CollectionSchema);

export default Collection;