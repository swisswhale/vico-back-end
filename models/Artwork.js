import mongoose from "mongoose";

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

export default mongoose.model('Artwork', artworkSchema);