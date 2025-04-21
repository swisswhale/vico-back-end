import Artwork from '../models/Artwork.js';
import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';

export const searchArtworks = async (req, res) => {
    try {
        const { query } = req.query;
        
        
        const localArtworks = await Artwork.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { artist: { $regex: query, $options: 'i' } }
            ]
        }).limit(20);

        
        const harvardArtworks = await searchHarvardArtworks(query);

        
        const combinedResults = [...localArtworks];
        harvardArtworks.forEach(harvardArtwork => {
            if (!combinedResults.some(art => art.harvardId === harvardArtwork.harvardId)) {
                combinedResults.push(harvardArtwork);
            }
        });

        res.json(combinedResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        
        
        let artwork = await Artwork.findOne({ harvardId: id });
        
        if (!artwork) {
            
            const harvardArtwork = await getHarvardArtworkById(id);
            if (!harvardArtwork) {
                return res.status(404).json({ message: 'Artwork not found' });
            }
            artwork = harvardArtwork;
        }
        
        res.json(artwork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const saveArtwork = async (req, res) => {
    try {
        const { harvardId } = req.body;
        let artwork = await Artwork.findOne({ harvardId });
        if (!artwork) {
            const harvardArtwork = await getHarvardArtworkById(harvardId);
            artwork = new Artwork(harvardArtwork);
            await artwork.save();
        }
        res.status(201).json(artwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const artwork = await Artwork.findOne({ harvardId: id });
        
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        artwork.comments.push({
            text,
            user: req.user._id
        });

        await artwork.save();
        res.status(201).json(artwork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const artwork = await Artwork.findOneAndDelete({ harvardId: id });
        
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        res.json({ message: 'Artwork deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};