import Artwork from '../models/Artwork.js';
import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';

export const searchArtworks = async (req, res) => {
    try {
        const { query } = req.query;
        const artworks = await searchHarvardArtworks(query);
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const artwork = await getHarvardArtworkById(id);
        if(!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
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
      const artworks = await Artwork.find({ user: req.user._id });
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };