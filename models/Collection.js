import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
});

export default mongoose.model('Collection', collectionSchema);

/* Old code for ref
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
*/