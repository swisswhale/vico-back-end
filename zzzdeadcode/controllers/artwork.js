/*
// HarvardAPI Import
import { searchHarvardArtworks, getHarvardArtworkById } from '../services/harvardService.js';
// Artsy Import
import { searchArtsy } from '../services/artsyService.js';

// Artsy search function
export const searchExternalArtworks = async (req, res) => {
    try {
        const data = await searchArtsy('search', {
            q: req.query.q,
            size: 10
        });

        res.json(data);
    } catch (err) {
        console.error('Artsy API error:', err.response?.data || err.message || err);
        res.status(500).json({ error: 'Failed to fetch from Artsy', details: err.message });
    }
};

export const searchHarvardArtworksController = async (req, res) => {
    try {
        console.log('Received query:', req.query);
        const { query, size } = req.query;
        console.log('Searching with query:', query, 'and size:', size);
        const artworks = await searchHarvardArtworks(query, size);
        console.log('Received artworks:', artworks.length);
        res.json(artworks);

    } catch (err) {
        console.error('Harvard API search error:', err.message);
        res.status(500).json({ error: 'Failed to search Harvard artworks', details: err.message });
    }
};

export const getHarvardArtworkController = async (req, res) => {
    try {
        const { id } = req.params;
        const artwork = await getHarvardArtworkById(id);
        res.json(artwork);
    } catch (err) {
        console.error('Harvard API get artwork error:', err.message);
        res.status(500).json({ error: 'Failed to fetch Harvard artwork', details: err.message });
    }
};
*/