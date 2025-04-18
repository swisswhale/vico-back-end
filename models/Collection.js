import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
});

export default mongoose.model('Collection', collectionSchema);