import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const artworkSchema = new mongoose.Schema({
    artsyId: { type: String, required: true, unique: true },
    title: String,
    slug: String,
    medium: String,
    category: String,
    date: String,
    dimensions: String,
    collectingInstitution: String,
    imageUrl: String,
    permalink: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: tie to user
}, { timestamps: true });

const Artwork = model('Artwork', artworkSchema);

export default { Artwork, artworkSchema}