import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
    harvardId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    artist: { type: String },
    date: { type: String },
    medium: { type: String },
    classification: { type: String },
    department: { type: String },
    culture: { type: String },
    period: { type: String },
    dimensions: { type: String },
    primaryImageSmall: { type: String },
    primaryImageLarge: { type: String },
    apiLink: { type: String },
    objectURL: { type: String },
    creditLine: { type: String },
    description: { type: String },
    provenance: { type: String },
    comments: [{
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }]
});

export default mongoose.model('Artwork', artworkSchema);